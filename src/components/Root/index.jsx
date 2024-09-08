import { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'

import fetcher from '../../utils/fetcher'

const Root = (props) => {
  const { children } = props
  return (
    <>
      <SWRConfig
        value={{
          // https://swr.vercel.app/docs/api
          revalidateOnFocus: false,
          keepPreviousData: true,
          errorRetryCount: 3,
          suspense: false,
          fetcher
        }}
      >
        {children}
      </SWRConfig>
      <Toaster />
    </>
  )
}

export default Root