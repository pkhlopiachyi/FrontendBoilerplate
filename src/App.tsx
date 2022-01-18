import { Provider } from 'react-redux'
import configStore from 'store/configureStore'
import './App.css'
import { AppRouter } from 'router'
import { ThemeProvider } from '@material-ui/core'
import { baseTheme } from 'theme/materialTheme'

const store = configStore()

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  )
}

export default App
