import type { HlsJsVideoElement } from '@videojs/html/media/hlsjs-video';
import type {
	MinimalVideoSkinElement,
	VideoPlayerElement,
	VideoSkinElement,
} from '@videojs/html/video';
import type { JSX } from 'solid-js';

/**
 * JSX types for the `@videojs/html` custom elements we use.
 *
 * Binding style here is not a matter of taste. Solid's JSX compiler treats any
 * tag containing a dash as a custom element and assigns every plain prop as a
 * *property*, lowercasing any name it does not already know as a DOM property
 * (`toPropertyName()` in babel-plugin-jsx-dom-expressions). A few media names —
 * `playsInline`, `defaultMuted`, `disablePictureInPicture`,
 * `disableRemotePlayback` — survive because Solid keeps them in its built-in
 * `Properties` set. The rest do not: `crossOrigin={x}` compiles to
 * `el.crossorigin = x`, and `controlsList` and `autoPictureInPicture` fare the
 * same way. Those are expandos no Video.js element ever reads, and nothing warns
 * you. `streamType` is worse — as a static string Solid inlines it into the
 * template as `streamtype=`, while the element observes `stream-type`.
 *
 * So the props below are spelled with Solid's explicit binding namespaces,
 * chosen per value to match how the element actually consumes it:
 *
 * - `attr:` / `bool:` — the element observes an attribute. `CustomMediaElement`
 *   maps each entry of its `static properties` to an attribute
 *   (`decl.attribute ?? prop.toLowerCase()`) and forwards the attributes it does
 *   not bridge to the media host straight onto the inner `<video>` — which is
 *   what `playsinline` needs in order to mean anything on iOS. `ReactiveElement`
 *   (skins, `<video-player>`) likewise feeds `attributeChangedCallback` into its
 *   reactive property.
 * - `prop:` — the value is an object, so it cannot survive an attribute. `prop:`
 *   is also the only namespace Solid leaves un-lowercased, so it is the only way
 *   to reach a camelCased property on a custom element.
 *
 * Every attribute listed below was checked against the element's own
 * `observedAttributes` at runtime.
 */

/** Attributes `<video-player>` observes, from the video preset's feature config. */
interface VideoPlayerAttributes extends JSX.HTMLAttributes<VideoPlayerElement> {
	/** Title shown by the UI, overriding the one the media carries. */
	'attr:content-title'?: string;
	/** Poster shown by the UI, overriding the one the media carries. */
	'attr:poster'?: string;
}

/** Skins take no configuration of their own; they only host media in their default slot. */
type VideoSkinAttributes = JSX.HTMLAttributes<VideoSkinElement>;
type MinimalVideoSkinAttributes = JSX.HTMLAttributes<MinimalVideoSkinElement>;

interface HlsJsVideoAttributes extends JSX.HTMLAttributes<HlsJsVideoElement> {
	/** Media source URL. Replaces the identity half of `source`, leaving engine options intact. */
	'attr:src'?: string;
	'attr:poster'?: string;
	'attr:preload'?: 'none' | 'metadata' | 'auto';
	'attr:crossorigin'?: 'anonymous' | 'use-credentials';
	'attr:controlslist'?: string;
	'attr:loading'?: 'eager' | 'lazy';
	/** Backs the `streamType` property. */
	'attr:stream-type'?: 'on-demand' | 'live' | 'unknown';

	'bool:autoplay'?: boolean;
	'bool:controls'?: boolean;
	'bool:loop'?: boolean;
	/** Backs `defaultMuted`. */
	'bool:muted'?: boolean;
	/** Required for inline playback on iOS; forwarded onto the inner `<video>`. */
	'bool:playsinline'?: boolean;
	'bool:autopictureinpicture'?: boolean;
	'bool:disablepictureinpicture'?: boolean;
	'bool:disableremoteplayback'?: boolean;

	/** Fired when `source` changes, directly or by resolving a new `src`. */
	'on:sourcechange'?: JSX.EventHandlerWithOptionsUnion<
		HlsJsVideoElement,
		Event
	>;
	/** Fired when the detected stream type changes. */
	'on:streamtypechange'?: JSX.EventHandlerWithOptionsUnion<
		HlsJsVideoElement,
		Event
	>;
	/** Fired when the target live window changes. */
	'on:targetlivewindowchange'?: JSX.EventHandlerWithOptionsUnion<
		HlsJsVideoElement,
		Event
	>;

	/**
	 * Structured source — what to play plus how to play it. Property-only: the
	 * element bridges it straight to the media host with no attribute involved.
	 */
	'prop:source'?: HlsJsVideoElement['source'];
}

declare module 'solid-js' {
	namespace JSX {
		interface IntrinsicElements {
			'video-player': VideoPlayerAttributes;
			'video-skin': VideoSkinAttributes;
			'video-minimal-skin': MinimalVideoSkinAttributes;
			'hlsjs-video': HlsJsVideoAttributes;
		}
	}
}
