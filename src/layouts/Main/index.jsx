import { Link, useLocation } from 'react-router-dom'

const MainLayout = (props) => {
  const { children } = props
  const { pathname } = useLocation()
  return (
    <div className='flex h-dvh flex-col'>
      <div className='navbar sticky top-0 bg-slate-200 shadow-sm shadow-slate-300 dark:bg-slate-900 dark:shadow-black'>
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
      <div className='h-full w-dvw grow overflow-y-auto overflow-x-hidden p-4'>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
