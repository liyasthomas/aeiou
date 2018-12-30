import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/iron-scroll-threshold/iron-scroll-threshold.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-list/iron-list.js';
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
			<iron-ajax id="ajax0" url="../data/test.json" loading="{{loading0}}" handle-as="json" last-error="{{error0}}" on-response="dataLoaded">
			</iron-ajax>
			<iron-scroll-threshold id="threshold" scroll-target="document" lower-threshold="10" on-lower-threshold="_loadMoreData">
				<template is="dom-repeat" items="[[datas]]" as="data">
					<p>{{data.name.first}}</p>
				</template>
			</iron-scroll-threshold>
			<template is="dom-if" if="{{loading0}}">
				<div class$="[[getUIType(UI)]] actions flex-center-center" hidden$="[[!loading0]]">
					<paper-spinner-lite active$="[[loading0]]"></paper-spinner-lite>
				</div>
			</template>
			<template is="dom-if" if="{{error0}}">
				<template is="dom-if" if="{{!loading0}}">
					<div class$="[[getUIType(UI)]] error">
						<paper-button on-click="_loadMoreData" aria-label="Try again">Try again</paper-button>
					</div>
				</template>
			</template>
    `;
	}

	static get properties() {
		return {
			datas: {
				type: Array,
				value: []
			}
		};
	}

	dataLoaded(e) {
		console.log('dataLoaded');
		e.detail.response.results.forEach(function (e) {
			this.push("datas", e);
		}.bind(this));
		this.$.threshold.clearTriggers();
	}

	_loadMoreData() {
		console.log('generateRequest');
		this.$.ajax0.generateRequest();
	}
}

window.customElements.define('my-view4', MyView4);
