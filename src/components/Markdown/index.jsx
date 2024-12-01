import 'github-markdown-css/github-markdown.css'

import { useAsyncValue } from 'react-router-dom'

const Markdown = () => {
  const { html: __html, attributes } = useAsyncValue()
  console.log(attributes)
  return (
    <div>
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