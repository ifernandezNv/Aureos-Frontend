import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Layout from './pages/Layout'
import OlvidePassword, {action as actionOlvide} from './pages/OlvidePassword'
import Confirmar, {loader as loaderConfirmar} from './pages/Confirmar'

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/confirmar/:token',
        element: <Confirmar/>,
        index: true,
        loader: loaderConfirmar
      },
      {
        path: '/olvide-password/:token',
        element: <OlvidePassword/>,
        action: actionOlvide,
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider 
      router={Router}
    />
  </React.StrictMode>
)
