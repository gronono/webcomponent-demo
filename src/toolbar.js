const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        margin-left: auto;
        margin-right: auto;
    }

    #seed {
        width: 10em;
        text-align: center;
    }

    #generate {
        padding: 0 20px;
    }
</style>

<input id="seed" type="text" value="fea8be3e64777240"/>
<button id="generate">Générer</button>
`;

export class RandToolbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('rand-toolbar', RandToolbar);