// @flow
import { type ComponentType } from 'react'

import HomePage from './components/pageTypes/Home'

type Paths = {
  [key: string]: string
}

export type Route = {
  path: string,
  title: string,
  component: ComponentType<*>,
  exact?: boolean
}

export const paths: Paths = {
  home: '/',
  pageNotFound: '*'
}

const routes: Array<Route> = [
  {
    path: paths.home,
    title: 'Homepage',
    component: HomePage,
    exact: true
  }
]

export default routes
