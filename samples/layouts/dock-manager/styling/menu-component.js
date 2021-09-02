const template = document.createElement('template');

template.innerHTML = `
  <div class="menu">
    <button id="expand-btn" class="expandBtn">
      <igc-icon-component name="more" />
    </button>

    <div id="menu-items">
      <button id="pin" class="item">
        Pin
        <igc-icon-component name="unpin" />
      </button>
      <button id="close" class="item">
        Close
        <igc-icon-component name="close" />
      </button>
    </div>
  </div>

  <style>
    :host {
      --main-color: rgb(227,230,233);
      --font-color: rgb(113,115,116);
    }

    #expand-btn {
        margin-top: 7px;
        border: none;
        background-color: transparent;
        color: var(--font-color);
    }

    #menu-items {
        width: 70px;
        padding: 10px;
        position: absolute;
        right: 10px;
        background-color: var(--main-color);
        border-radius: 10px;
        display: none;
        flex-direction: column;
    }

    .item {
        display: flex;
        justify-content: space-between;
        width: inherit;
        border: none;
        background-color: var(--main-color);
        color: var(--font-color);
    }

    .item:hover {
        color: rgb(74, 76, 77);
    }
  </style>
`

export class MenuComponent extends HTMLElement {
  shadowRoot = this.attachShadow({mode: 'closed'});
  handlePaneClose;
  menuItems;

  constructor() {
      super();

      // clone template content nodes to the shadow DOM
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.handlePaneClose = new CustomEvent('closePane', {
        bubbles: true,
        cancelable: false
      });

      this.handlePinPane = new CustomEvent('pinPane', {
        bubbles: true,
        cancelable: false
      });
  
      this.menuItems = this.shadowRoot.getElementById('menu-items');

      this.shadowRoot.getElementById('expand-btn').addEventListener('click', () => this.expandMenu());

      this.shadowRoot.getElementById('pin')?.addEventListener('click', () => {
        this.dispatchEvent(this.handlePinPane);
        this.menuItems.style.display = 'none';

        this.changePinIcon();
      });

      this.shadowRoot.getElementById('close')?.addEventListener('click', () => this.dispatchEvent(this.handlePaneClose));

      document.addEventListener('click', (event) => {
        if(event.target !== this) {
            this.menuItems.style.display = 'none'
        } 
      });
  }

  expandMenu() {
    this.menuItems?.style.display === '' || this.menuItems?.style.display === 'none' ? 
        (this.menuItems.style.display = 'flex') : (this.menuItems.style.display = 'none');
  }

  changePinIcon() {
    if (this.shadowRoot.getElementById('pin').children[0].name === 'unpin') {
      this.shadowRoot.getElementById('pin').children[0].name = 'pin';
    } else {
      this.shadowRoot.getElementById('pin').children[0].name = 'unpin';
    }
  }
}

window.customElements.define('menu-component', MenuComponent);
