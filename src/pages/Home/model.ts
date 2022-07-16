import { createEvent, forward } from "effector";

import { getSample } from "@features/sample/model";
import { StartEvent } from "shared/libs/page-routing";

export const pageStarted = createEvent<StartEvent>();

forward({
  from: pageStarted,
  to: getSample,
});
