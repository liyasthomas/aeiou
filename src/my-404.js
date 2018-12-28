import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';

class My404 extends PolymerElement {
	static get template() {
		return html `
      <style>
				:host {
					display: flex;
					text-align: center;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 32px;
					height: calc(100vh - 128px);
					color: #b2b2b2;
				}
				h1 {
					font-size: 3em;
					line-height: 1;
					margin: 0;
				}
      </style>
			<h1>404</h1>
			<p>page not found</p>
			<div style="margin-top: 32px;"><paper-fab icon="my-icons:arrow-back" aria-label="Back" onclick="history.back()"></paper-fab></div>
    `;
	}
}

window.customElements.define('my-404', My404);
