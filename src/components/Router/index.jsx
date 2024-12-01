import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import Root from '../Root/index.jsx'
import SkeletonHome from '../SkeletonHome/index.jsx'
import ErrorElement from './ErrorElement.jsx'
import loader from './index.loader'

const LazyLayout = lazy(() => import('./Layout.jsx'))

const withErrorElement = (routes) => routes.map((item) => {
  const {
    element: Comp,
    layout: Layout = LazyLayout,
    ...route
  } = item
  return {
    ...route,
    element: (
      <Suspense
        fallback={(
          <SkeletonHome className='fixed top-0 z-0' />
        )}
      >
        <Layout>
          <Comp />
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorElement />
  }
})


const Router = (props) => {
  const { routes, basename = '/' } = props
  const appBaseName = `${window.APP_BASENAME}${basename}`
  const totalRoutes = [
    {
      element: <Root />,
      loader,
      children: withErrorElement([
        ...routes,
        {
          path: '/test',
          element: SkeletonHome
        },
        {
          path: '/*',
          element: ErrorElement
        }
      ])
    }
  ]
  // console.log(totalRoutes, appBaseName)
  const router = createBrowserRouter(totalRoutes, { basename: appBaseName })
  return (
    <RouterProvider
      router={router}
      fallbackElement={(
        <SkeletonHome className='fixed top-0 z-0' />
      )}
    />
  )
}

export default Router