import Navigo from "navigo";
import samplesMetadata from "./samples-metadata.json?url";

interface SampleInfo {
  name: string;
  path: string;
  description: string;
  htmlContent: string;
}

const fullBrowserHtml = `
  <div id="nav-sidebar">
    <div id="nav-header">
      <h1>Samples Browser</h1>
      <p>Vite Edition</p>
    </div>
    <div id="nav-content"></div>
  </div>
  <div id="main-content">
    <div id="toolbar">
      <button id="toggle-nav">☰ Toggle Nav</button>
      <span id="sample-title">Select a sample from the sidebar</span>
    </div>
    <div id="sample-container"></div>
  </div>
`;

const embeddedBrowserHtml = `
  <div id="sample-container"></div>
`;

const welcomeHtml = `
  <div id="welcome-message">
    <h2>Welcome to Ignite UI Web Components Samples</h2>
    <p>
      Select a sample from the sidebar to view it. This browser is powered by
      Vite for fast development and hot module replacement.
    </p>
  </div>
`;

const loadingHtml = `<div class="loader">Loading sample...</div>`;

const errorHtml = (sampleName: string, error: unknown) => `
  <div style="padding: 40px; text-align: center; color: #d32f2f;">
    <h2>Error Loading Sample</h2>
    <p>Could not load sample: ${sampleName}</p>
    <pre style="text-align: left; background: #f5f5f5; padding: 20px; margin-top: 20px; overflow: auto;">${String(
      error
    )}</pre>
  </div>
`;

const defaultSampleHtml = `<div id="root"><div class="container sample"></div></div>`;

function formatName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}

function groupSamples(
  samples: SampleInfo[]
): Record<string, Record<string, SampleInfo[]>> {
  const grouped: Record<string, Record<string, SampleInfo[]>> = {};

  for (const sample of samples) {
    const parts = sample.path.split(/[/\\]/);

    if (parts.length >= 2) {
      const [group, category] = parts;
      grouped[group] ??= {};
      grouped[group][category] ??= [];
      grouped[group][category].push(sample);
    }
  }

  return grouped;
}

class SamplesBrowser {
  private appContainer: HTMLElement;
  private navSidebar: HTMLElement | null = null;
  private navContent: HTMLElement | null = null;
  private sampleContainer: HTMLElement | null = null;
  private sampleTitle: HTMLElement | null = null;
  private toggleNavBtn: HTMLElement | null = null;
  private toolbar: HTMLElement | null = null;
  private samples: SampleInfo[] = [];
  private router: Navigo;
  private sampleModules = import.meta.glob("/src/samples/**/index.ts");
  private isEmbeddedMode = false;
  private uiInitialized = false;

  constructor() {
    this.appContainer = document.getElementById("app")!;
    this.router = new Navigo(import.meta.env.BASE_URL, { hash: false });
    this.determineInitialMode();
    this.loadMetadata();
  }

  private determineInitialMode() {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    const fullPath = window.location.pathname;
    const pathWithoutBase = fullPath.replace(baseUrl, "") || "/";
    
    // Check if path starts with /samples/ (full browser mode)
    const isFullBrowserMode = pathWithoutBase === "/" || pathWithoutBase.startsWith("/samples/");
    this.isEmbeddedMode = !isFullBrowserMode;
    
    // Inject appropriate HTML structure
    if (this.isEmbeddedMode) {
      this.appContainer.innerHTML = embeddedBrowserHtml;
    } else {
      this.appContainer.innerHTML = fullBrowserHtml;
    }
    
    // Cache element references based on mode
    this.sampleContainer = document.getElementById("sample-container");
    
    if (!this.isEmbeddedMode) {
      this.navSidebar = document.getElementById("nav-sidebar");
      this.navContent = document.getElementById("nav-content");
      this.sampleTitle = document.getElementById("sample-title");
      this.toggleNavBtn = document.getElementById("toggle-nav");
      this.toolbar = document.getElementById("toolbar");
    }
  }

  private async loadMetadata() {
    try {
      const response = await fetch(samplesMetadata);
      this.samples = await response.json();
      this.init();
    } catch (error) {
      console.error("Failed to load samples metadata:", error);
    }
  }

  private init() {
    if (!this.isEmbeddedMode && this.toggleNavBtn && this.navSidebar) {
      this.toggleNavBtn.addEventListener("click", () => {
        this.navSidebar!.classList.toggle("hidden");
      });
      this.buildNavigation();
    }

    this.setupRouter();
    
    if (!this.isEmbeddedMode) {
      this.setupRoutePreservation();
    }
    
    this.restoreOrResolveRoute();
  }

  private setupRoutePreservation() {
    window.addEventListener("beforeunload", () => {
      const currentPath = this.router.getCurrentLocation().url;
      if (currentPath && currentPath !== "/") {
        sessionStorage.setItem("vite-current-route", currentPath);
      }
    });
  }

  private restoreOrResolveRoute() {
    const savedRoute = sessionStorage.getItem("vite-current-route");
    const currentLocation = this.router.getCurrentLocation();
    const currentPath = currentLocation.url || "";
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, ""); // Remove trailing slash
    const fullPath = window.location.pathname;
    
    // Check if we're at the root (accounting for base URL)
    const isRoot = fullPath === baseUrl + "/" || 
                   fullPath === baseUrl || 
                   fullPath === "/" || 
                   fullPath.endsWith("/index.html");

    if (savedRoute && isRoot) {
      sessionStorage.removeItem("vite-current-route");
      this.router.navigate(savedRoute);
    } else {
      sessionStorage.removeItem("vite-current-route");
      this.router.resolve();
    }
  }

  private buildNavigation() {
    if (!this.navContent) return;
    
    const groupedSamples = groupSamples(this.samples);

    for (const [group, categories] of Object.entries(groupedSamples)) {
      const groupDiv = document.createElement("div");
      groupDiv.className = "nav-group";
      groupDiv.textContent = group.toUpperCase();
      this.navContent.appendChild(groupDiv);

      for (const [category, samples] of Object.entries(categories)) {
        this.createCategoryNav(group, category, samples);
      }
    }
  }

  private createCategoryNav(
    group: string,
    category: string,
    samples: SampleInfo[]
  ) {
    if (!this.navContent) return;
    
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "nav-category";
    categoryDiv.textContent = formatName(category);
    categoryDiv.dataset.category = `${group}/${category}`;

    const samplesDiv = document.createElement("div");
    samplesDiv.className = "nav-samples";

    for (const sample of samples) {
      const sampleDiv = document.createElement("div");
      sampleDiv.className = "nav-sample";
      sampleDiv.textContent = formatName(sample.name);
      sampleDiv.dataset.samplePath = sample.path;

      sampleDiv.addEventListener("click", () => {
        this.router.navigate(`/samples/${normalizePath(sample.path)}`);
      });

      samplesDiv.appendChild(sampleDiv);
    }

    categoryDiv.addEventListener("click", () => {
      categoryDiv.classList.toggle("expanded");
      samplesDiv.classList.toggle("visible");
    });

    this.navContent.appendChild(categoryDiv);
    this.navContent.appendChild(samplesDiv);
  }

  private setupRouter() {
    this.router.on("/", () => {
      this.setEmbeddedMode(false);
      this.showWelcome();
    });

    // Sample route with navigation panel (default)
    this.router.on("/samples/:category/:subcategory/:sample", ({ data }) => {
      this.setEmbeddedMode(false);
      this.loadSampleByPath(
        `${data.category}/${data.subcategory}/${data.sample}`
      );
    });

    // Sample route without navigation panel (embedded mode)
    this.router.on("/:category/:subcategory/:sample", ({ data }) => {
      this.setEmbeddedMode(true);
      this.loadSampleByPath(
        `${data.category}/${data.subcategory}/${data.sample}`
      );
    });

    this.router.notFound(() => {
      this.setEmbeddedMode(false);
      this.showWelcome();
    });
  }

  private setEmbeddedMode(enabled: boolean) {
    if (this.isEmbeddedMode === enabled) return; // Already in the correct mode
    
    this.isEmbeddedMode = enabled;
    
    // Re-inject the appropriate HTML structure
    if (enabled) {
      this.appContainer.innerHTML = embeddedBrowserHtml;
    } else {
      this.appContainer.innerHTML = fullBrowserHtml;
      // Rebuild navigation in full browser mode
      this.navContent = document.getElementById("nav-content");
      if (this.navContent) {
        this.buildNavigation();
      }
      // Re-attach toggle button event
      this.toggleNavBtn = document.getElementById("toggle-nav");
      this.navSidebar = document.getElementById("nav-sidebar");
      if (this.toggleNavBtn && this.navSidebar) {
        this.toggleNavBtn.addEventListener("click", () => {
          this.navSidebar!.classList.toggle("hidden");
        });
      }
    }
    
    // Update element references
    this.sampleContainer = document.getElementById("sample-container");
    this.sampleTitle = document.getElementById("sample-title");
    this.toolbar = document.getElementById("toolbar");
  }

  private async loadSampleByPath(path: string) {
    const sample = this.samples.find((s) => normalizePath(s.path) === path);

    if (sample) {
      await this.loadSample(sample);
    } else {
      this.showWelcome();
    }
  }

  private async loadSample(sample: SampleInfo) {
    const normalizedPath = normalizePath(sample.path);

    if (this.sampleTitle) {
      this.sampleTitle.textContent = formatName(sample.name);
    }
    
    this.updateActiveNavItem(normalizedPath);
    
    if (this.sampleContainer) {
      this.sampleContainer.innerHTML = loadingHtml;
    }

    try {
      // Render HTML content from the sample
      if (this.sampleContainer) {
        this.sampleContainer.innerHTML = sample.htmlContent || defaultSampleHtml;
      }

      // Load and execute the sample module
      const modulePath = `/src/samples/${normalizedPath}/index.ts`;

      if (this.sampleModules[modulePath]) {
        await this.sampleModules[modulePath]();
      } else {
        throw new Error(`Module not found: ${modulePath}`);
      }
    } catch (error) {
      console.error("Error loading sample:", error);
      if (this.sampleContainer) {
        this.sampleContainer.innerHTML = errorHtml(sample.name, error);
      }
    }
  }

  private updateActiveNavItem(normalizedPath: string) {
    document.querySelectorAll(".nav-sample").forEach((el) => {
      const elPath = normalizePath(
        (el as HTMLElement).dataset.samplePath ?? ""
      );
      el.classList.toggle("active", elPath === normalizedPath);
    });
  }

  private showWelcome() {
    if (this.sampleTitle) {
      this.sampleTitle.textContent = "Select a sample from the sidebar";
    }
    if (this.sampleContainer) {
      this.sampleContainer.innerHTML = welcomeHtml;
    }
    this.updateActiveNavItem("");
  }
}

// Initialize the browser when DOM is ready
new SamplesBrowser();
