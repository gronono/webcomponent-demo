import './card.js';
import  './toolbar.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        font-family: Ubuntu,sans-serif;
        margin-left: auto;
        margin-right: auto;
        width: 350px;
    }
</style>
<rand-card></rand-card>
<rand-toolbar></rand-toolbar>
`;

export class RandApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('rand-app', RandApp);