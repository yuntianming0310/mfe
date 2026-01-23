import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

// Mount function to start up the app
export const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const memoryHistory =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    })

  if (onNavigate) {
    memoryHistory.listen(onNavigate)
  }

  ReactDOM.render(<App history={memoryHistory} />, el)

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = memoryHistory.location

      if (pathname !== nextPathname) {
        memoryHistory.push(nextPathname)
      }
    },
  }
}

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-app')

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

// We are running through container
// and we should export the mount function
