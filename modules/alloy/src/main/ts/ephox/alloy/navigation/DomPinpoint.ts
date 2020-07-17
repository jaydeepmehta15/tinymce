import { Arr, Option } from '@ephox/katamari';
import { Compare, SelectorFilter, SugarElement, Visibility } from '@ephox/sugar';

import * as ArrPinpoint from './ArrPinpoint';

const locateVisible = (container: SugarElement<HTMLElement>, current: SugarElement<HTMLElement>, selector: string): Option<ArrPinpoint.IndexInfo<SugarElement<HTMLElement>>> => {
  const predicate = (x: SugarElement) => Compare.eq(x, current);
  const candidates = SelectorFilter.descendants<HTMLElement>(container, selector);
  const visible = Arr.filter(candidates, Visibility.isVisible);
  return ArrPinpoint.locate(visible, predicate);
};

const findIndex = <T> (elements: Array<SugarElement<T>>, target: SugarElement<T>): Option<number> =>
  Arr.findIndex(elements, (elem) => Compare.eq(target, elem));

export {
  locateVisible,
  findIndex
};
