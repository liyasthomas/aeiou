import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/app-layout/app-grid/app-grid-style.js';
import '@polymer/paper-input/paper-input.js';
import '@google/model-viewer';

class MyCollections extends PolymerElement {
	static get template() {
		return html `
      <style include="app-grid-style">
      </style>
      <style include="shared-styles">
        :host {
          display: block;
          --app-grid-item-height: 100%;
        }
				@media all and (min-width: 0) and (max-width: 360px) {
					:host {
						--app-grid-columns: 1;
						--app-grid-gutter: 16px;
						--app-grid-item-height: 100vw;
						--app-grid-expandible-item-columns: 1;
					}
					.list {
						width: 100%;
					}
				}
				@media all and (min-width: 361px) and (max-width: 640px) {
					:host {
						--app-grid-columns: 1;
						--app-grid-gutter: 16px;
						--app-grid-item-height: 80vw;
						--app-grid-expandible-item-columns: 1;
					}
					.list {
						width: 100%;
					}
				}
				@media all and (min-width: 641px) and (max-width: 960px) {
					:host {
						--app-grid-columns: 2;
						--app-grid-gutter: 32px;
						--app-grid-item-height: 60vw;
						--app-grid-expandible-item-columns: 2;
					}
					.list {
						width: 80vw;
					}
					.item:nth-child(5n+3) {
						@apply --app-grid-expandible-item;
					}
				}
				@media all and (min-width: 961px) {
					:host {
						--app-grid-columns: 3;
						--app-grid-gutter: 32px;
						--app-grid-item-height: 30vw;
						--app-grid-expandible-item-columns: 3;
					}
					.list {
						width: 50vw;
					}
				}
				paper-icon-button[active] {
					color: var(--accent-color);
				}
      </style>
			<iron-media-query query="min-width: 641px" query-matches="{{wideLayout}}"></iron-media-query>
			<iron-ajax auto url="../data/collections_feeds.json" id="ajax0" loading="{{loading0}}" handle-as="json" last-error="{{error0}}" last-response="{{ajaxResponse0}}">
			</iron-ajax>
			<template is="dom-if" if="{{loading0}}">
				<div class$="[[getUIType(UI)]] actions flex-center-center" hidden$="[[!loading0]]">
					<paper-spinner-lite active$="[[loading0]]"></paper-spinner-lite>
				</div>
			</template>
			<template is="dom-if" if="{{error0}}">
				<template is="dom-if" if="{{!loading0}}">
					<div class$="[[getUIType(UI)]] error">
						<paper-button on-click="tryAgain" aria-label="Try again">Try again<iron-icon icon="my-icons:refresh"></iron-icon></paper-button>
					</div>
				</template>
			</template>
			<template is="dom-repeat" items="[[ajaxResponse0.collections]]" as="collections">
				<div class$="[[getUIType(UI)]] content flex-justified">
					<paper-input class="searchInput" value="{{filterVal}}" no-label-float>
						<paper-icon-button icon="my-icons:search" slot="prefix"></paper-icon-button>
						<paper-icon-button slot="suffix" on-click="clearInput" icon="my-icons:close" alt="clear" title="clear" hidden$="{{!filterVal}}"></paper-icon-button>
					</paper-input>
				</div>
				<div class$="[[getUIType(UI)]] actions flex-justified">
					<div class="title">
						{{collections.title}}
					</div>
					<div>
						<paper-icon-button
								toggles
								active="{{controls}}"
								icon="my-icons:pan-tool">
						</paper-icon-button>
						<paper-icon-button
								toggles
								active="{{autoRotate}}"
								icon="my-icons:3d-rotation">
						</paper-icon-button>
						<paper-icon-button
								hidden$="{{!wideLayout}}"
								toggles
								active="{{UI}}"
								icon$="my-icons:[[getUIIcon(UI)]]">
						</paper-icon-button>
						<paper-menu-button horizontal-align="right">
							<paper-icon-button icon="my-icons:sort" slot="dropdown-trigger"></paper-icon-button>
							<paper-listbox slot="dropdown-content" class="listbox" attr-for-selected="name" selected="{{sortVal}}">
								<paper-icon-item name="none"><iron-icon icon="my-icons:date-range" slot="item-icon"></iron-icon>Date<paper-ripple></paper-ripple></paper-icon-item>
								<paper-icon-item name="title"><iron-icon icon="my-icons:sort-by-alpha" slot="item-icon"></iron-icon>Alphabet<paper-ripple></paper-ripple></paper-icon-item>
							</paper-listbox>
						</paper-menu-button>
					</div>
				</div>
				<div class$="[[getUIType(UI)]] app-grid" has-aspect-ratio>
					<template is="dom-repeat" items="[[collections.sub]]" as="sub" filter="{{_filter(filterVal)}}" sort="{{_sort(sortVal)}}" rendered-item-count="{{renderedCount}}">
						<div class$="[[_computeBgClass(sub.color)]] item">
							<div class="container">
								<div class="block top">
									<div class="title">{{sub.title}}</div>
								</div>
								<div class="block mid">
									<div class="description">{{sub.description}}</div>
								</div>
								<div class="flexchild flex-vertical">
									<model-viewer src="{{sub.model}}"
																class$="[[_computeBgClass(sub.color)]]"
																alt="{{sub.title}}"
																controls$="{{controls}}"
																auto-rotate$="{{autoRotate}}"
																background-image="{{sub.bg}}"
																background-color="{{sub.ccode}}"
																reveal-when-loaded
																preload
																poster="{{sub.img}}">
									</model-viewer>
								</div>
								<div class="block bottom">
									<div class="info">
										<div class="flexchild">
											<a href="{{sub.link}}"><paper-button aria-label="Info">{{sub.info}}</paper-button></a>
										</div>
										<div>
											<a href="{{sub.link}}"><paper-icon-button icon="my-icons:{{sub.icon}}" aria-label="Icon"></paper-icon-button></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</template>
					<template is="dom-if" if="{{!renderedCount}}">
						Nothing found for '{{filterVal}}'
					</template>
				</div>
			</template>
    `;
	}

	static get properties() {
		return {
			sortVal: {
				type: String,
				value: "none",
				reflectToAttribute: true
			},
			controls: {
				type: Boolean,
				value: true,
				reflectToAttribute: true
			}
		};
	}

	attached() {
		this._updateGridStyles = this._updateGridStyles || function () {
			this.updateStyles();
		}.bind(this);
		window.addEventListener('resize', this._updateGridStyles);
	}

	detached() {
		window.removeEventListener('resize', this._updateGridStyles);
	}

	_filter(val) {
		return function (sub) {
			if (!val) return true;
			if (!sub) return false;
			return (sub.title && ~sub.title.toLowerCase().indexOf(val.toLowerCase())) ||
				(sub.description && ~sub.description.toLowerCase().indexOf(val.toLowerCase()));
		};
	}

	_sort(val) {
		switch (val) {
			case 'title':
				return function (a, b) {
					if (a.title.toLowerCase() === b.title.toLowerCase()) return 0;
					return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
				};
		}
	}

	clearInput() {
		this.filterVal = null;
	}

	tryAgain() {
		this.$.ajax0.generateRequest();
	}

	getUIType(UI) {
		return UI ? 'list' : 'grid';
	}

	getUIIcon(icon) {
		return icon ? 'dashboard' : 'view-agenda';
	}

	_computeBgClass(color) {
		return color + '-bg';
	}

	_computeFgClass(color) {
		return color + '-fg';
	}
}

window.customElements.define('my-collections', MyCollections);
