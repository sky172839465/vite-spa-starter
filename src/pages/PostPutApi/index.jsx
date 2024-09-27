import { useSessionStorage } from '@react-hooks-library/core'
import { isEmpty } from 'lodash-es'
import { sleep } from 'radash'
import { FormProvider, useForm } from 'react-hook-form'

import { useCreateJsonPlaceholderUser } from '../../apis/createJsonPlaceholderPost'
import { MOCK_KEY } from '../../apis/utils/axios'

const defaultValues = {
  title: 'foo',
  content: 'bar',
  userId: '10'
}

const PostPutApi = () => {
  const [mockValue, setMockValue] = useSessionStorage(MOCK_KEY)
  const { trigger, data = {} } = useCreateJsonPlaceholderUser()
  const methods = useForm({ defaultValues })
  const isChecked = isEmpty(mockValue) || mockValue === 'true'

  const onChange = async (e) => {
    const isChecked = e.target.checked
    setMockValue(`${isChecked}`)
    await sleep(200)
    window.location.reload()
  }

  const onSubmit = (data) => console.log(data)

  return (
    <div className='space-y-2'>
      <div className='form-control'>
        <label className='label cursor-pointer justify-start'>
          <input
            type='checkbox'
            checked={isChecked}
            className='checkbox'
            onChange={onChange}
          />
          <span className='label-text pl-2'>
            Use mock api
          </span>
        </label>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-2'>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>
                Title
              </span>
            </div>
            <input {...methods.register('title')} className='input input-bordered w-full max-w-xs' />
          </label>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>
                Content
              </span>
            </div>
            <input {...methods.register('content')} className='input input-bordered w-full max-w-xs' />
          </label>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>
                UserId
              </span>
            </div>
            <input {...methods.register('userId')} className='input input-bordered w-full max-w-xs' />
          </label>
          <button className='btn' type='submit'>
            Submit
          </button>
        </form>
      </FormProvider>
      <div className='mockup-code'>
        <div className='max-h-[50dvh] overflow-y-scroll'>
          {JSON.stringify(data, null, 2).split('\n').map((row, index) => {
            return (
              <pre key={index}>
                <code>
                  {row}
                </code>
              </pre>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PostPutApi
