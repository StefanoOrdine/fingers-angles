// Import CSS
import 'flexboxgrid';
import './index.css';

import ProgressBar from 'progressbar.js';

import Leap from 'leapjs';

// Import the plugin
import initFingersAnglesLeapMotionPlugin from '../dist';
initFingersAnglesLeapMotionPlugin(Leap);

const progressBars = [
  [
    new ProgressBar.SemiCircle('#semi-circle-thumb-alpha', { strokeWidth: 2, text: { value: `0°` } }),
    new ProgressBar.SemiCircle('#semi-circle-thumb-beta', { strokeWidth: 2, text: { value: `0°` } }),
    new ProgressBar.SemiCircle('#semi-circle-thumb-gamma', { strokeWidth: 2, text: { value: `0°` } })
  ],
  [
    new ProgressBar.SemiCircle('#semi-circle-index-alpha', { strokeWidth: 2, text: { value: `0°` } }),
    new ProgressBar.SemiCircle('#semi-circle-index-beta', { strokeWidth: 2, text: { value: `0°` } }),
    new ProgressBar.SemiCircle('#semi-circle-index-gamma', { strokeWidth: 2, text: { value: `0°` } })
  ],
  [
    new ProgressBar.SemiCircle('#semi-circle-middle-alpha', { strokeWidth: 2, text: { value: `0°` } }),
    new ProgressBar.SemiCircle('#semi-circle-middle-beta', { strokeWidth: 2, text: { value: `0°` } }),
    new ProgressBar.SemiCircle('#semi-circle-middle-gamma', { strokeWidth: 2, text: { value: `0°` } })
  ],
  [
    new ProgressBar.SemiCircle('#semi-circle-ring-alpha', { strokeWidth: 2, text: { value: `0°` } }),
    new ProgressBar.SemiCircle('#semi-circle-ring-beta', { strokeWidth: 2, text: { value: `0°` } }),
    new ProgressBar.SemiCircle('#semi-circle-ring-gamma', { strokeWidth: 2, text: { value: `0°` } })
  ],
  [
    new ProgressBar.SemiCircle('#semi-circle-pinkie-alpha', { strokeWidth: 2, text: { value: `0°` } }),
    new ProgressBar.SemiCircle('#semi-circle-pinkie-beta', { strokeWidth: 2, text: { value: `0°` } }),
    new ProgressBar.SemiCircle('#semi-circle-pinkie-gamma', { strokeWidth: 2, text: { value: `0°` } })
  ],
];

const degrees = angle => ((angle * 180 / Math.PI));
const scaled = (angle, min = 0.0, max = Math.PI) => (((angle - min) / (max - min)));
const renderProgressBar = (type, angleIndex, angleValue) => {
  progressBars[type] && progressBars[type][angleIndex].animate(scaled(angleValue).toPrecision(3), { duration: SAMPLING_RATE });
  progressBars[type] && progressBars[type][angleIndex].setText(`${degrees(angleValue).toPrecision(3)}°`);
}

const renderHandStatus = () => {
  const { hands } = controller.frame();
  hands
    .map(({ fingersAngles }) => {
      fingersAngles.forEach(({ type, alpha, beta, gamma }) => {
        renderProgressBar(type, 0, alpha);
        renderProgressBar(type, 1, beta);
        renderProgressBar(type, 2, gamma);
      });
    }
  );
};

const SAMPLING_RATE = 20;
const controllerOptions = {
  host: '127.0.0.1',
  port: 6437,
  enableGestures: false,
  frameEventName: 'deviceFrame',
  useAllPlugins: false
};
const controller = new Leap.Controller(controllerOptions)
  .use('fingersAngles')
  .on('connect', () => { setInterval(renderHandStatus, SAMPLING_RATE); })
  .connect();
