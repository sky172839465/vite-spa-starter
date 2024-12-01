import 'github-markdown-css/github-markdown.css'

import { useAsyncValue } from 'react-router-dom'

const Markdown = (props) => {
  const { filePath } = props
  const { html: __html, attributes } = useAsyncValue()
  const { title } = attributes
  console.log(props, attributes)
  return (
    <div className='space-y-2'>
      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-xl'>
          {title}
        </h2>
        <div>
          <a
            href={`https://github.com/sky172839465/vite-spa-starter/edit/main/src/${filePath.replace('./', '')}`}
            target='_blank'
            className='btn btn-primary'
          >
            Edit this page on GitHub
          </a>
        </div>
      </div>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <article className='markdown-body'>
        <div
          className='p-4'
          dangerouslySetInnerHTML={{ __html }}
        />
      </article>
    </div>
  )
}

export default Markdown