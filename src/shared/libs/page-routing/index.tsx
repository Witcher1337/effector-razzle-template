import {useEvent} from 'effector-react/scope';
import {createEvent, Event} from 'effector';

import {useState , useEffect, useMemo} from 'react';
import {useLocation, useParams, Params} from 'react-router';

const START = `☄️/start-event`;

export type KeyValueMap = Record<string, string>;

export type RouteParams<P> = {
  params?: P;
};

export type RouteQuery<Q> = {
  query?: Q;
};

export type RoutePath = {
  path: string;
};

export type StartEvent<P = void, Q = void> = RoutePath &
  (P extends void ? RouteParams<Params<string>> : { params: P}) &
  (Q extends void ? RouteQuery<KeyValueMap> : Q);

/**
 * Creates event to handle universal page loading
 */
export function createStart(...params: string[]): Event<StartEvent> {
  return createEvent(...params);
}

/**
 * Loads start event on browser side and pass params and query
 */

type UseStartOptions = {
  withSSR: boolean,
  deps?: Array<unknown>
}

export function useStart<T extends Event<any>>(startEvent: T, options?: UseStartOptions) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const params = useParams();
  const location = useLocation();
  const query = useMemo(() => Object.fromEntries(new URLSearchParams(location.search)), [location.search]);
  const start = useEvent(startEvent);

  useEffect(() => {
    setIsFirstRender(false);

  }, options?.deps || [])

  useEffect(() => {
    if(isFirstRender && options?.withSSR)  return

    start({
      path: location.pathname,
      params,
      query,
    });
  }, options?.deps || []);
}

/**
 * Ejects start event from component
 */
export function getStart<T>(component: T): undefined | Event<StartEvent> {
  if (component) return component[START];

}

/**
 * Assign start event to component
 */
export function withStart<T, P>(event: Event<StartEvent<T>>, Component:React.FC<P> ): React.FC<P> {
  const Wrapper = (props:P) => {
    useStart(event, {withSSR: true})

    return (
      <Component {...props}/>
    )
  }

  Wrapper[START] = event;

  return Wrapper;
}
