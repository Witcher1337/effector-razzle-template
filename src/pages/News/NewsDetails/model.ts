import {fetchDetailsFx} from '@features/news/model';
import {createEvent, sample} from 'effector';
import {StartEvent} from 'shared/libs/page-routing';

export type PageParams = {
  id: string
}

export const mounted = createEvent<StartEvent<PageParams>>();

mounted.watch(() => console.log("Fetch"))
sample({
  clock: mounted,
  fn: (payload) => Number(payload.params.id),
  target: fetchDetailsFx,
});