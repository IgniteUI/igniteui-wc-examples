import Navigo from "navigo";
import samplesMetadata from "./samples-metadata.json?url";

interface SampleInfo {
  name: string;
  path: string;
  description: string;
  htmlContent: string;
}

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
  private navSidebar: HTMLElement;
  private navContent: HTMLElement;
  private sampleContainer: HTMLElement;
  private sampleTitle: HTMLElement;
  private toggleNavBtn: HTMLElement;
  private toolbar: HTMLElement | null;
  private samples: SampleInfo[] = [];
  private router: Navigo;
  private sampleModules = import.meta.glob("/src/samples/**/index.ts");
  private isEmbeddedMode = false;

  constructor() {
    this.navSidebar = document.getElementById("nav-sidebar")!;
    this.navContent = document.getElementById("nav-content")!;
    this.sampleContainer = document.getElementById("sample-container")!;
    this.sampleTitle = document.getElementById("sample-title")!;
    this.toggleNavBtn = document.getElementById("toggle-nav")!;
    this.toolbar = document.getElementById("toolbar");

    this.router = new Navigo("/", { hash: false });
    this.loadMetadata();
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
    this.toggleNavBtn.addEventListener("click", () => {
      this.navSidebar.classList.toggle("hidden");
    });

    this.buildNavigation();
    this.setupRouter();
    this.setupRoutePreservation();
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
    const currentPath = window.location.pathname;
    const isRoot = currentPath === "/" || currentPath.endsWith("/index.html");

    if (savedRoute && isRoot) {
      sessionStorage.removeItem("vite-current-route");
      this.router.navigate(savedRoute);
    } else {
      sessionStorage.removeItem("vite-current-route");
      this.router.resolve();
    }
  }

  private buildNavigation() {
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
    this.isEmbeddedMode = enabled;
    this.navSidebar.style.display = enabled ? "none" : "";
    if (this.toolbar) {
      this.toolbar.style.display = enabled ? "none" : "";
    }
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

    this.sampleTitle.textContent = formatName(sample.name);
    this.updateActiveNavItem(normalizedPath);
    this.sampleContainer.innerHTML = loadingHtml;

    try {
      // Render HTML content from the sample
      this.sampleContainer.innerHTML = sample.htmlContent || defaultSampleHtml;

      // Load and execute the sample module
      const modulePath = `/src/samples/${normalizedPath}/index.ts`;

      if (this.sampleModules[modulePath]) {
        await this.sampleModules[modulePath]();
      } else {
        throw new Error(`Module not found: ${modulePath}`);
      }
    } catch (error) {
      console.error("Error loading sample:", error);
      this.sampleContainer.innerHTML = errorHtml(sample.name, error);
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
    this.sampleTitle.textContent = "Select a sample from the sidebar";
    this.sampleContainer.innerHTML = welcomeHtml;
    this.updateActiveNavItem("");
  }
}

// Initialize the browser when DOM is ready
new SamplesBrowser();
