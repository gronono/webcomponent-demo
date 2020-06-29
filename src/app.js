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
        width: 400px;
    }
</style>
<rand-card seed=""></rand-card>
<rand-toolbar></rand-toolbar>
`;

export class RandApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const updateSeed = () => {
            const seed = Date.now();
            this.shadowRoot.querySelector('rand-card').setAttribute('seed', seed);
        };
        this.timer = setInterval(updateSeed, 10000);
    }

    disconnectedCallback() {
        clearInterval(this.timer);
    }
}

customElements.define('rand-app', RandApp);

