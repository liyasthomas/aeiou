import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/iron-scroll-threshold/iron-scroll-threshold.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';

class MyView4 extends PolymerElement {
	static get template() {
		return html `
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
			<iron-ajax auto url="{{url}}" id="ajax0" loading="{{loading0}}" handle-as="json" last-error="{{error0}}" last-response="{{response}}"></iron-ajax>
			<div class="grid content flex-justified">
				<paper-input class="searchInput" value="{{filterVal}}" no-label-float>
					<paper-icon-button icon="my-icons:search" slot="prefix"></paper-icon-button>
					<paper-icon-button slot="suffix" on-click="clearInput" icon="my-icons:close" alt="clear" title="clear" hidden$="{{!filterVal}}"></paper-icon-button>
				</paper-input>
			</div>
			<div class="grid actions flex-justified">
				<div class="title">
					API
				</div>
				<div>
					<paper-menu-button id="sort" horizontal-align="right">
						<paper-icon-button icon="my-icons:sort" slot="dropdown-trigger"></paper-icon-button>
						<paper-listbox slot="dropdown-content" class="listbox" attr-for-selected="name" selected="{{sortVal}}">
							<paper-icon-item name="none"><iron-icon icon="my-icons:date-range" slot="item-icon"></iron-icon>Date<paper-ripple></paper-ripple></paper-icon-item>
							<paper-icon-item name="name"><iron-icon icon="my-icons:sort-by-alpha" slot="item-icon"></iron-icon>Alphabet<paper-ripple></paper-ripple></paper-icon-item>
						</paper-listbox>
					</paper-menu-button>
					<paper-tooltip for="sort" position="top" animation-delay="0">Sort</paper-tooltip>
				</div>
			</div>
			<iron-scroll-threshold id="threshold" on-lower-threshold="loadMoreData" lower-threshold="100" scroll-target="document">
				<template is="dom-repeat" items="{{response.results}}" filter="{{_filter(filterVal)}}" sort="{{_sort(sortVal)}}" rendered-item-count="{{renderedCount}}">
					<div class="grid">
						<p>[[index]] : [[item.name.first]] [[item.name.last]]</p>
					</div>
				</template>  
			</iron-scroll-threshold>
			<template is="dom-if" if="{{!renderedCount}}">
				<div class$="[[getUIType(UI)]] content flex-justified">
					Nothing found for "{{filterVal}}" - <a class="link" href="404">Try harder</a>
				</div>
			</template>
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
    `;
	}

	static get properties() {
		return {
			people: {
				type: Number,
				value: 10
			},
			sortVal: {
				type: String,
				value: "none",
				reflectToAttribute: true
			}
		};
	}

	static get observers() {
		return ['_url(people)']
	}

	_url(p) {
		console.log(p);
		this.url = "https://randomuser.me/api/?results=" + p;
		setTimeout(() => {
			this.$.threshold.clearTriggers();
		}, 900)
	}

	loadMoreData() {
		this.people += 5;
	}

	tryAgain() {
		this.$.ajax0.generateRequest();
	}

	_filter(val) {
		return function (sub) {
			if (!val) return true;
			if (!sub) return false;
			return (sub.name.first && ~sub.name.first.toLowerCase().indexOf(val.toLowerCase())) ||
				(sub.name.last && ~sub.name.last.toLowerCase().indexOf(val.toLowerCase()));
		};
	}

	_sort(val) {
		switch (val) {
			case 'name':
				return function (a, b) {
					if (a.name.first.toLowerCase() === b.name.first.toLowerCase()) return 0;
					return a.name.first.toLowerCase() < b.name.first.toLowerCase() ? -1 : 1;
				};
		}
	}

	clearInput() {
		this.filterVal = null;
	}
}

window.customElements.define('my-view4', MyView4);
