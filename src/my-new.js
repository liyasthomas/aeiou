import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@polymer/iron-collapse/iron-collapse.js';

class MyNew extends PolymerElement {
	static get template() {
		return html `
      <style include="shared-styles">
				:host {
          display: block;
					--paper-tabs-selection-bar-color: var(--accent-color);
				}
				demo-snippet {
					--demo-snippet-demo: {
//						display: none;
					}
					--demo-snippet-code: {
//						background-color: #232323;
						padding: 16px;
					}
					--demo-snippet: {
						box-shadow: none;
						overflow: auto;
						border: 1px solid #e0e0e0;
						border-radius: 8px;
					}
				}
				paper-tabs {
					height: 100%;
					background-color: var(--paper-grey-100);
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
			<iron-ajax auto url="../data/thisthat.json" id="ajax0" loading="{{loading0}}" handle-as="json" last-error="{{error0}}" last-response="{{ajaxResponse0}}">
			</iron-ajax>
			<paper-tabs selected="{{selected}}" attr-for-selected="name">
				<paper-tab name="markerbased">Marker based</paper-tab>
				<paper-tab name="markerless">Marker less</paper-tab>
			</paper-tabs>
			<iron-pages selected="{{selected}}" attr-for-selected="name">
				<div name="markerbased">
					<template is="dom-if" if="{{loading0}}">
						<div class="grid actions flex-center-center" hidden$="[[!loading0]]">
							<paper-spinner-lite active$="[[loading0]]"></paper-spinner-lite>
						</div>
					</template>
					<template is="dom-if" if="{{error0}}">
						<template is="dom-if" if="{{!loading0}}">
							<div class="grid error">
								<paper-button on-click="tryAgain" aria-label="Try again">Try again<iron-icon icon="my-icons:refresh"></iron-icon></paper-button>
							</div>
						</template>
					</template>
					<div class="actions flex-center-center">
						<h1>
							<template is="dom-repeat" items="[[ajaxResponse0.this]]" as="this">
								if
								<div>
									<paper-dropdown-menu label="{{this.title}}" no-label-float>
										<paper-listbox slot="dropdown-content" class="listbox" attr-for-selected="id" selected="{{selectedThis}}">
											<template is="dom-repeat" items="[[this.sub]]" as="sub">
												<paper-icon-item id="{{sub.link}}"><iron-icon icon="my-icons:{{sub.icon}}" slot="item-icon"></iron-icon>{{sub.title}}<paper-ripple></paper-ripple></paper-icon-item>
											</template>
										</paper-listbox>
									</paper-dropdown-menu>
								</div>
							</template>
							<template is="dom-repeat" items="[[ajaxResponse0.that]]" as="that">
								then
								<div>
									<paper-dropdown-menu label="{{that.title}}" no-label-float>
										<paper-listbox slot="dropdown-content" class="listbox" attr-for-selected="id" selected="{{selectedThat}}">
											<template is="dom-repeat" items="[[that.sub]]" as="sub">
												<paper-icon-item id="{{sub.link}}"><iron-icon icon="my-icons:{{sub.icon}}" slot="item-icon"></iron-icon>{{sub.title}}<paper-ripple></paper-ripple></paper-icon-item>
											</template>
										</paper-listbox>
									</paper-dropdown-menu>
								</div>
							</template>
						</h1>
					</div>
					<div class="actions flex-center-center">
						<a href="{{selectedThis}}/{{selectedThat}}"><paper-button class="primary" aria-label="Next">Create<iron-icon icon="my-icons:chevron-right"></iron-icon></paper-button></a>
						<paper-button on-click="toggle" aria-expanded$="[[opened]]" aria-controls="collapse">[[_getText(opened)]] code<iron-icon icon="my-icons:[[_getIcon(opened)]]"></iron-icon></paper-button>
					</div>
					<iron-collapse id="collapse" opened="{{opened}}" tabindex="-1">
						<div class="grid actions flex-center-center">
							<demo-snippet>
								<template preserve-content>
<h3>Demo using A-Frame and AR.js</h3>
<script src="https://aframe.io/releases/0.6.1/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.5.0/aframe/build/aframe-ar.js"> </script>
<a-scene embedded arjs>
	<a-marker preset="{{selectedThis}}/{{selectedThat}}">
		<a-box position='0 0.5 0' material='color: black;'></a-box>
	</a-marker>
<a-entity camera></a-entity>
</a-scene>
								</template>
							</demo-snippet>
						</div>
					</iron-collapse>
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
			},
			opened: {
				type: Boolean,
				reflectToAttribute: true
			}
		};
	}

	tryAgain() {
		this.$.ajax0.generateRequest();
	}

	_getText(opened) {
		return opened ? 'Hide' : 'View';
	}

	_getIcon(opened) {
		return opened ? 'expand-less' : 'expand-more';
	}

	toggle() {
		this.$.collapse.toggle();
	}
}

window.customElements.define('my-new', MyNew);
