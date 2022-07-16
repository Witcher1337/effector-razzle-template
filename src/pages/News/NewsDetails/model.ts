import { createEvent, sample } from "effector";

import { $details, fetchDetailsFx } from "@features/news/model";
import { StartEvent } from "shared/libs/page-routing";

export type PageParams = {
  id: string;
};

export const mounted = createEvent<StartEvent<PageParams>>();
export const unmounted = createEvent();

mounted.watch(() => console.log("mounted"));
unmounted.watch(() => console.log("unmounted"));

fetchDetailsFx.watch(() => {
  console.log("fetchDetailsFx");
});

sample({
  source: $details,
  clock: mounted,
  filter: (details, { params }) => details?.id !== Number(params.id),
  fn: (_, { params }) => Number(params.id),
  target: fetchDetailsFx,
});
