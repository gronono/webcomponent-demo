const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        background-color: white;
        border: 1px black solid;
        border-radius: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    #card-content {
        display: grid;
        grid-template-columns: 6em 1fr;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;;
    }

    #picture {
        margin: 10px;
        border: 1px black solid;
        border-radius: 50%;
        margin-left: auto;
        margin-right: auto;
        width: 128px;
    }

    label {
        font-weight: bolder;
    }
</style>

<img id="picture" src="https://randomuser.me/api/portraits/men/75.jpg" />
<div id="card-content">
    <label>Nom&#8239;:</label><span id="name">Mr Brad Gibson</span>
    <label>Adresse&#8239;:</label><span id="street">9278 new road</span>
    <label></label><span id="city">93027 Kilcoole</span>     
    <label>Courriel&#8239;:</label><span id="email">brad.gibson@example.com</span>
    <label>Téléphone&#8239;:</label><span id="phone">011-962-7516</span>
</div>
`;

export class RandCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('rand-card', RandCard);