import { AxiosResponse, Method as AxiosMethod } from 'axios';
import { Node, NodesWithChildren } from './ast-types';

export function toQueryParams(x: any): string {
  if (!x) return '';
  return Object.entries(x)
    .map(([k, v]) => k && v && `${k}=${encodeURIComponent(v as any)}`)
    .filter(Boolean)
    .join('&');
}

export type Disposer = () => void;

export class ApiError extends Error {
  constructor(public response: AxiosResponse, message?: string) {
    super(message);
  }
}

export type ApiRequestMethod = <T>(
  url: string,
  opts?: { method: AxiosMethod; data: string },
) => Promise<T>;

export function nodeHasChildren(node: Node): node is NodesWithChildren {
  // @ts-expect-error - we know this is a valid type
  return Array.isArray(node.children);
}
