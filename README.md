# Finger Angles

This is a LeapMotion javascript Plugin that for each finger calculates angles between metacarpal and prossimal (as `alpha`), prossimal and medial (as `beta`), medial and distal (as `gamma`).

In the `/example` directory you can find a basic usage of this plugin:

* Import the `leapjs` official library:

```
import Leap from 'leapjs';
```

* To initialize plugin just import and call it passing the Leap object:

```
import initFingersAnglesLeapMotionPlugin from 'fingers-angles';
initFingersAnglesLeapMotionPlugin(Leap);
```

* Enable plugin:

```
const controller = new Leap.Controller(controllerOptions)
  .use('fingersAngles')
```

* Now you have for each `frame` the key `finger-angles`:

```
const { hands } = controller.frame();

hands.map(({ fingersAngles }) => {
  fingersAngles.forEach(({ type, alpha, beta, gamma }) => {
    // do something with alpha, beta, gamma angles...
  });
});
```

* the `finger-angle` object has the keys:

  * `type`: the finger name (`THUMB`, `INDEX`, `MIDDLE`, `RING`, `PINKIE`).

  * `alpha`: angle between metacarpal and prossimal.

  * `beta`: angle between prossimal and medial.

  * `gamma`: angle between medial and distal.
