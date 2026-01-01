// client/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// BrowserRouter is REMOVED from here because it is already in App.jsx
import { TaskProvider } from './context/TaskContext' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskProvider> {/* Only wrapping with TaskProvider */}
      <App />
    </TaskProvider>
  </React.StrictMode>,
)