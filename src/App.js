// @flow
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { Switch, Route } from 'react-router'

import { type Route as RouteObjectType } from './routes'

// Styling
import GlobalStyle from './styles'

// Utils
import { isClient } from './utils/getRenderPlatform'

// Types
type Props = {
  routes: Array<RouteObjectType>
}

const COMMIT = process.env.COMMIT || 'N.A.'
const VERSION = process.env.VERSION || 'N.A.'

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test' && isClient) {
  console.info(`
  ⚙️ Commit: ${COMMIT}\n
  ⚙️ Version: ${VERSION}
  `)
}

// eslint-disable-next-line react/display-name
const renderRoute = Component => (props: *) => <Component {...props} />

export const RouteWithSubRoutes = (route: RouteObjectType) => (
  <Route path={route.path} render={renderRoute(route.component)} />
)

const App = ({ routes }: Props) => (
  <Fragment>
    <Helmet titleTemplate="%s" />
    <Switch>
      {routes.map((route, i) => {
        // only pass allowed route props to Route component
        const { ...routeProps } = route
        return <RouteWithSubRoutes key={i} {...routeProps} />
      })}
    </Switch>
    <GlobalStyle />
  </Fragment>
)

export default App
