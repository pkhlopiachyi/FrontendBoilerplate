export const appConfig = {
  exchange: process.env.REACT_APP_EXCHANGE_URL || 'localhost:5000',
  spotEngine: process.env.REACT_APP_SPOT_ENGINE_URL || 'localhost:5000',
  spotEngineWS: process.env.REACT_APP_SPOT_ENGINE_WEBSOCKET_URL || 'localhost:5000',
  derivativesEngine: process.env.REACT_APP_DERIVATIVES_ENGINE_URL || 'localhost:5000',
  derivativesEngineWS: process.env.REACT_APP_DERIVATIVES_ENGINE_WEBSOCKET_URL || 'localhost:5000',
  exchangeWS: process.env.REACT_APP_EXCHANGE_WEBSOKET_URL || 'localhost:5000',
  auth: process.env.REACT_APP_AUTH_URL || 'localhost:5000',
}
