import { find, flow, get, isEmpty, keys, map, orderBy, size } from 'lodash-es'
import { lazy } from 'react'

import getRootPagesEntries from './getRootPagesEntries.js'

const FILE_NAME = {
  MAIN: 'index.jsx',
  LOADER: 'index.loader.js',
  LAYOUT: 'index.layout.jsx'
}

const getClosestLayout = (layouts) => {
  const layoutPathList = flow(
    () => keys(layouts),
    (paths) => orderBy(paths, path => size(path), 'desc'),
    (paths) => map(paths, path => path.replace(FILE_NAME.LAYOUT, ''))
  )()

  return (pagePath) => {
    const layoutPath = pagePath.replace(FILE_NAME.MAIN, FILE_NAME.LAYOUT)
    const sameLayerLayout = get(layouts, [layoutPath])
    if (sameLayerLayout) {
      return sameLayerLayout
    }

    const closestLayoutPath = find(layoutPathList, (layoutPath) => {
      return pagePath.startsWith(layoutPath)
    })
    if (isEmpty(closestLayoutPath)) {
      return
    }

    const closestLayout = get(layouts, [`${closestLayoutPath}${FILE_NAME.LAYOUT}`])
    return closestLayout
  }
}

const getRoutes = (pages, loaders, layouts, posts, isRoot = false) => {
  const getClosestLayoutFromGlob = getClosestLayout(layouts)
  const routes = flow(
    () => {
      const entires = {
        ...pages,
        ...posts
      }
      return isRoot ? getRootPagesEntries(entires) : Object.entries(entires)
    },
    (pagesEntries) => pagesEntries.reduce((collect, pagesEntry) => {
      const [originPath, page, rootPath] = pagesEntry
      const convertedPath = (isRoot ? rootPath : originPath).match(/.*\/pages(.*)/)[1]
      const fileName = (
        `./pages/${convertedPath}`.match(/\.{1,2}\/pages\/(.*)\.jsx$/)?.[1] ||
        `./pages/${convertedPath}`.match(/\.{1,2}\/pages\/(.*)\.md$/)?.[1]
      )
      const path = originPath.replace('.md', '.jsx')
      const loaderPath = path.replace(FILE_NAME.MAIN, FILE_NAME.LOADER)
      if (!fileName) {
        return collect
      }

      const normalizedPathName = fileName
        .replace('$', ':')
        .replace(/\/index/, '')

      const isIndex = fileName === '/index'
      const pageLoader = get(loaders, loaderPath)
      const layout = getClosestLayoutFromGlob(path)
      const isMarkdown = originPath.endsWith('.md')
      collect.push({
        isMarkdown,
        markdown: isMarkdown ? page() : undefined,
        filePath: path,
        path: isIndex ? '/' : `${normalizedPathName.toLowerCase()}/`,
        element: isMarkdown ? undefined : lazy(page),
        layout: layout ? lazy(layout) : undefined,
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