import axios from 'axios'
import {
  INVALID_JWT_ERROR,
  INVALID_RENEW_ERROR,
  INVALID_SESSION_ID,
  SESSEION_EXPIRED_ERROR,
  SESSION_CLOSED,
} from 'constants/responses'
import { RE_NEW_TOKEN, SESSION_KEY } from 'store/sagas/provider'
import { API } from './wrapper'

const httpService = {
  setupInterceptors: () => {
    axios.interceptors.request.use(
      (config: any) => {
        config.headers['Content-Type'] = 'application/json'
        return config
      },
      (error) => error
    )
    axios.interceptors.response.use(
      (response) => {
        // simply return the response if there is no error

        return response
      },
      (error) => {
        const { config, response } = error

        const disconnectErrors = [SESSEION_EXPIRED_ERROR, INVALID_RENEW_ERROR, INVALID_SESSION_ID, SESSION_CLOSED]

        if (config.url.includes('renew')) {
        }

        if (response) {
          if (disconnectErrors.includes(response.data.code)) {
          } else if (response.data.code === INVALID_JWT_ERROR) {
            return new Promise(async (resolve) => {
              const reNewJWT = localStorage.getItem(RE_NEW_TOKEN)

              const { data } = await API.get({ source: 'auth' })(`/renew/${reNewJWT}`)

              localStorage.setItem(SESSION_KEY, data.token)
              localStorage.setItem(RE_NEW_TOKEN, data['re-new-token'])

              await axios({
                ...config,
                headers: {
                  ...config.headers,
                  Authorization: `Bearer ${data.token}`,
                },
              })
            })
          }
        }

        return Promise.reject(error)
      }
    )
  },
}
export default httpService
