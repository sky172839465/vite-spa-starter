import 'github-markdown-css/github-markdown.css'

import { useClickOutside, useIsSupported, useToggle } from '@react-hooks-library/core'
import { flow, map } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import { FaList, FaShare } from 'react-icons/fa6'
import { GoMoveToTop } from 'react-icons/go'
import { MdTitle } from 'react-icons/md'
import { useAsyncValue } from 'react-router-dom'

import BottomActions from '../BottomActions'

const Markdown = (props) => {
  const { filePath } = props
  const articleRef = useRef()
  const topRef = useRef()
  const sectionDropdownRef = useRef()
  const { bool: isSectionVisible, toggle, setFalse } = useToggle(false)
  const [sections, setSections] = useState([])
  const { html: __html, attributes } = useAsyncValue()
  const isShareSupported = useIsSupported(() => !!navigator?.share)
  const { title, description } = attributes
  // console.log(props, attributes)

  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToSection = (e) => {
    const target = document.querySelector(`a[href="${e.target.dataset.hash}"]`)
    if (!target) {
      return
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const sharePost = () => {
    const shareData = {
      title,
      text: description,
      url: window.location.href
    }
    navigator && navigator.share(shareData)
  }

  useEffect(() => {
    if (!articleRef.current) {
      return
    }

    const articleSections = flow(
      () => [...articleRef.current.querySelectorAll('a[href^="#"]')],
      (titleLinkElements) => map(titleLinkElements, (titleLinkElement) => {
        const hash = (new URL(titleLinkElement.href)).hash
        const label = titleLinkElement.innerText
        return { hash, label }
      })
    )()
    setSections(articleSections)
  }, [])

  useClickOutside(sectionDropdownRef, setFalse)

  return (
    <>
      <div className='space-y-2'>
        <div className='flex flex-row items-center justify-between'>
          <h2 ref={topRef} className='text-xl'>
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
        <article ref={articleRef} className='markdown-body [&_a[href^="#"]]:text-inherit'>
          <div
            className='p-4'
            dangerouslySetInnerHTML={{ __html }}
          />
        </article>
      </div>
      <BottomActions>
        <li>
          <div
            ref={sectionDropdownRef}
            onClick={toggle}
            className={`
              dropdown dropdown-top ${isSectionVisible ? 'dropdown-open' : ''}
            `}
          >
            <FaList />
            <a role='button'>
              章節
            </a>
            <ul
              className={`
                menu dropdown-content !fixed !bottom-20 !left-2 m-0 w-[calc(100%-1rem)] rounded-box 
                bg-black p-2 text-white shadow dark:bg-slate-700 [&_a]:whitespace-nowrap
              `}
            >
              {map(sections, (section, index) => {
                return (
                  <li key={index}>
                    <div className='flex flex-row'>
                      <MdTitle />
                      <a
                        data-hash={section.hash}
                        onClick={scrollToSection}
                        className='block w-[82dvw] truncate'
                      >
                        {section.label}
                      </a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </li>
        <li className={`${isShareSupported ? '' : 'disabled pointer-events-none'}`}>
          <a onClick={sharePost}>
            <FaShare />
            分享
          </a>
        </li>
        <li>
          <a onClick={scrollToTop}>
            <GoMoveToTop />
            置頂
          </a>
        </li>
      </BottomActions>
    </>
  )
}

export default Markdown