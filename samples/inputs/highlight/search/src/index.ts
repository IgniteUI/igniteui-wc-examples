import { defineComponents, IgcHighlightComponent, IgcInputComponent, IgcIconButtonComponent, IgcDividerComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcHighlightComponent, IgcInputComponent, IgcIconButtonComponent, IgcDividerComponent);

export class HighlightSearch {
  private highlightRef = document.querySelector('igc-highlight') as IgcHighlightComponent;

  constructor() {
    document.querySelector('igc-input')?.addEventListener('igcInput', this.onInput);
    document.querySelector('#prev-btn')?.addEventListener('click', this.prev);
    document.querySelector('#next-btn')?.addEventListener('click', this.next);
  }

  private onInput = ({ detail }: CustomEvent<string>) => {
    if (!this.highlightRef) return;
    this.highlightRef.searchText = detail;
  };

  private prev = () => {
    this.highlightRef?.previous({ preventScroll: true });
  };

  private next = () => {
    this.highlightRef?.next({ preventScroll: true });
  };
}

new HighlightSearch();
