import { useAsyncValue } from 'react-router-dom'

const Markdown = () => {
  const { html: __html } = useAsyncValue()
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html }} />
    </div>
  )
}

export default Markdown