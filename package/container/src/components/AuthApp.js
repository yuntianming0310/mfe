import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { mount } from 'auth/AuthApp'

export default function AuthApp({ onSignIn }) {
  const ref = useRef(null)
  const reactRouterHistory = useHistory()

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: reactRouterHistory.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = reactRouterHistory.location

        if (pathname !== nextPathname) {
          reactRouterHistory.push(nextPathname)
        }
      },
      onSignIn,
    })

    reactRouterHistory.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}
