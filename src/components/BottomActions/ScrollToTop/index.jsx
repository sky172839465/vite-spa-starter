import { GoMoveToTop } from 'react-icons/go'

const ScrollToTop = (props) => {
  const { topRef } = props
  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <li>
      <a onClick={scrollToTop}>
        <GoMoveToTop />
        置頂
      </a>
    </li>
  )
}

export default ScrollToTop
