import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/iron-scroll-threshold/iron-scroll-threshold.js';
import '@polymer/iron-ajax/iron-ajax.js';
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

            <template is="dom-repeat" items="[[photos]]" as="photo">
              <li class="item">title</li>
            </template>

      <div class="loadingIndicator" hidden$="[[!loadingPhotos]]">
        <paper-spinner-lite active$="[[loadingPhotos]]"></paper-spinner-lite> Fetching photos
      </div>

      <iron-ajax id="ajax" loading="{{loadingPhotos}}" handle-as="text" on-response="_didReceiveResponse"></iron-ajax>


      <iron-scroll-threshold id="scrollTheshold"
        lower-threshold="500"
        on-lower-threshold="_loadMorePhotos"
        scroll-target="document">
      </iron-scroll-threshold>

    `;
	}

	static get properties() {
		return {
			photos: {
				type: Array,
				value: function () {
					return [];
				}
			},
			perPage: {
				type: Number,
				value: 36
			},
			page: {
				type: Number,
				value: 0
			},
			totalPages: {
				type: Number,
				value: 1
			},
			loadingPhotos: Boolean
		};
	}



	_getAPIEndpoint() {
		return '../data/thisthat.json';
	}

	_didReceiveResponse(e) {
		var payload = e.detail.response.this;

		if (!payload || !payload.this || !payload.this.sub) {
			return;
		}

		this.totalPages = payload.this.pages;

		payload.this.sub.forEach(function (sub) {
			this.push('photos', sub);
		}, this);

		this.$.scrollTheshold.clearTriggers();
	}

	_loadMorePhotos() {
		if (this.loadingPhotos) {
			return;
		}
		if (this.page < this.totalPages) {
			this.page++;
			this.$.ajax.url =
				this._getAPIEndpoint();
			this.$.ajax.generateRequest();
		} else {
			this.$.scrollTheshold.clearTriggers();
		}
	}

}

window.customElements.define('my-view4', MyView4);
