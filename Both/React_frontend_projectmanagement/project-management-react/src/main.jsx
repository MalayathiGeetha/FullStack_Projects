import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css" //
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
document.documentElement.classList.add("dark");
import { Provider } from 'react-redux'
import { store } from './Redux/Store.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    
    </BrowserRouter>
  </React.StrictMode>
)
