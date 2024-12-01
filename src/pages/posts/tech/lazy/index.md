---
title: Lazy Title
description: Describe Lazy content
tags:
  - "Lazy"
  - "awesome"
  - "rad"
---

# This is Lazy

Lazy Vite is an opinionated web dev build tool that serves your code via native ES Module imports during dev and bundles it with Rollup for production.

```javascript
collect.push({
  isMarkdown,
  markdown: isMarkdown ? page() : undefined,
  filePath: path,
  path: isIndex ? "/" : `${normalizedPathName.toLowerCase()}/`,
  element: isMarkdown ? undefined : lazy(page),
  layout: layout ? lazy(layout) : undefined,
  loader: pageLoader
    ? (...args) => pageLoader().then((module) => module.default(...args))
    : null,
});
```

Lazy Vite is an opinionated web dev build tool that serves your code via native ES Module imports during dev and bundles it with Rollup for production.

```javascript
const FILE_NAME = {
  MAIN: "index.jsx",
  LOADER: "index.loader.js",
  LAYOUT: "index.layout.jsx",
};
```
