// @ts-nocheck
import Navigo from 'navigo';
import { html, render } from 'lit';
import samplesMetadata from './samples-metadata.json?url';

interface SampleInfo {
  name: string;
  path: string;
  description: string;
  htmlContent: string;
}

class SamplesBrowser {
  private navSidebar: HTMLElement;
  private navContent: HTMLElement;
  private sampleContainer: HTMLElement;
  private sampleTitle: HTMLElement;
  private toggleNavBtn: HTMLElement;
  private samples: SampleInfo[] = [];
  private router: Navigo;
  private sampleModules = import.meta.glob('/src/samples/**/index.ts');
  private isEmbeddedMode = false;

  constructor() {
    this.navSidebar = document.getElementById('nav-sidebar')!;
    this.navContent = document.getElementById('nav-content')!;
    this.sampleContainer = document.getElementById('sample-container')!;
    this.sampleTitle = document.getElementById('sample-title')!;
    this.toggleNavBtn = document.getElementById('toggle-nav')!;
    
    this.router = new Navigo('/', { hash: false });
    this.loadMetadata();
  }

  private async loadMetadata() {
    try {
      const response = await fetch(samplesMetadata);
      this.samples = await response.json();
      this.init();
    } catch (error) {
      console.error('Failed to load samples metadata:', error);
    }
  }

  private init() {
    // Setup navigation toggle
    this.toggleNavBtn.addEventListener('click', () => {
      this.navSidebar.classList.toggle('hidden');
    });

    // Build navigation
    this.buildNavigation();

    // Setup router
    this.setupRouter();

    // Preserve route on Vite reload
    window.addEventListener('beforeunload', () => {
      const currentPath = this.router.getCurrentLocation().url;
      if (currentPath && currentPath !== '/') {
        sessionStorage.setItem('vite-current-route', currentPath);
      }
    });

    // Restore saved route or resolve current
    const savedRoute = sessionStorage.getItem('vite-current-route');
    if (savedRoute) {
      sessionStorage.removeItem('vite-current-route');
      this.router.navigate(savedRoute);
    } else {
      this.router.resolve();
    }
  }

  private buildNavigation() {
    const groupedSamples = this.groupSamples();
    
    for (const [group, categories] of Object.entries(groupedSamples)) {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'nav-group';
      groupDiv.textContent = group.toUpperCase();
      this.navContent.appendChild(groupDiv);

      for (const [category, samples] of Object.entries(categories)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'nav-category';
        categoryDiv.textContent = this.formatCategoryName(category);
        categoryDiv.dataset.category = `${group}/${category}`;
        
        const samplesDiv = document.createElement('div');
        samplesDiv.className = 'nav-samples';
        
        for (const sample of samples) {
          const sampleDiv = document.createElement('div');
          sampleDiv.className = 'nav-sample';
          sampleDiv.textContent = this.formatSampleName(sample.name);
          sampleDiv.dataset.samplePath = sample.path;
          
          sampleDiv.addEventListener('click', () => {
            const normalizedPath = sample.path.replace(/\\/g, '/');
            this.router.navigate(`/samples/${normalizedPath}`);
          });
          
          samplesDiv.appendChild(sampleDiv);
        }
        
        categoryDiv.addEventListener('click', () => {
          categoryDiv.classList.toggle('expanded');
          samplesDiv.classList.toggle('visible');
        });
        
        this.navContent.appendChild(categoryDiv);
        this.navContent.appendChild(samplesDiv);
      }
    }
  }

  private groupSamples(): Record<string, Record<string, SampleInfo[]>> {
    const grouped: Record<string, Record<string, SampleInfo[]>> = {};
    
    for (const sample of this.samples) {
      const parts = sample.path.split(/[/\\]/);
      
      if (parts.length >= 2) {
        const group = parts[0];
        const category = parts[1];
        
        if (!grouped[group]) {
          grouped[group] = {};
        }
        
        if (!grouped[group][category]) {
          grouped[group][category] = [];
        }
        
        grouped[group][category].push(sample);
      }
    }
    
    return grouped;
  }

  private formatCategoryName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private formatSampleName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private setupRouter() {
    // Home route
    this.router.on('/', () => {
      this.setEmbeddedMode(false);
      this.showWelcome();
    });

    // Sample route with navigation panel (default)
    this.router.on('/samples/:category/:subcategory/:sample', ({ data }) => {
      this.setEmbeddedMode(false);
      const samplePath = `${data.category}/${data.subcategory}/${data.sample}`;
      this.loadSampleByPath(samplePath);
    });

    // Sample route without navigation panel (embedded mode)
    this.router.on('/:category/:subcategory/:sample', ({ data }) => {
      this.setEmbeddedMode(true);
      const samplePath = `${data.category}/${data.subcategory}/${data.sample}`;
      this.loadSampleByPath(samplePath);
    });

    // Fallback for other path structures
    this.router.notFound(() => {
      this.setEmbeddedMode(false);
      this.showWelcome();
    });
  }

  private setEmbeddedMode(enabled: boolean) {
    this.isEmbeddedMode = enabled;
    
    const toolbar = document.getElementById('toolbar');
    
    if (enabled) {
      this.navSidebar.style.display = 'none';
      if (toolbar) {
        toolbar.style.display = 'none';
      }
    } else {
      this.navSidebar.style.display = '';
      if (toolbar) {
        toolbar.style.display = '';
      }
    }
  }

  private async loadSampleByPath(path: string) {
    // Find sample with normalized path
    const sample = this.samples.find(s => {
      const normalizedSamplePath = s.path.replace(/\\/g, '/');
      return normalizedSamplePath === path;
    });

    if (sample) {
      await this.loadSample(sample);
    } else {
      this.showWelcome();
    }
  }

  private async loadSample(sample: SampleInfo) {
    this.sampleTitle.textContent = this.formatSampleName(sample.name);
    
    // Update active state in nav
    const normalizedPath = sample.path.replace(/\\/g, '/');
    document.querySelectorAll('.nav-sample').forEach(el => {
      const elPath = el.dataset.samplePath?.replace(/\\/g, '/');
      if (elPath === normalizedPath) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
    
    // Show loading state
    this.sampleContainer.innerHTML = '<div class="loader">Loading sample...</div>';
    
    try {
      // Create container with the HTML content
      this.sampleContainer.innerHTML = sample.htmlContent || '<div id="root"><div class="container sample"></div></div>';
      
      // Load the sample module
      const modulePath = `/src/samples/${normalizedPath}/index.ts`;
      
      if (this.sampleModules[modulePath]) {
        await this.sampleModules[modulePath]();
      } else {
        throw new Error(`Module not found: ${modulePath}`);
      }
      
    } catch (error) {
      console.error('Error loading sample:', error);
      this.sampleContainer.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #d32f2f;">
          <h2>Error Loading Sample</h2>
          <p>Could not load sample: ${sample.name}</p>
          <pre style="text-align: left; background: #f5f5f5; padding: 20px; margin-top: 20px; overflow: auto;">${error}</pre>
        </div>
      `;
    }
  }

  private showWelcome() {
    this.currentSample = null;
    this.sampleTitle.textContent = 'Select a sample from the sidebar';
    this.sampleContainer.innerHTML = `
      <div id="welcome-message">
        <h2>Welcome to Ignite UI Web Components Samples</h2>
        <p>
          Select a sample from the sidebar to view it. This browser is powered by Vite
          for fast development and hot module replacement.
        </p>
      </div>
    `;
    
    document.querySelectorAll('.nav-sample').forEach(el => {
      el.classList.remove('active');
    });
  }
}

// Initialize the browser when DOM is ready
new SamplesBrowser();
