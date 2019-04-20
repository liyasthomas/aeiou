import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/app-layout/app-grid/app-grid-style.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@kuscamara/code-sample/code-sample.js';

class MyNew extends PolymerElement {
	static get template() {
		return html `
			<style include="app-grid-style">
			</style>
			<style include="shared-styles">
				:host {
					display: block;
					--paper-tabs-selection-bar-color: var(--accent-color);
					--app-grid-item-height: 100%;
				}
				@media all and (min-width: 0) and (max-width: 360px) {
					:host {
						--app-grid-columns: 1;
						--app-grid-gutter: 16px;
						--app-grid-item-height: 110vw;
						--app-grid-expandible-item-columns: 1;
					}
				}
				@media all and (min-width: 361px) and (max-width: 640px) {
					:host {
						--app-grid-columns: 2;
						--app-grid-gutter: 16px;
						--app-grid-item-height: 60vw;
						--app-grid-expandible-item-columns: 2;
					}
				}
				@media all and (min-width: 641px) and (max-width: 960px) {
					:host {
						--app-grid-columns: 2;
						--app-grid-gutter: 32px;
						--app-grid-item-height: 40vw;
						--app-grid-expandible-item-columns: 2;
					}
				}
				@media all and (min-width: 961px) {
					:host {
						--app-grid-columns: 4;
						--app-grid-gutter: 32px;
						--app-grid-item-height: 20vw;
						--app-grid-expandible-item-columns: 4;
					}
				}
				paper-icon-button[active] {
					color: var(--accent-color);
				}
				.help {
					padding: 32px;
					border-radius: 8px;
					border: 2px dashed #b2b2b2;
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
				.item {
					cursor: pointer;
				}
				.item.iron-selected {
					box-shadow: 0 0 0 4px #fff, 0 0 0 8px var(--accent-color);
				}
				model-viewer.mb {
					border-top: 1px solid var(--light-text-color);
					border-radius: 8px 8px 0 0;
				}
				model-viewer.ml {
					border-radius: 8px;
					border-top: 1px solid var(--light-text-color);
					border-bottom: 1px solid var(--light-text-color);
					width: 100%;
					height: 60vh;
				}
				.model model-viewer {
					border-radius: 8px;
					border-top: 1px solid var(--light-text-color);
					border-bottom: 1px solid var(--light-text-color);
					width: 226px;
					height: 226px;
					margin-bottom: 8px;
				}
				.marker {
					border-radius: 8px;
				}
				.assets:nth-child(2) {
					margin-left: 16px;
				}
				code-sample {
					--code-sample-font-size: 16px;
					--code-sample-copy-button-bg-color: var(--accent-color);
					--code-sample-copy-clipboard-button: {
						padding: 8px;
						font-family: "Roboto Mono", monospace;
						font-weight: bold;
						border-radius: 0 8px 0 8px;
					}
					--code-sample-hljs: {
						border-radius: 8px;
					}
					margin-top: 16px;
				}
				.bottom {
					padding: 8px 8px 8px 16px;
				}
				@media (max-width: 640px) {
					.help {
						padding: 16px;
					}
					.assets {
						@apply --layout-flex;
					}
					.marker {
						@apply --layout-flex;
						width: 100%;
					}
					.model model-viewer {
						@apply --layout-flex;
						width: 100%;
						height: calc(50vw - 42px);
					}
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
			<paper-tabs selected="{{selected}}" attr-for-selected="name">
				<paper-tab name="markerbased">Marker based</paper-tab>
				<paper-tab name="markerless">Marker less</paper-tab>
			</paper-tabs>
			<iron-pages selected="{{selected}}" attr-for-selected="name">
				<div name="markerbased">
					<div class="grid content">
						<div class="help">
							<h2>What does "Marker Based" means?</h2>
							<p>AEIOU uses <a class="link" href="https://github.com/artoolkit">artoolkit</a>, which is a software with years of experience doing augmented reality.</p>
							<p>We supports a wide range of markers, multiple types of markers, pattern/barcode markers, multiple independent markers at the same time, or multiple markers acting as a single marker up to you to choose.</p>
							<p>
								<a class="link" href="http://au.gmented.com/app/marker/marker.php" target="_blank">
									<paper-button class="primary" aria-label="Barcode Generator">Barcode Generator<iron-icon icon="my-icons:open-in-new"></iron-icon></paper-button>
								</a> Generate barcode markers with numerical values.
							</p>
							<p>
								<a class="link" href="https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html" target="_blank">
									<paper-button class="primary" aria-label="Custom Generator">Custom Generator<iron-icon icon="my-icons:open-in-new"></iron-icon></paper-button>
								</a> Generate pattern markers with your own image.
							</p>
						</div>
					</div>
					<div class="grid actions flex-justified">
						<div class="title">if</div>
					</div>
					<div class="grid content">
						<paper-input class="searchInput" value="{{selectedThis}}" placeholder="Enter a barcode value between 0-63" no-label-float maxlength="2" required auto-validate allowed-pattern="[0-9]">
							<paper-icon-button icon="my-icons:center-focus-strong" slot="prefix"></paper-icon-button>
							<paper-icon-button slot="suffix" on-click="clearInput" icon="my-icons:close" alt="clear" title="clear" hidden$="{{!selectedThis}}"></paper-icon-button>
						</paper-input>
					</div>
					<iron-ajax auto url="../data/thisthat.json" id="ajax0" loading="{{loading0}}" handle-as="json" last-error="{{error0}}" last-response="{{ajaxResponse0}}">
					</iron-ajax>
					<template is="dom-if" if="{{loading0}}">
						<div class="grid actions flex-center-center" hidden$="[[!loading0]]">
							<paper-spinner-lite active$="[[loading0]]"></paper-spinner-lite>
						</div>
					</template>
					<template is="dom-if" if="{{error0}}">
						<template is="dom-if" if="{{!loading0}}">
							<div class="grid error">
								<paper-button on-click="tryAgain" aria-label="Try again">Try again</paper-button>
							</div>
						</template>
					</template>
					<template is="dom-repeat" items="[[ajaxResponse0.that]]" as="that">
						<div class="grid actions flex-justified">
							<div class="title">then</div>
							<div>
								<paper-icon-button
										toggles
										active="{{camera-controls}}"
										icon="my-icons:pan-tool">
								</paper-icon-button>
								<paper-icon-button
										toggles
										active="{{rotate}}"
										icon="my-icons:360">
								</paper-icon-button>
							</div>
						</div>
						<div class="grid app-grid" has-aspect-ratio>
							<template is="dom-repeat" items="[[that.sub]]" as="sub">
								<iron-selector attr-for-selected="name" selected="{{selectedThat}}">
									<div class="item" name="{{sub.link}}">
										<div class="container">
											<div class="flexchild flex-vertical">
												<model-viewer class="mb"
																			src="https://raw.githubusercontent.com/liyasthomas/lvr/master/assets/gltf/{{sub.link}}/scene.gltf"
																			alt="{{sub.title}}"
																			camera-controls$="{{camera-controls}}"
																			auto-rotate$="{{rotate}}"
																			background-color="#eee"
																			reveal
																			preload
																			poster="../images/assets/app/puff.svg">
												</model-viewer>
											</div>
											<div class="block bottom">
												<div class="info">
													<div class="flexchild">
														{{sub.title}}
													</div>
													<div>
														<paper-icon-button icon="my-icons:{{sub.icon}}" aria-label="Icon" on-click="openModal"></paper-icon-button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</iron-selector>
							</template>
							<iron-selector attr-for-selected="name" selected="{{selectedThat}}">
								<div class="item" name="upload">
									<div class="container help">
										<div class="flexchild flex-vertical flex-center-center">
											<div class="title">Drop 3D model here!</div>
										</div>
										<div class="block">
											<div class="info">
												<div class="flexchild">
													<a href="new"><paper-button aria-label="Info">Upload</paper-button></a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</iron-selector>
						</div>
					</template>
					<div class="content flex-center-center">
						<a href="{{selectedThis}}/{{selectedThat}}" disabled$="[[isInputEmpty(selectedThis, selectedThat)]]"><paper-button class="primary" aria-label="Next" disabled="[[isInputEmpty(selectedThis, selectedThat)]]">Create</paper-button></a>
					</div>
					<div class="content flex-center-center">
						<paper-button on-click="toggle" aria-expanded$="[[opened]]" aria-camera-controls="collapse" disabled="[[isInputEmpty(selectedThis, selectedThat)]]" hidden="[[isInputEmpty(selectedThis, selectedThat)]]">[[_getText(opened)]] assets<iron-icon icon="my-icons:[[_getIcon(opened)]]"></iron-icon></paper-button>
					</div>
					<iron-collapse id="collapse" opened="{{opened}}" hidden="[[isInputEmpty(selectedThis, selectedThat)]]" tabindex="-1">
						<div class="grid content">
							<div class="help flex-horizontal">
								<div class="assets">
									<div>
										<img class="marker" src="http://au.gmented.com/app/marker/marker.php?genImage&marker_type=matrix&gen_single_number={{selectedThis}}&marker_size=80&marker_image_resolution=72&ecc_type=none&border_size=0.25&border_is_white=false&border_quiet_zone=false&barcode_dimensions=3">
									</div>
									<div class="flexchild flex-horizontal flex-justified flex-center">
										<div>{{selectedThis}}</div>
										<div>
											<a href="http://au.gmented.com/app/marker/marker.php?genImage&marker_type=matrix&gen_single_number={{selectedThis}}&marker_size=80&marker_image_resolution=72&ecc_type=none&border_size=0.25&border_is_white=false&border_quiet_zone=false&barcode_dimensions=3" target="_blank" rel="noopener">
												<paper-icon-button icon="my-icons:get-app" aria-label="Icon"></paper-icon-button>
											</a>
										</div>
									</div>
								</div>
								<div class="assets">
									<div id="model" class="model"></div>
									<div class="flexchild flex-horizontal flex-justified flex-center">
										<div>{{selectedThat}}</div>
										<div>
											<a href="https://raw.githubusercontent.com/liyasthomas/lvr/master/assets/gltf/{{selectedThat}}/scene.gltf" target="_blank" rel="noopener">
												<paper-icon-button icon="my-icons:get-app" aria-label="Icon"></paper-icon-button>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div>
								<code-sample id="sample" copy-clipboard-button>
									<template>
										Something went wrong!
									</template>
								</code-sample>
							</div>
						</div>
					</iron-collapse>
				</div>
				<div name="markerless">
					<div class="grid content">
						<div class="help">
							<h2>What does "Marker Less" means?</h2>
							<p>AEIOU uses <a class="link" href="https://developers.google.com/ar">ARcore</a> which is a Google’s platform for building augmented reality experiences.</p>
							<p>Requires <a class="link" href="https://immersive-web.github.io/webxr">WebXR Device API</a> support</p>
						</div>
					</div>
					<div class="grid actions flex-justified">
						<div class="title">Create new scene</div>
					</div>
					<div class="grid content">
						<model-viewer class="ml"
													src="../gltf/test/scene.gltf"
													alt="title"
													camera-controls
													background-color="#eee"
													reveal
													preload
													poster="../images/assets/app/puff.svg">
						</model-viewer>
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

	attached() {
		this._updateGridStyles = this._updateGridStyles || function () {
			this.updateStyles();
		}.bind(this);
		window.addEventListener('resize', this._updateGridStyles);
	}

	detached() {
		window.removeEventListener('resize', this._updateGridStyles);
	}

	clearInput() {
		this.selectedThis = '0';
	}

	isInputEmpty(a, b) {
		if (this.$.collapse.opened)
			this.$.collapse.toggle();
		if (a === '' || a === 0 || b === 0)
			return true;
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

	openModal() {
		this.$.scrolling.open();
		let modal = (this.$.scrolling.opened) ?
			`
<model-viewer class="mo"
							src="https://raw.githubusercontent.com/liyasthomas/lvr/master/assets/gltf/` + this.selectedThat + `/scene.gltf"
							alt="` + this.selectedThat + `"
							camera-controls
							auto-rotate
							background-color="#eee"
							reveal
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

	toggle() {
		this.$.collapse.toggle();
		let content = (this.$.collapse.opened) ?
			`
<template>
<!doctype HTML>
<html>
<script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js"></script>
<a-scene>
<a-marker type="barcode" value="` + this.selectedThis + `">
<a-entity gltf-model="#` + this.selectedThat + `" scale="0.05 0.05 0.05" animation-mixer></a-entity>
</a-marker>
<a-entity camera></a-entity>
</a-scene>
</html>
</template>
			` :
			`
<template>
Something went wrong!
</template>
			`;
		this.$.sample.innerHTML = content;
		let model = (this.$.collapse.opened) ?
			`
<model-viewer src="https://raw.githubusercontent.com/liyasthomas/lvr/master/assets/gltf/` + this.selectedThat + `/scene.gltf"
							alt="title"
							camera-controls
							background-color="#eee"
							reveal
							preload
							poster="../images/assets/app/puff.svg">
</model-viewer>
			` :
			`
<template>
Something went wrong!
</template>
			`;
		this.$.model.innerHTML = model;
	}
}

window.customElements.define('my-new', MyNew);
