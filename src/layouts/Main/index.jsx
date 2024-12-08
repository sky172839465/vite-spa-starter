import { Link, useLocation } from 'react-router-dom'

const MainLayout = (props) => {
  const { children } = props
  const { pathname } = useLocation()
  return (
    <div className='flex flex-col h-dvh'>
      <div className='navbar bg-slate-200 dark:bg-slate-900 shadow-sm shadow-slate-300 dark:shadow-black sticky top-0'>
        <Link
          className='btn btn-ghost text-xl'
          to='/'
          viewTransition
        >
          Home
        </Link>
        <p className='px-2 text-lg'>
          {pathname}
        </p>
      </div>
      <div className='flex-grow h-full w-dvw overflow-y-auto overflow-x-hidden'>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
