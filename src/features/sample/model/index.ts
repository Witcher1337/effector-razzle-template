import { createEffect, createEvent, createStore, forward } from "effector";

// Test case with fx.done on page change
const sampleFx = createEffect(
  () =>
    new Promise<string>((res) => {
      setTimeout(res, 1000, "FX DONE");
    }),
);

const getSample = createEvent();
const $sampleStore = createStore("Initial");
$sampleStore.on(sampleFx.doneData, (_, value) => value);

forward({
  from: getSample,
  to: sampleFx,
});

export { getSample, $sampleStore };
