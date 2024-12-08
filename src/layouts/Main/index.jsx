import { Link, useLocation } from 'react-router-dom'

const MainLayout = (props) => {
  const { children } = props
  const { pathname } = useLocation()
  return (
    <>
      <div className='navbar bg-base-100'>
        <Link
          className='btn btn-ghost text-xl'
          to='/'
          viewTransition
        >
          Home
        </Link>
        <p className='px-2'>
          {pathname}
        </p>
      </div>
      <div className='h-[calc(100dvh-4rem)] w-full max-w-full p-2'>
        {children}
      </div>
    </>
  )
}

export default MainLayout
