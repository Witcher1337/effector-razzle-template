import {getSample} from '@features/sample/model';
import {createEvent, forward} from 'effector';
import {StartEvent} from 'shared/libs/page-routing';

export const pageStarted = createEvent<StartEvent>();

forward({
  from: pageStarted,
  to: getSample,
});