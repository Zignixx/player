const createPlugin = require('tailwindcss/plugin');

const mediaAttributes = [
  'autoplay',
  'autoplay-error',
  'duration',
  'can-load',
  'can-play',
  'can-fullscreen',
  'ended',
  'error',
  'fullscreen',
  'user-idle',
  'loop',
  'muted',
  'paused',
  'playing',
  'playsinline',
  'seeking',
  'started',
  'waiting',
];

const sliderAttributes = ['dragging', 'pointing', 'interactive'];

const vidstackPlugin = createPlugin(function ({ addVariant }) {
  mediaAttributes.forEach((name) => {
    addVariant(name, `media-player[${name}] &`);
    addVariant(`not-${name}`, `media-player:not([${name}]) &`);
    // media prefix
    addVariant(`media-${name}`, `media-player[${name}] &`);
    addVariant(`not-media-${name}`, `media-player:not([${name}]) &`);
  });

  ['', 'media-'].map((prefix) => {
    // buffering
    addVariant(`${prefix}buffering`, [`media-player:not([can-play]) &`, `media-player[waiting] &`]);
    addVariant(`not-${prefix}buffering`, [`media-player[can-play]:not([waiting]) &`]);
  });

  sliderAttributes.forEach((name) => {
    addVariant(name, `media-player *[${name}] &`);
  });
});

module.exports = {
  ...vidstackPlugin,
  mediaAttributes,
  sliderAttributes,
};
