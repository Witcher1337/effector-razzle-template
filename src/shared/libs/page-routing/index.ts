import {useEvent} from 'effector-react/scope';
import {createEvent, Event} from 'effector';

import * as React from 'react';
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
  (P extends void ? RouteParams<Params<string>> : P) &
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
export function useStart<T extends Event<any>>(startEvent: T) {
  const params = useParams();
  const location = useLocation();
  const query = React.useMemo(() => Object.fromEntries(new URLSearchParams(location.search)), [location.search]);
  const start = useEvent(startEvent);

  React.useEffect(() => {
    start({
      path: location.pathname,
      params,
      query,
    });
  }, []);
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
export function withStart<T, P>(event: Event<StartEvent<T>>, component: React.FC<P>): React.FC<P> {
  component[START] = event;
  return component;
}
