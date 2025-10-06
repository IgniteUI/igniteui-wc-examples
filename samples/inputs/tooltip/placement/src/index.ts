import { defineComponents, IgcButtonComponent, IgcTooltipComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcTooltipComponent, IgcButtonComponent);
export class TooltipPlacement {
  constructor() {
    type PopoverPlacement =
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'right'
      | 'right-start'
      | 'right-end'
      | 'left'
      | 'left-start'
      | 'left-end';

    const Positions = ['top', 'bottom', 'left', 'right'].flatMap((each) => [
      each,
      `${each}-start`,
      `${each}-end`,
    ]) as Array<PopoverPlacement & {}>;

    let a = document.getElementById('btnWrapper') as HTMLDivElement;

    const template = html` 
      <igc-button variant="outlined" id="tooltip-position" style="text-align: center">Click to trigger all supported placements</igc-button>
  
    ${Positions.map(
      (pos) => html`
        <igc-tooltip anchor="tooltip-position" show-triggers="click" show-delay="0" hide-delay="0" sticky with-arrow .placement=${pos}>
          <div>
            <strong>${pos}</strong>
          </div>
        </igc-tooltip>
      `
    )}
  `;
    render(template, a);
  }
}

new TooltipPlacement();
