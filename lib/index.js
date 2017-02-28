import Leap from 'leapjs';
import glMatrix from 'gl-matrix';

export default () => {
  const angle = (v1, v2) => ((Math.PI - glMatrix.vec3.angle(v1, v2)).toPrecision(2));

  Leap.plugin('fingersAngles', () => {
    return {
      hand: hand => {
        hand.fingersAngles = hand.fingers
          .map(({ type, metacarpal, proximal, medial, distal }) => {
            const alpha = angle(metacarpal.direction(), proximal.direction());
            const beta = angle(proximal.direction(), medial.direction());
            const gamma = angle(medial.direction(), distal.direction());

            return { type, alpha, beta, gamma };
          });
      }
    };
  });
}
