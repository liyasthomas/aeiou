import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/app-layout/app-grid/app-grid-style.js';
import '@polymer/paper-input/paper-input.js';

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
						--app-grid-item-height: 90vw;
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
						--app-grid-item-height: 40vw;
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
						--app-grid-columns: 4;
						--app-grid-gutter: 32px;
						--app-grid-item-height: 25vw;
						--app-grid-expandible-item-columns: 2;
					}
					.list {
						width: 60vw;
					}
					.item:nth-child(5n+1) {
						@apply --app-grid-expandible-item;
					}
					.item:nth-child(5n+2) {
						@apply --app-grid-expandible-item;
					}
					.item:nth-child(5n+4) {
						@apply --app-grid-expandible-item;
					}
				}
				paper-input {
					background-color: var(--paper-grey-200);
					border-radius: 32px;
					--paper-input-container: {
						padding: 4px 8px;
					};
					--paper-input-container-underline: {
						display: none;
						height: 0;
					};
					--paper-input-container-underline-focus: {
						display: none;
					};
					--paper-input-container-input: {
						padding: 4px 8px;
					};
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
					<paper-input id="searchInput" value="{{filterVal}}" no-label-float>
						<paper-icon-button icon="my-icons:search" slot="prefix"></paper-icon-button>
						<paper-icon-button slot="suffix" on-click="clearInput" icon="my-icons:close" alt="clear" title="clear"></paper-icon-button>
					</paper-input>
				</div>
				</div>
				<div class$="[[getUIType(UI)]] actions flex-justified">
					<div class="title">
						{{collections.title}}
					</div>
					<div>
						<paper-menu-button horizontal-align="right">
 							<paper-icon-button icon="my-icons:sort" slot="dropdown-trigger"></paper-icon-button>
							<paper-listbox slot="dropdown-content" class="listbox" attr-for-selected="name" selected="{{sortVal}}">
								<paper-icon-item name="title"><iron-icon icon="my-icons:sort-by-alpha" slot="item-icon"></iron-icon>Alphabet<paper-ripple></paper-ripple></paper-icon-item>
								<paper-icon-item name="description"><iron-icon icon="my-icons:date-range" slot="item-icon"></iron-icon>Date<paper-ripple></paper-ripple></paper-icon-item>
								<paper-icon-item name="none"><iron-icon icon="my-icons:close" slot="item-icon"></iron-icon>None<paper-ripple></paper-ripple></paper-icon-item>
							</paper-listbox>
						</paper-menu-button>
						<paper-icon-button
								hidden$="{{!wideLayout}}"
								toggles
								active="{{UI}}"
								icon$="my-icons:[[getUIIcon(UI)]]">
						</paper-icon-button>
					</div>
				</div>
				<div class$="[[getUIType(UI)]] app-grid" has-aspect-ratio>
					<template is="dom-repeat" items="[[collections.sub]]" as="sub" filter="{{_filter(filterVal)}}" sort="{{_sort(sortVal)}}">
						<div class$="[[_computeBgClass(sub.color)]] item">
							<div class="container">
								<div class="block top">
									<div class="title">{{sub.title}}</div>
								</div>
								<div class="block mid">
									<div class="description">{{sub.description}}</div>
								</div>
								<div class="flexchild flex-vertical">
									<iron-image class="bg" preload fade sizing="contain" src="{{sub.img}}"  alt="{{sub.title}}"></iron-image>
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
				</div>
			</template>
			<template is="dom-repeat" items="[[ajaxResponse0.discover]]" as="discover">
				<div class$="[[getUIType(UI)]] actions flex-justified">
					<div class="title">
						{{discover.title}}
					</div>
					<paper-icon-button
							hidden$="{{!wideLayout}}"
							toggles
							active="{{UI}}"
							icon$="my-icons:[[getUIIcon(UI)]]">
					</paper-icon-button>
				</div>
				<div class$="[[getUIType(UI)]] app-grid" has-aspect-ratio>
					<template is="dom-repeat" items="[[discover.sub]]" as="sub">
						<div class$="[[_computeBgClass(sub.color)]] item">
							<div class="container">
								<div class="block top">
									<div class="title">{{sub.title}}</div>
								</div>
								<div class="block mid">
									<div class="description">{{sub.description}}</div>
								</div>
								<div class="flexchild flex-vertical">
									<iron-image class="bg" preload fade sizing="contain" src="{{sub.img}}"  alt="{{sub.title}}"></iron-image>
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
				</div>
				<div class$="[[getUIType(UI)]] actions flex-center-center">
					<a href="{{discover.link}}">
						<paper-button class="primary" aria-label="View all">Discover more<iron-icon icon="my-icons:chevron-right"></iron-icon></paper-button>
					</a>
				</div>
			</template>
    `;
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
			case 'description':
				return function (a, b) {
					if (a.description.toLowerCase() === b.description.toLowerCase()) return 0;
					return a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1;
				};
		}
	}

	clearInput() {
		this.$.searchInput.value = '';
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
