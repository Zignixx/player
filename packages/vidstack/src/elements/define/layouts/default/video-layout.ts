import { html } from 'lit-html';
import { computed } from 'maverick.js';

import { useDefaultLayoutContext } from '../../../../components/layouts/default/context';
import { useMediaState } from '../../../../core/api/media-context';
import { $signal } from '../../../lit/directives/signal';
import { DefaultAnnouncer } from './ui/announcer';
import {
  DefaultAirPlayButton,
  DefaultCaptionButton,
  DefaultDownloadButton,
  DefaultFullscreenButton,
  DefaultGoogleCastButton,
  DefaultPIPButton,
  DefaultPlayButton,
} from './ui/buttons';
import { DefaultCaptions } from './ui/captions';
import { DefaultControlsSpacer } from './ui/controls';
import { DefaultKeyboardDisplay } from './ui/keyboard-display';
import { DefaultChaptersMenu } from './ui/menu/chapters-menu';
import { DefaultSettingsMenu } from './ui/menu/settings-menu';
import { DefaultTimeSlider, DefaultVolumePopup } from './ui/slider';
import { DefaultTimeInfo } from './ui/time';
import { DefaultTitle } from './ui/title';

export function DefaultVideoLayoutLarge() {
  return [
    DefaultAnnouncer(),
    DefaultVideoGestures(),
    DefaultBufferingIndicator(),
    DefaultKeyboardDisplay(),
    DefaultCaptions(),
    html`<div class="vds-scrim"></div>`,
    html`
      <media-controls class="vds-controls">
        ${[
          DefaultControlsGroupTop(),
          DefaultControlsSpacer(),
          html`<media-controls-group class="vds-controls-group"></media-controls-group>`,
          DefaultControlsSpacer(),
          html`
            <media-controls-group class="vds-controls-group">
              ${DefaultTimeSlider()}
            </media-controls-group>
          `,
          html`
            <media-controls-group class="vds-controls-group">
              ${[
                DefaultPlayButton({ tooltip: 'top start' }),
                DefaultVolumePopup({ orientation: 'horizontal', tooltip: 'top' }),
                DefaultTimeInfo(),
                DefaultTitle(),
                DefaultCaptionButton({ tooltip: 'top' }),
                CustomDownloadButton('top'),
                DefaultBottomMenuGroup(),
                DefaultAirPlayButton({ tooltip: 'top' }),
                DefaultGoogleCastButton({ tooltip: 'top' }),
                DefaultDownloadButton(),
                DefaultPIPButton(),
                DefaultFullscreenButton({ tooltip: 'top end' }),
              ]}
            </media-controls-group>
          `,
        ]}
      </media-controls>
    `,
  ];
}

function CustomDownloadButton(tooltip) {
  return html`
  <media-menu class="vds-menu vds-extra-menu-container" style="display: contents;" data-open="">
    <media-tooltip class="vds-tooltip" style="display: contents;">
      <media-tooltip-trigger style="display: contents;">
          <media-menu-button class="vds-menu-button vds-button vds-extra-menu-icon" aria-label="Source" tabindex="0" role="button" id="media-menu-button-1" aria-haspopup="menu" aria-expanded="true" aria-disabled="false" type="button" data-describedby="media-tooltip-1" aria-controls="media-menu-1" data-open="">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2225 13.7867C14.3065 13.8706 14.4501 13.8112 14.4501 13.6924V5.99955C14.4501 5.63136 14.7486 5.33289 15.1167 5.33289H16.8501C17.2183 5.33289 17.5167 5.63136 17.5167 5.99955V13.6916C17.5167 13.8104 17.6604 13.8699 17.7444 13.7859L19.9433 11.5869C20.2037 11.3266 20.6258 11.3266 20.8861 11.5869L22.1118 12.8126C22.3722 13.0729 22.3722 13.4951 22.1118 13.7554L16.4549 19.4123C16.1946 19.6726 15.772 19.6731 15.5116 19.4128L9.85479 13.7559C9.59444 13.4956 9.59444 13.0734 9.85479 12.8131L11.0804 11.5874C11.3408 11.3271 11.7629 11.3271 12.0233 11.5874L14.2225 13.7867Z" fill="currentColor" />
              <path d="M5.99998 20.267C5.63179 20.267 5.33331 20.5654 5.33331 20.9336V25.9997C5.33331 26.3678 5.63179 26.6663 5.99998 26.6663H26C26.3682 26.6663 26.6666 26.3678 26.6666 25.9997V20.9336C26.6666 20.5654 26.3682 20.267 26 20.267H24.2666C23.8985 20.267 23.6 20.5654 23.6 20.9336V22.9333C23.6 23.3014 23.3015 23.5999 22.9333 23.5999H9.06638C8.69819 23.5999 8.39972 23.3014 8.39972 22.9333V20.9336C8.39972 20.5654 8.10124 20.267 7.73305 20.267H5.99998Z" fill="currentColor" />
            </svg>
          </media-menu-button>
          <media-menu-items class="vds-menu-items" placement="${tooltip}" offset="0" id="media-menu-1" role="menu" tabindex="-1" aria-hidden="false" data-placement="${tooltip}" aria-labelledby="media-menu-button-1" data-open="">
            <media-radio-group class="vds-radio-group vds-extra-menu-group" aria-label="Custom Options" id="srVideoPlayerQualityMenu" value="">
            </media-radio-group>
          </media-menu-items>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content vds-extra-menu-tooltip" placement="${tooltip}" id="media-tooltip-1" role="tooltip" data-placement="${tooltip}">
          Source
      </media-tooltip-content>
    </media-tooltip>
  </media-menu>
  `;
}

function DefaultBottomMenuGroup() {
  return $signal(() => {
    const { menuGroup } = useDefaultLayoutContext();
    return menuGroup() === 'bottom' ? DefaultVideoMenus() : null;
  });
}

function DefaultControlsGroupTop() {
  return html`
    <media-controls-group class="vds-controls-group">
      ${$signal(() => {
        const { menuGroup } = useDefaultLayoutContext();
        return menuGroup() === 'top' ? [DefaultControlsSpacer(), DefaultVideoMenus()] : null;
      })}
    </media-controls-group>
  `;
}

export function DefaultVideoLayoutSmall() {
  return [
    DefaultAnnouncer(),
    DefaultVideoGestures(),
    DefaultBufferingIndicator(),
    DefaultCaptions(),
    DefaultKeyboardDisplay(),
    html`<div class="vds-scrim"></div>`,
    html`
      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          ${[
            DefaultAirPlayButton({ tooltip: 'top start' }),
            DefaultGoogleCastButton({ tooltip: 'bottom start' }),
            DefaultControlsSpacer(),
            DefaultCaptionButton({ tooltip: 'bottom' }),
            DefaultDownloadButton(),
            DefaultVideoMenus(),
            DefaultVolumePopup({ orientation: 'vertical', tooltip: 'bottom end' }),
          ]}
        </media-controls-group>

        ${DefaultControlsSpacer()}

        <media-controls-group class="vds-controls-group" style="pointer-events: none;">
          ${[
            DefaultControlsSpacer(),
            DefaultPlayButton({ tooltip: 'top' }),
            DefaultControlsSpacer(),
          ]}
        </media-controls-group>

        ${DefaultControlsSpacer()}

        <media-controls-group class="vds-controls-group">
          ${[DefaultTimeInfo(), DefaultTitle(), DefaultFullscreenButton({ tooltip: 'top end' })]}
        </media-controls-group>

        <media-controls-group class="vds-controls-group">
          ${DefaultTimeSlider()}
        </media-controls-group>
      </media-controls>
    `,
    StartDuration(),
  ];
}

export function DefaultVideoLoadLayout() {
  return html`
    <div class="vds-load-container">
      ${[DefaultBufferingIndicator(), DefaultPlayButton({ tooltip: 'top' })]}
    </div>
  `;
}

function StartDuration() {
  return $signal(() => {
    const { duration } = useMediaState();

    if (duration() === 0) return null;

    return html`
      <div class="vds-start-duration">
        <media-time class="vds-time" type="duration"></media-time>
      </div>
    `;
  });
}

export function DefaultBufferingIndicator() {
  return html`
    <div class="vds-buffering-indicator">
      <media-spinner class="vds-buffering-spinner"></media-spinner>
    </div>
  `;
}

function DefaultVideoMenus() {
  const { menuGroup, smallWhen: smWhen } = useDefaultLayoutContext(),
    $side = () => (menuGroup() === 'top' || smWhen() ? 'bottom' : 'top'),
    $tooltip = computed(() => `${$side()} ${menuGroup() === 'top' ? 'end' : 'center'}` as const),
    $placement = computed(() => `${$side()} end` as const);

  return [
    DefaultChaptersMenu({ tooltip: $tooltip, placement: $placement, portal: true }),
    DefaultSettingsMenu({ tooltip: $tooltip, placement: $placement, portal: true }),
  ];
}

export function DefaultVideoGestures() {
  return $signal(() => {
    const { noGestures } = useDefaultLayoutContext();

    if (noGestures()) return null;

    return html`
      <div class="vds-gestures">
        <media-gesture class="vds-gesture" event="pointerup" action="toggle:paused"></media-gesture>
        <media-gesture
          class="vds-gesture"
          event="pointerup"
          action="toggle:controls"
        ></media-gesture>
        <media-gesture
          class="vds-gesture"
          event="dblpointerup"
          action="toggle:fullscreen"
        ></media-gesture>
        <media-gesture class="vds-gesture" event="dblpointerup" action="seek:-10"></media-gesture>
        <media-gesture class="vds-gesture" event="dblpointerup" action="seek:10"></media-gesture>
      </div>
    `;
  });
}
