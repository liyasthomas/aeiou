import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/app-layout/app-grid/app-grid-style.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';

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
			<paper-dialog id="scrolling">
				<div class="flex-horizontal flex-justified">
					<div class="title">{{selectedThat}}</div>
					<div>
						<paper-icon-button icon="my-icons:close" dialog-dismiss></paper-icon-button>
					</div>
				</div>
				<paper-dialog-scrollable id="modal">
				</paper-dialog-scrollable>
			</paper-dialog>
			<paper-toast id="shareToast" text="URL copied! ({{selectedThat}})"></paper-toast>
			<paper-toast id="deleteToast" class="delete" duration="0" text="Delete scene? ({{selectedThat}})">
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
								toggles
								active="{{controls}}"
								icon="my-icons:pan-tool">
						</paper-icon-button>
						<paper-icon-button
								toggles
								active="{{rotate}}"
								icon="my-icons:360">
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
					<template is="dom-repeat" items="[[activity.sub]]" as="sub" filter="{{_filter(filterVal)}}" sort="{{_sort(sortVal)}}" rendered-item-count="{{renderedCount}}">
						<iron-selector attr-for-selected="name" selected="{{selectedThat}}">
							<div class="item" name="{{sub.model}}">
								<div class="container">
									<div class="block top">
										<div class="title">{{sub.title}}</div>
									</div>
									<div class="block mid">
										<div class="description">{{sub.description}}</div>
									</div>
									<div class="flexchild flex-vertical">
										<model-viewer src="https://raw.githubusercontent.com/liyasthomas/lvr/master/assets/gltf/{{sub.model}}/scene.gltf"
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
												<paper-icon-button icon="my-icons:share" aria-label="Share" on-click="shareThis"></paper-icon-button>
												<paper-icon-button icon="my-icons:delete" aria-label="Delete" on-click="deleteThis"></paper-icon-button>
												<paper-icon-button icon="my-icons:favorite" aria-label="Like"></paper-icon-button>
												<paper-icon-button icon="my-icons:{{sub.icon}}" aria-label="Icon" on-click="openModal"></paper-icon-button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</iron-selector>
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
			selectedThat: {
				type: String,
				value: 0,
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
		this.$.shareToast.show();
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

	openModal(e) {
		this.$.scrolling.open();
		let modal = (this.$.scrolling.opened) ?
			`
<model-viewer class="mo"
							src="https://raw.githubusercontent.com/liyasthomas/lvr/master/assets/gltf/` + this.selectedThat + `/scene.gltf"
							alt="` + this.selectedThat + `"
							controls
							auto-rotate
							background-color="#eee"
							reveal-when-loaded
							preload
							poster="../images/assets/app/puff.svg">
</model-viewer>
			` :
			`
<template>
Something went wrong!
</template>
			`;
		this.$.modal.innerHTML = modal;
	}
}

window.customElements.define('my-activity', MyActivity);
