import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './Context/ThemeContext.jsx'
import { Provider } from 'react-redux'
import { store } from './ReduxStore/store.jsx'
import ContextApi from './Context/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
  <ThemeProvider>
  <ContextApi>
    <App />
  </ContextApi>  
    </ThemeProvider>
  </StrictMode>,
  </Provider>
)
