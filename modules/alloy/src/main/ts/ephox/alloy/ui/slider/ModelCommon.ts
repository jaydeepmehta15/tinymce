import { Fun, Option } from '@ephox/katamari';
import { SugarPosition } from '@ephox/sugar';

import { NativeSimulatedEvent } from '../../events/SimulatedEvent';

const _sliderChangeEvent = 'slider.change.value';
const sliderChangeEvent = Fun.constant(_sliderChangeEvent);

const isTouchEvent = (evt: MouseEvent | TouchEvent): evt is TouchEvent => evt.type.indexOf('touch') !== -1;

const getEventSource = (simulatedEvent: NativeSimulatedEvent): Option<SugarPosition> => {
  const evt = simulatedEvent.event().raw();
  if (isTouchEvent(evt)) {
    const touchEvent = evt;
    return touchEvent.touches !== undefined && touchEvent.touches.length === 1 ?
      Option.some(touchEvent.touches[0]).map((t: Touch) => SugarPosition(t.clientX, t.clientY)) : Option.none();
  } else {
    const mouseEvent = evt;
    return mouseEvent.clientX !== undefined ? Option.some(mouseEvent).map((me) => SugarPosition(me.clientX, me.clientY)) : Option.none();
  }
};

export {
  sliderChangeEvent,
  getEventSource
};
