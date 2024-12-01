import 'github-markdown-css/github-markdown.css'

import { useAsyncValue } from 'react-router-dom'

const Markdown = (props) => {
  const { html: __html, attributes } = useAsyncValue()
  console.log(props, attributes)
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