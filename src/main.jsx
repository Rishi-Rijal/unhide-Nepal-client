import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './Components/Shared/Toast'
import { Provider } from 'react-redux'
import store from './utils/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ToastProvider>
  </StrictMode>,
)
