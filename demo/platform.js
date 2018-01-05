import { html, GluonElement } from '../gluonjs/gluon.js';

class UseThePlatform extends GluonElement {
  get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          padding: 26px;
          background: ${this.color};
        }

        ::slotted(span) {
          display: block;
          color: white;
          font-family: sans-serif;
          font-size: 40px;
          font-weight: 900;
          border-bottom: 4px solid white;
          margin-bottom: 18px;
        }
      </style>
      <slot></slot>
    `;
  }

  get color() {
    return this.getAttribute('color') || '#2e9be6';
  }

  set color(color) {
    this.setAttribute('color', color);
  }

  static get observedAttributes() {
    return ['color'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === 'color') {
      this.render();
    }
  }
}

customElements.define(UseThePlatform.is, UseThePlatform);
