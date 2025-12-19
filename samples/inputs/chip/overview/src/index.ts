import { defineComponents, IgcChipComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcIconComponent, IgcChipComponent);

export class ChipOverview {
  constructor() {
    const chips = document.querySelectorAll('igc-chip[removable]');
    chips.forEach(chip => {
      chip.addEventListener('igcRemove', (e) => this.onRemove(e));
    });

    registerIconFromText(
      'cancel',
      '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>'
    );

    registerIconFromText(
      'select',
      '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
    );
  }

  public onRemove(event: Event) {
    const chip = event.target as HTMLElement;
    chip?.remove();
  }
}

new ChipOverview();
