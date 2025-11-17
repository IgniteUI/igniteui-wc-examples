// @ts-nocheck
import samplesMetadata from './samples-metadata.json';

interface SampleInfo {
  name: string;
  path: string;
  description: string;
}

class SamplesBrowser {
  private navSidebar: HTMLElement;
  private navContent: HTMLElement;
  private sampleContainer: HTMLElement;
  private sampleTitle: HTMLElement;
  private toggleNavBtn: HTMLElement;
  private samples: SampleInfo[] = [];
  private currentSample: string | null = null;

  constructor() {
    this.navSidebar = document.getElementById('nav-sidebar')!;
    this.navContent = document.getElementById('nav-content')!;
    this.sampleContainer = document.getElementById('sample-container')!;
    this.sampleTitle = document.getElementById('sample-title')!;
    this.toggleNavBtn = document.getElementById('toggle-nav')!;

    this.samples = samplesMetadata as SampleInfo[];
    
    this.init();
  }

  private init() {
    // Setup navigation toggle
    this.toggleNavBtn.addEventListener('click', () => {
      this.navSidebar.classList.toggle('hidden');
    });

    // Build navigation
    this.buildNavigation();

    // Setup routing
    this.setupRouting();

    // Load initial route
    this.navigateToRoute(window.location.pathname);
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
            this.navigateTo(`/${sample.path}`);
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

  private setupRouting() {
    window.addEventListener('popstate', () => {
      this.navigateToRoute(window.location.pathname);
    });
  }

  private navigateTo(path: string) {
    window.history.pushState({}, '', path);
    this.navigateToRoute(path);
  }

  private async navigateToRoute(route: string) {
    // Remove leading slash and normalize
    const normalizedRoute = route.replace(/^\//, '').replace(/\/$/, '');
    
    if (!normalizedRoute) {
      this.showWelcome();
      return;
    }

    // Find the sample
    const sample = this.samples.find(s => s.path === normalizedRoute);
    
    if (sample) {
      await this.loadSample(sample);
    } else {
      this.showWelcome();
    }
  }

  private async loadSample(sample: SampleInfo) {
    this.currentSample = sample.path;
    this.sampleTitle.textContent = this.formatSampleName(sample.name);
    
    // Update active state in nav
    document.querySelectorAll('.nav-sample').forEach(el => {
      if (el.dataset.samplePath === sample.path) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
    
    // Show loading state
    this.sampleContainer.innerHTML = '<div class="loader">Loading sample...</div>';
    
    try {
      // Dynamically import the sample module
      const modulePath = `/src/samples/${sample.path}/index.ts`;
      
      // Create a container for the sample
      this.sampleContainer.innerHTML = '<div id="sample-root" class="container sample" style="padding: 20px;"></div>';
      
      // Import and initialize the sample
      await import(/* @vite-ignore */ modulePath);
      
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
