import { flow, get } from 'lodash-es'
import { lazy } from 'react'

import getRootPagesEntries from './getRootPagesEntries.js'

const getRoutes = (pages, loaders, isRoot = false) => {
  const routes = flow(
    () => {
      return isRoot ? getRootPagesEntries(pages) : Object.entries(pages)
    },
    (pagesEntries) => pagesEntries.reduce((collect, pagesEntry) => {
      const [path, page, rootPath] = pagesEntry
      const convertedPath = (isRoot ? rootPath : path).match(/.*\/pages(.*)/)[1]
      const fileName = `./pages/${convertedPath}`.match(/\.{1,2}\/pages\/(.*)\.jsx$/)?.[1]
      const loaderPath = path.replace('index.jsx', 'index.loader.js')
      if (!fileName) {
        return collect
      }

      const normalizedPathName = fileName
        .replace('$', ':')
        .replace(/\/index/, '')

      const isIndex = fileName === 'index'
      const pageLoader = get(loaders, loaderPath)
      collect.push({
        path: isIndex ? '/' : `/${normalizedPathName.toLowerCase()}/`,
        element: lazy(page),
        loader: pageLoader
          ? (...args) => pageLoader().then((module) => module.default(...args))
          : null
      })
      return collect
    }, [])
  )()
  return routes
}

export default getRoutes