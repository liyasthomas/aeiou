import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import {
	setPassiveTouchGestures,
	setRootPath
} from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-progress/paper-progress.js';
import '@polymer/paper-fab/paper-fab.js';
import './shared-styles.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
	static get template() {
		return html `
      <style include="shared-styles">
        :host {
          display: block;
					--primary-color: #fff;
					--light-primary-color: rgba(0, 0, 0, .05);
					--dark-primary-color: rgba(0, 0, 0, .54);
					--accent-color: var(--paper-light-blue-a400);
					--light-accent-color: var(--paper-light-blue-a200);
					--dark-accent-color: var(--paper-light-blue-a700);
					--primary-text-color: rgba(0, 0, 0, .87);
					--secondary-text-color: rgba(0, 0, 0, .54);
					--divider-text-color: rgba(0, 0, 0, .38);
					--light-text-color: rgba(0, 0, 0, .12);
					--paper-tabs-selection-bar-color: #fff;
					--paper-tab-ink: var(--light-text-color);
					--paper-fab-keyboard-focus-background: var(--accent-color);
					--paper-progress-active-color: #fff;
					--paper-spinner-color: var(--accent-color);
//					--paper-progress-secondary-color: var(--dark-accent-color);
					--paper-progress-container-color: var(--light-accent-color);
					color: var(--primary-text-color);
					--iron-icon-height: 26px;
					--iron-icon-width: 26px;
        }
				[hidden] {
					display: none !important;
				}
				.leftItem {
					display: none;
					text-transform: capitalize;
				}
				:host(:not([page=home])) .leftItem {
					display: block;
				}
				:host([page=new]) #fab {
					display: none;
				}
				#home.iron-selected, #collections.iron-selected, #discover.iron-selected, #activity.iron-selected {
					color: #fff;
				}
				app-header {
					background-color: var(--accent-color);
					color: #fff;
					--app-header-shadow: {
						box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.2);
					};
				}
				app-toolbar {
					padding: 0 8px;
				}
				[sticky] {
					padding: 0;
				}
				[main-title] {
					font-size: 32px;
					overflow: hidden;
					text-overflow: ellipsis;
					font-weight: 900;
					margin-left: 16px;
				}
				[condensed-title] {
					font-size: 24px;
					overflow: hidden;
					text-overflow: ellipsis;
					font-weight: 700;
					margin-left: 8px;
				}
				paper-tabs {
					height: 100%;
				}
				paper-tab:hover {
					--paper-tab-content-unselected: {
						opacity: 1;
					}
				}
				paper-tab {
					--paper-tab-content-unselected: {
						opacity: .5;
					}
        	font-family: "Prompt", "Roboto", "Noto", sans-serif;
					text-transform: capitalize;
					padding: 0;
					font-size: 18px;
					font-weight: 600;
					padding: 0 16px;
				}
				paper-tab a {
					@apply --layout-horizontal;
					@apply --layout-center-center;
				}
				paper-tab span {
					margin-left: 8px;
				}
				#pages {
					@apply --layout-flex;
				}
				paper-progress {
					display: block;
					width: 100%;
				}
				paper-toast {
					@apply --layout-horizontal;
					@apply --layout-center;
					@apply --layout-justified;
					border-radius: 8px;
        	font-family: "Prompt", "Roboto", "Noto", sans-serif;
					font-weight: 600;
				}
				.toast-button {
					margin: 8px;
				}
				#fab {
					@apply --shadow-elevation-4dp;
					position: fixed;
					z-index: 6;
					right: 20px;
					bottom: 20px;
				}
				#sharehome {
					max-width: 320px;
					background-color: #fff !important;
					color: var(--secondary-text-color);
				}
				@media (max-width: 640px) {
					paper-toast {
						max-width: none;
						width: calc(100% - 24px);
					}
					#sharehome {
						max-width: none;
					}
					paper-tabs {
						width: 100%;
					}
					paper-tab span {
						display: none;
					}
					.rightItem {
						display: none;
					}
					:host([page=home]) .rightItem {
						display: block;
					}
				}
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>
      <iron-media-query query="min-width: 641px" query-matches="{{wideLayout}}"></iron-media-query>
			<paper-toast id="updateToast" duration="3000" text="App cahed. Browse offline!"></paper-toast>
			<paper-toast id="sharehome" duration="0">
				<div class="flex-vertical">
					<div class="flex-horizontal">
						<div class="flexchild">Connect via</div>
						<paper-icon-button icon="my-icons:close" on-tap="openShare" aria-label="Close"></paper-icon-button>
					</div>
					<div on-tap="openShare">
						<template is="dom-repeat" items="[[social]]">
							<a href="{{item.link}}" target="_blank" rel="noopener">
								<paper-icon-button class="toast-button" src="../images/assets/social/{{item.icon}}.svg" aria-label="Icon"></paper-icon-button>
							</a>
						</template>
						<a href="mailto:liyascthomas@gmail.com?&subject=Hello Liyas!&body=Hi,">
							<paper-icon-button class="toast-button" icon="my-icons:mail-outline" aria-label="Icon"></paper-icon-button>
						</a>
						<a href="tel:+919539653962">
							<paper-icon-button class="toast-button" icon="my-icons:phone" aria-label="Icon"></paper-icon-button>
						</a>
						<a href="activity">
							<paper-icon-button class="toast-button" icon="my-icons:more-horiz" aria-label="Icon"></paper-icon-button>
						</a>
					</div>
				</div>
			</paper-toast>
			<!-- Main content -->
			<app-header-layout>
				<app-header id="toolbar" class="toolbar" slot="header" fixed condenses reveals effects="waterfall">
					<app-toolbar>
						<paper-icon-button class="leftItem" hidden$="{{wideLayout}}" icon="my-icons:arrow-back" aria-label="Back" onclick="history.back()"></paper-icon-button>
						<div condensed-title class="leftItem" hidden$="{{wideLayout}}">{{page}}</div>
						<div main-title class="rightItem">AEIOU</div>
						<a href=""><paper-icon-button id="notifications" icon="my-icons:notifications" aria-label="Create new"></paper-icon-button></a>
						<paper-tooltip for="notifications" animation-delay="0">Notifications</paper-tooltip>
						<paper-menu-button id="more" horizontal-align="right">
							<paper-icon-button icon="my-icons:more-vert" slot="dropdown-trigger" aria-label="More options"></paper-icon-button>
							<paper-listbox class="listbox" slot="dropdown-content">
								<a href="">
									<paper-icon-item>
										<iron-icon icon="my-icons:face" slot="item-icon"></iron-icon>
										<span>Profile</span>
										<paper-ripple></paper-ripple>
									</paper-icon-item>
								</a>
								<a href="">
									<paper-icon-item>
										<iron-icon icon="my-icons:settings" slot="item-icon"></iron-icon>
										<span>Settings</span>
										<paper-ripple></paper-ripple>
									</paper-icon-item>
								</a>
								<a href="#" onclick="return false;">
									<paper-icon-item on-tap="openShare">
										<iron-icon icon="my-icons:share" slot="item-icon"></iron-icon>
										<span>Share</span>
										<paper-ripple></paper-ripple>
									</paper-icon-item>
								</a>
								<a href="">
									<paper-icon-item>
										<iron-icon icon="my-icons:help-outline" slot="item-icon"></iron-icon>
										<span>Help</span>
										<paper-ripple></paper-ripple>
									</paper-icon-item>
								</a>
							</paper-listbox>
						</paper-menu-button>
						<paper-tooltip for="more" animation-delay="0">More</paper-tooltip>
						<template is="dom-if" if="{{loading}}">
							<paper-progress value="{{progress}}" indeterminate active$="[[loading]]" top-item></paper-progress>
						</template>
					</app-toolbar>
					<app-toolbar sticky>
						<paper-tabs selected="[[page]]" attr-for-selected="id" no-bar autoselect on-click="scrollTop">
							<paper-tab id="home">
								<a href="[[rootPath]]">
									<iron-icon icon="my-icons:filter-vintage"></iron-icon>
									<span>Home</span>
								</a>
							</paper-tab>
							<paper-tab id="collections">
								<a href="collections">
									<iron-icon icon="my-icons:layers"></iron-icon>
									<span>Collections</span>
								</a>
							</paper-tab>
							<paper-tab id="discover">
								<a href="discover">
									<iron-icon icon="my-icons:explore"></iron-icon>
									<span>Discover</span>
								</a>
							</paper-tab>
							<paper-tab id="activity">
								<a href="activity">
									<iron-icon icon="my-icons:bubble-chart"></iron-icon>
									<span>Activity</span>
								</a>
							</paper-tab>
						</paper-tabs>
					</app-toolbar>
				</app-header>
				<iron-pages id="pages" selected="[[page]]" attr-for-selected="name" role="main">
					<my-home name="home"></my-home>
					<my-collections name="collections"></my-collections>
					<my-discover name="discover"></my-discover>
					<my-activity name="activity"></my-activity>
					<my-new name="new"></my-new>
					<my-others name="others"></my-others>
					<my-wallpapers name="wallpapers"></my-wallpapers>
					<my-feedie name="feedie"></my-feedie>
					<my-view4 name="view4"></my-view4>
					<my-404 name="404"></my-404>
				</iron-pages>
				<a href="new"><paper-fab id="fab" icon="my-icons:add" aria-label="Scroll top" on-click="scrollTop"></paper-fab></a>
				<paper-tooltip for="fab" position="top" animation-delay="0">Create new</paper-tooltip>
			</app-header-layout>
    `;
	}

	static get properties() {
		return {
			wideLayout: {
				type: Boolean,
				value: false
			},
			page: {
				type: String,
				reflectToAttribute: true,
				observer: '_pageChanged'
			},
			opened: {
				type: Boolean,
				reflectToAttribute: true
			},
			social: {
				type: Array,
				value: function () {
					return [{
							link: "https://www.facebook.com/liyasthomas",
							icon: "facebook"
						},
						{
							link: "https://twitter.com/liyasthomas",
							icon: "twitter"
						},
						{
							link: "https://instagram.com/liyasthomas",
							icon: "instagram"
						},
						{
							link: "https://plus.google.com/liyasthomas",
							icon: "google-plus"
						},
						{
							link: "https://liyasthomas.tumblr.com",
							icon: "tumblr"
						},
						{
							link: "https://www.linkedin.com/in/liyasthomas",
							icon: "linkedin"
						},
						{
							link: "https://api.whatsapp.com/send?phone=919539653962&text=Hi%20Liyas,",
							icon: "whatsapp"
						}
					]
				}
			},
			routeData: Object,
			subroute: Object
		};
	}

	show() {
		this.$.toolbar.animate({
			transform: ['translateY(-100%)', 'translateY(0)']
		}, {
			duration: 600,
			easing: 'ease-in-out'
		});
		this.$.fab.animate({
			transform: ['scale(0)', 'scale(1)']
		}, {
			duration: 1000,
			easing: 'ease-in-out'
		});
	}

	tryAgain() {
		this.$.ajax.generateRequest();
	}

	update(worker) {
		this.$.updateToast.show();
	}

	openShare() {
		this.$.sharehome.toggle();
	}

	_getIcon(opened) {
		return opened ? 'expand-less' : 'expand-more';
	}

	scrollTop() {
		var scrollDuration = 200;
		var scrollStep = -window.scrollY / (scrollDuration / 10),
			scrollInterval = setInterval(function () {
				if (window.scrollY != 0) {
					window.scrollBy(0, scrollStep);
				} else clearInterval(scrollInterval);
			}, 10);
	}

	static get observers() {
		return [
      '_routePageChanged(routeData.page)'
    ];
	}

	_routePageChanged(page) {
		// Reset scroll position
		this.scrollTop();

		// Show the corresponding page according to the route.
		//
		// If no page was found in the route data, page will be an empty string.
		// Show 'home' in that case. And if the page doesn't exist, show '404'.
		if (!page) {
			this.page = 'home';
		} else if (['home', 'collections', 'discover', 'activity', 'new', 'others', 'wallpapers', 'feedie', 'view4'].indexOf(page) !== -1) {
			this.page = page;
		} else {
			this.page = '404';
		}

		// Change page title
		document.title = this.page.charAt(0).toUpperCase() + this.page.slice(1) + ' - AEIOU';

		// Animations
		this.$.pages.animate({
			opacity: [0, 1],
			transform: ['translateY(-32px)', 'translateY(0)']
		}, {
			duration: 600,
			easing: 'ease-in-out'
		});
		this.$.fab.animate({
			transform: ['scale(0)', 'scale(1)']
		}, {
			duration: 600,
			easing: 'ease-in-out'
		});
	}

	_pageChanged(page) {
		// Import the page component on demand.
		//
		// Note: `polymer build` doesn't like string concatenation in the import
		// statement, so break it up.
		switch (page) {
			case 'home':
				import('./my-home.js');
				break;
			case 'collections':
				import('./my-collections.js');
				break;
			case 'discover':
				import('./my-discover.js');
				break;
			case 'activity':
				import('./my-activity.js');
				break;
			case 'new':
				import('./my-new.js');
				break;
			case 'others':
				import('./my-others.js');
				break;
			case 'wallpapers':
				import('./my-wallpapers.js');
				break;
			case 'feedie':
				import('./my-feedie.js');
				break;
			case 'view4':
				import('./my-view4.js');
				break;
			case '404':
				import('./my-404.js');
				break;
		}
	}
}

window.customElements.define('my-app', MyApp);
