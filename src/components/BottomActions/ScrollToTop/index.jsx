import { GoMoveToTop } from 'react-icons/go'

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
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
