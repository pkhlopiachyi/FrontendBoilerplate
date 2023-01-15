import { AxiosResponse } from 'axios'
import { makeRequest } from './api'

export interface RequestOptions {
  source: 'exchange' | 'spotEngine' | 'derivativesEngine' | 'auth'
  headers?: any
}

export interface JsonBody {
  // tslint:disable-next-line no-any
  [key: string]: any
}

export type RequestBody = JsonBody | FormData

export type RequestMethod = (
  config: RequestOptions
) => (url: string, body?: RequestBody) => Promise<AxiosResponse['data']>

export interface APIWrapper {
  get: RequestMethod
  post: RequestMethod
  patch: RequestMethod
  put: RequestMethod
  delete: RequestMethod
}

export const API: APIWrapper = {
  get: (config: RequestOptions) => (url: string, params?: JsonBody) =>
    makeRequest(
      {
        method: 'get',
        params,
        url,
      },
      config
    ),
  post: (config: RequestOptions) => (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: 'post',
        body,
        url,
      },
      config
    ),
  patch: (config: RequestOptions) => (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: 'patch',
        body,
        url,
      },
      config
    ),
  put: (config: RequestOptions) => (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: 'put',
        body,
        url,
      },
      config
    ),
  delete: (config: RequestOptions) => (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: 'delete',
        body,
        url,
      },
      config
    ),
}
