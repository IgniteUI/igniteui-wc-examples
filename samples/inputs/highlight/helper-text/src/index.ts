import { defineComponents, IgcHighlightComponent, IgcInputComponent, IgcIconButtonComponent, IgcDividerComponent, IgcExpansionPanelComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcHighlightComponent, IgcInputComponent, IgcIconButtonComponent, IgcDividerComponent, IgcExpansionPanelComponent);

export class HighlightHelperText {
  private highlightRef = document.querySelector('igc-highlight') as IgcHighlightComponent;
  private statusRef = document.querySelector('#helper-text') as HTMLParagraphElement;

  constructor() {
    document.querySelector('igc-input')?.addEventListener('igcInput', this.onInput);
    document.querySelector('#prev-btn')?.addEventListener('click', this.prev);
    document.querySelector('#next-btn')?.addEventListener('click', this.next);
  }

  private updateStatus() {
    const highlight = this.highlightRef;
    const status = this.statusRef;
    if (!highlight || !status) return;

    status.textContent = highlight.size
      ? `${highlight.current + 1} of ${highlight.size} match${highlight.size === 1 ? '' : 'es'}`
      : '';
  }

  private onInput = ({ detail }: CustomEvent<string>) => {
    if (!this.highlightRef) return;
    this.highlightRef.searchText = detail;
    this.updateStatus();
  };

  private prev = () => {
    this.highlightRef?.previous({ preventScroll: true });
    this.updateStatus();
  };

  private next = () => {
    this.highlightRef?.next({ preventScroll: true });
    this.updateStatus();
  };
}

new HighlightHelperText();
