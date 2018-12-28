import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-collapse/iron-collapse.js';
//import '@google/model-viewer';

class MyNew extends PolymerElement {
	static get template() {
		return html `
      <style include="demo-pages-shared-styles"></style>
      <style include="shared-styles">
				:host {
					display: block;
					--paper-tabs-selection-bar-color: var(--accent-color);
				}
				demo-snippet {
					margin: 16px 0;
					--demo-snippet-demo: {
//						display: none;
						border-bottom: 2px dashed #b2b2b2;
					}
					--demo-snippet-code: {
						-webkit-touch-callout: auto;
						-webkit-user-select: all;
						user-select: all;
						max-height: 360px;
//						background-color: #fff;
					}
					--demo-snippet: {
						box-shadow: none;
						overflow: auto;
						border: 2px dashed #b2b2b2;
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
				model-viewer {
					border-radius: 8px;
					border-top: 1px solid var(--light-text-color);
					border-bottom: 1px solid var(--light-text-color);
					width: 80vw;
					height: 60vh;
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
					<div class="content flex-center-center">
						<h1>
							if
						</h1>
						<div>
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
							<template is="dom-repeat" items="[[ajaxResponse0.this]]" as="this">
								<paper-dropdown-menu label="{{this.title}}" no-label-float>
									<paper-listbox id="selectedThis" slot="dropdown-content" class="listbox" attr-for-selected="name" selected="{{selectedThis}}">
										<template is="dom-repeat" items="[[this.sub]]" as="sub">
											<paper-icon-item name="{{sub.link}}"><iron-icon icon="my-icons:{{sub.icon}}" slot="item-icon"></iron-icon>{{sub.title}}<paper-ripple></paper-ripple></paper-icon-item>
										</template>
									</paper-listbox>
								</paper-dropdown-menu>
								<paper-icon-button on-click="resetThis" icon="my-icons:refresh" aria-label="Reset" hidden$="{{!selectedThis}}"></paper-icon-button>
							</template>
						</div>
						<h1>
							then
						</h1>
						<div>
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
							<template is="dom-repeat" items="[[ajaxResponse0.that]]" as="that">
								<paper-dropdown-menu label="{{that.title}}" no-label-float>
									<paper-listbox id="selectedThat" slot="dropdown-content" class="listbox" attr-for-selected="name" selected="{{selectedThat}}">
										<template is="dom-repeat" items="[[that.sub]]" as="sub">
											<paper-icon-item name="{{sub.link}}"><iron-icon icon="my-icons:{{sub.icon}}" slot="item-icon"></iron-icon>{{sub.title}}<paper-ripple></paper-ripple></paper-icon-item>
										</template>
									</paper-listbox>
								</paper-dropdown-menu>
								<paper-icon-button on-click="resetThat" icon="my-icons:refresh" aria-label="Reset" hidden$="{{!selectedThat}}"></paper-icon-button>
							</template>
						</div>
					</div>
					<div class="content flex-center-center">
						<a href="{{selectedThis}}/{{selectedThat}}" disabled$="[[isInputEmpty(selectedThis, selectedThat)]]"><paper-button class="primary" aria-label="Next" disabled="[[isInputEmpty(selectedThis, selectedThat)]]">Create<iron-icon icon="my-icons:chevron-right"></iron-icon></paper-button></a>
					</div>
					<div class="content flex-center-center">
						<paper-button on-click="toggle" aria-expanded$="[[opened]]" aria-controls="collapse" disabled="[[isInputEmpty(selectedThis, selectedThat)]]">[[_getText(opened)]] code<iron-icon icon="my-icons:[[_getIcon(opened)]]"></iron-icon></paper-button>
					</div>
					<iron-collapse id="collapse" opened="{{opened}}" tabindex="-1">
						<div class="grid content">
							<div class="title">Standalone file</div>
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
					<div class="grid flex-center-center">
						<div class="actions">
							<div class="title">Create new scene</div>
						</div>
						<div class="content">
							<model-viewer src="../gltf/test/scene.gltf"
														alt="title"
														controls
														background-color="#eee"
														reveal-when-loaded
														preload
														poster="../images/assets/app/puff.svg">
							</model-viewer>
						</div>
					</div>
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
			selectedThis: {
				type: String,
				value: 0,
				reflectToAttribute: true
			},
			selectedThat: {
				type: String,
				value: 0,
				reflectToAttribute: true
			},
			opened: {
				type: Boolean,
				reflectToAttribute: true
			}
		};
	}

	resetThis() {
		this.selectedThis = 0;
	}

	resetThat() {
		this.selectedThat = 0;
	}

	isInputEmpty(a, b) {
		if (a === 0 || b === 0) return true;
		return false;
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
