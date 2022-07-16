import {createEffect, createStore} from 'effector';

type Details = {
  id: number,
  name: string,
  description: string;
}

const fetchDetailsFx = createEffect((id: number): Details => ({
  id,
  name: `News ${id}` ,
  description: `News ${id} description`,
}))

const $details = createStore<Details | null>(null);

$details.on(fetchDetailsFx.doneData, (_, data) => data)

export {$details, fetchDetailsFx}