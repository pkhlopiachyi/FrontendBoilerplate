import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import { appConfig } from './config'
import { SESSION_KEY } from 'store/sagas/provider'
import { JsonBody, RequestOptions } from './wrapper'

export type HTTPMethod = 'get' | 'post' | 'delete' | 'put' | 'patch'

export interface Request {
  method: HTTPMethod
  url: string
  body?: JsonBody
  params?: JsonBody
}

const publicServices = ['go', 'symbol']

const buildRequest = (request: Request, configData: RequestOptions) => {
  const { body, method, url, params } = request
  const { source, headers } = configData

  const contentType = body instanceof FormData ? 'multipart/form-data' : 'application/json'

  const sessionToken = localStorage.getItem(SESSION_KEY)

  const defaultHeaders = {
    'content-type': contentType,
    ...(sessionToken && !publicServices.includes(source) && { Authorization: `Bearer ${sessionToken}` }),
  }

  const apiUrl = appConfig[source]

  const requestConfig: AxiosRequestConfig = {
    baseURL: apiUrl,
    params,
    data: body,
    headers: { ...headers, ...defaultHeaders },
    method,
    url,
  }

  return requestConfig
}

export const makeRequest = (request: Request, configData: RequestOptions): Promise<any> => {
  const requestConfig = buildRequest(request, configData)

  return new Promise((resolve, reject) => {
    const axiosRequest: AxiosPromise = axios(requestConfig)
    axiosRequest
      .then((response: AxiosResponse) => {
        resolve(response)
      })
      .catch((error: AxiosError) => {
        reject(error)
      })
  })
}
