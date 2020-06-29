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

    div {
        display: grid;
        grid-template-columns: 6em 1fr;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;;
    }

    img {
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

    #address {
        white-space: pre;
    }
</style>

<img />
<div>
    <label>Name</label><span id="name"></span>
    <label>Address</label><span id="address"></span>     
    <label>Email</label><span id="email"></span>
    <label>Phone</label><span id="phone"></span>
</div>
`;

export class RandCard extends HTMLElement {
    static get observedAttributes() {
        return ['seed'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const changed = oldValue !== newValue;
        if (changed) {
            switch(name) {
                case 'seed':
                    this._updateSeed(newValue);
                    break;
            }
        }
    }

    set seed(seed) {
        this.setAttribute('seed', seed);
    }

    get seed() {
        return this.getAttribute('seed');
    }

    /**
     * Updates the data from a new seed.
     */
    _updateSeed(seed) {
        this._fetchData(seed)
            .then(data => this._updateData(data));
    }

    /**
     * Updates the displayed data.
     */
    _updateData(data) {
        const { picture, name, location, email, cell } = data;
        this.shadowRoot.querySelector('img').setAttribute('src', picture.large);
        this.shadowRoot.querySelector('#name').textContent = `${name.title} ${name.first} ${name.last}`;
        // street.number contains 4 digits which is improbable in France
        // Use of the first two for more realism
        const streetNumber = location.street.number > 1000 ? Math.floor(location.street.number / 100) : location.street.number;
        this.shadowRoot.querySelector('#address').textContent = `${streetNumber} ${location.street.name}\n${location.postcode} ${location.city}`;
        this.shadowRoot.querySelector('#email').textContent = email;
        this.shadowRoot.querySelector('#phone').textContent = cell.replace(/-/g, ' ');
    }

    /**
     * Calls the remote API to generate new person from the seed
     */
    async _fetchData(seed) {
        const queryParams = this._serialize({
            'nat': 'fr',
            seed
        });
        const url = `https://randomuser.me/api/?${queryParams}`;
        return await fetch(url)
            .then(response => response.json())
            .then(json => json.results[0]);
    }

    /**
     * Serializes an object into a string like key1=value1&key2=value2.
     * Do not support neested objects
     */
    _serialize(obj) {
        return new URLSearchParams(obj).toString();
    }
}

customElements.define('rand-card', RandCard);