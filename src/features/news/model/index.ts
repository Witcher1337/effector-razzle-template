import {createEffect, createStore} from 'effector';

type Details = {
  name: string,
  description: string;
}

const fetchDetailsFx = createEffect((id: number): Details => ({
  name: `News ${id}` ,
  description: `News ${id} description`,
}))

const $details = createStore<Details | null>(null);

$details.on(fetchDetailsFx.doneData, (_, data) => data)

export {$details, fetchDetailsFx}