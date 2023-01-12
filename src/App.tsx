import { Provider } from 'react-redux'
import configStore from 'store/configureStore'
import './App.css'
import { AppRouter } from 'router'

const store = configStore()

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
