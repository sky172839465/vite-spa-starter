import { GoMoveToTop } from 'react-icons/go'

const ScrollToTop = () => {
  const scrollToTop = () => {
    document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' })
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
