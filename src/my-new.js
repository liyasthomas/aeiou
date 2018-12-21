import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-icon-item.js';

class MyNew extends PolymerElement {
	static get template() {
		return html `
      <style include="shared-styles">
				:host {
          display: block;
				}
				paper-tabs {
					height: 100%;
					background-color: var(--light-primary-color);
				}
				paper-tab:hover {
					--paper-tab-content-unselected: {
						opacity: 1;
					}
				}
				paper-tab {
        	font-family: "Prompt", "Roboto", "Noto", sans-serif;
					text-transform: capitalize;
					padding: 0;
					font-size: 18px;
					font-weight: 600;
					padding: 16px;
				}
				paper-tab a {
					@apply --layout-horizontal;
					@apply --layout-center-center;
				}
				paper-tab.iron-selected {
					color: var(--accent-color);
				}
				h1 {
					font-size: 48px;
					color: var(--secondary-text-color);
					text-align: center;
				}
				paper-dropdown-menu {
					--paper-input-container-label: {
        		font-family: "Prompt", "Roboto", "Noto", sans-serif;
						color: var(--accent-color);
						text-align: center;
						font-weight: 700;
						font-size: 48px;
						height: 100%;
						@apply --layout-vertical;
						@apply --layout-center-center;
					};
					--paper-input-container-input: {
        		font-family: "Prompt", "Roboto", "Noto", sans-serif;
						color: var(--accent-color);
						text-align: center;
						font-weight: 700;
						font-size: 48px;
					};
					--paper-input-container-underline: {
						display: none;
					};
				}
      </style>
			<paper-tabs selected="{{selected}}" attr-for-selected="name" no-bar>
				<paper-tab name="markerbased">Marker based</paper-tab>
				<paper-tab name="markerless">Marker less</paper-tab>
			</paper-tabs>
			<iron-pages selected="{{selected}}" attr-for-selected="name">
				<div name="markerbased">
					<div class="actions flex-center-center">
						<h1>
							if
							<div>
								<paper-dropdown-menu label="this" no-label-float>
									<paper-listbox slot="dropdown-content" class="listbox" attr-for-selected="id" selected="{{selectedThis}}">
										<paper-icon-item id="browsethis"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Custom marker</paper-icon-item>
										<paper-icon-item id="marker1"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Marker #1</paper-icon-item>
										<paper-icon-item id="marker2"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Marker #2</paper-icon-item>
										<paper-icon-item id="marker3"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Marker #3</paper-icon-item>
										<paper-icon-item id="marker4"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Marker #4</paper-icon-item>
									</paper-listbox>
								</paper-dropdown-menu>
							</div>
							then
							<div>
								<paper-dropdown-menu id="that" label="that" no-label-float>
									<paper-listbox slot="dropdown-content" class="listbox" attr-for-selected="id" selected="{{selectedThat}}">
										<paper-icon-item id="browsethat"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Browse</paper-icon-item>
										<paper-icon-item id="plant"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Plant</paper-icon-item>
										<paper-icon-item id="pet"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Pet</paper-icon-item>
										<paper-icon-item id="photo"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Photo</paper-icon-item>
									</paper-listbox>
								</paper-dropdown-menu>
							</div>
						</h1>
					</div>
					<div class="actions flex-center-center">
						<a href="{{selectedThis}}/{{selectedThat}}">
							<paper-button class="primary" aria-label="Next">Create<iron-icon icon="my-icons:chevron-right"></iron-icon></paper-button>
						</a>
					</div>
				</div>
				<div name="markerless">
					Page Two
				</div>
			</iron-pages>
    `;
	}

	static get properties() {
		return {
			selected: {
				type: String,
				value: "markerbased",
				reflectToAttribute: true
			}
		};
	}
}

window.customElements.define('my-new', MyNew);
