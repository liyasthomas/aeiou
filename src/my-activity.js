import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/app-layout/app-grid/app-grid-style.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@google/model-viewer';

class MyActivity extends PolymerElement {
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
						--app-grid-item-height: 110vw;
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
						--app-grid-item-height: 100vw;
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
				paper-toast.delete {
					--paper-toast-background-color: red;
					--paper-toast-color: white;
				}
      </style>
			<paper-toast id="shareToast" text="URL copied!"></paper-toast>
			<paper-toast id="deleteToast" class="delete" duration="0" text="Delete scene?">
				<div>
					<paper-icon-button icon="my-icons:done" aria-label="Delete" on-click="deleteThis"></paper-icon-button>
					<paper-icon-button icon="my-icons:close" aria-label="Cancel" on-click="deleteThis"></paper-icon-button>
				</div>
			</paper-toast>
			<iron-media-query query="min-width: 641px" query-matches="{{wideLayout}}"></iron-media-query>
			<iron-ajax auto url="../data/activity_feeds.json" id="ajax0" loading="{{loading0}}" handle-as="json" last-error="{{error0}}" last-response="{{ajaxResponse0}}">
			</iron-ajax>
			<template is="dom-if" if="{{loading0}}">
				<div class$="[[getUIType(UI)]] actions flex-center-center" hidden$="[[!loading0]]">
					<paper-spinner-lite active$="[[loading0]]"></paper-spinner-lite>
				</div>
			</template>
			<template is="dom-if" if="{{error0}}">
				<template is="dom-if" if="{{!loading0}}">
					<div class$="[[getUIType(UI)]] error">
						<paper-button on-click="tryAgain" aria-label="Try again">Try again</paper-button>
					</div>
				</template>
			</template>
			<template is="dom-repeat" items="[[ajaxResponse0.activity]]" as="activity">
				<div class$="[[getUIType(UI)]] content flex-justified">
					<paper-input class="searchInput" value="{{filterVal}}" no-label-float>
						<paper-icon-button icon="my-icons:search" slot="prefix"></paper-icon-button>
						<paper-icon-button slot="suffix" on-click="clearInput" icon="my-icons:close" alt="clear" title="clear" hidden$="{{!filterVal}}"></paper-icon-button>
					</paper-input>
				</div>
				<div class$="[[getUIType(UI)]] actions flex-justified">
					<div class="title">
						{{activity.title}}
					</div>
					<div>
						<paper-icon-button
								id="controls"
								toggles
								active="{{controls}}"
								icon="my-icons:pan-tool">
						</paper-icon-button>
						<paper-tooltip for="controls" position="top" animation-delay="0">Toggle controls</paper-tooltip>
						<paper-icon-button
								id="rotate"
								toggles
								active="{{rotate}}"
								icon="my-icons:360">
						</paper-icon-button>
						<paper-tooltip for="rotate" position="top" animation-delay="0">Toggle rotation</paper-tooltip>
						<paper-icon-button
								id="ui"
								hidden$="{{!wideLayout}}"
								toggles
								active="{{UI}}"
								icon$="my-icons:[[getUIIcon(UI)]]">
						</paper-icon-button>
						<paper-tooltip for="ui" position="top" animation-delay="0">Toggle grid / list</paper-tooltip>
						<paper-menu-button id="sort" horizontal-align="right">
							<paper-icon-button icon="my-icons:sort" slot="dropdown-trigger"></paper-icon-button>
							<paper-listbox slot="dropdown-content" class="listbox" attr-for-selected="name" selected="{{sortVal}}">
								<paper-icon-item name="none"><iron-icon icon="my-icons:date-range" slot="item-icon"></iron-icon>Date<paper-ripple></paper-ripple></paper-icon-item>
								<paper-icon-item name="title"><iron-icon icon="my-icons:sort-by-alpha" slot="item-icon"></iron-icon>Alphabet<paper-ripple></paper-ripple></paper-icon-item>
							</paper-listbox>
						</paper-menu-button>
						<paper-tooltip for="sort" position="top" animation-delay="0">Sort</paper-tooltip>
					</div>
				</div>
				<div class$="[[getUIType(UI)]] app-grid" has-aspect-ratio>
					<template is="dom-repeat" items="[[activity.sub]]" as="sub" filter="{{_filter(filterVal)}}" sort="{{_sort(sortVal)}}" rendered-item-count="{{renderedCount}}">
						<div class="item">
							<div class="container">
								<div class="block top">
									<div class="title">{{sub.title}}</div>
								</div>
								<div class="block mid">
									<div class="description">{{sub.description}}</div>
								</div>
								<div class="flexchild flex-vertical">
									<model-viewer src="{{sub.model}}"
																alt="{{sub.title}}"
																controls$="{{controls}}"
																auto-rotate$="{{rotate}}"
																background-image="{{sub.bg}}"
																background-color="#eee"
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
											<paper-icon-button icon="my-icons:delete" aria-label="Delete" on-click="deleteThis"></paper-icon-button>
											<paper-icon-button icon="my-icons:share" aria-label="Share" on-click="shareThis"></paper-icon-button>
											<paper-icon-button icon="my-icons:favorite" aria-label="Like"></paper-icon-button>
											<a href="{{sub.link}}"><paper-icon-button icon="my-icons:{{sub.icon}}" aria-label="Icon"></paper-icon-button></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</div>
				<template is="dom-if" if="{{!renderedCount}}">
					<div class$="[[getUIType(UI)]] content flex-justified">
						Nothing found for "{{filterVal}}" - <a class="link" href="404">Try harder</a>
					</div>
				</template>
				<div class$="[[getUIType(UI)]] actions flex-center-center">
					<a href="{{activity.link}}">
						<paper-button class="primary" aria-label="View all">Load more</paper-button>
					</a>
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

	shareThis() {
		this.$.shareToast.toggle();
//		this.$.input.select();
//		document.execCommand('copy');
	}

	deleteThis() {
		this.$.deleteToast.toggle();
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

window.customElements.define('my-activity', MyActivity);
