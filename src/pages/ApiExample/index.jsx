import { useSessionStorage } from '@react-hooks-library/core'
import { isEmpty } from 'lodash-es'

import { useJsonPlaceholderUser } from '../../apis/fetchJsonPlaceholderUser'
import { MOCK_KEY } from '../../apis/utils/axios'

const ApiExample = () => {
  const [mockValue, setMockValue] = useSessionStorage(MOCK_KEY, '1')
  const { data = {} } = useJsonPlaceholderUser()
  const isDefaultChecked = isEmpty(mockValue) || mockValue === 1

  const onChange = (e) => {
    const isChecked = e.target.checked
    setMockValue(isChecked ? setMockValue('1') : setMockValue())
  }

  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer justify-start">
          <input type="checkbox" defaultChecked={isDefaultChecked} className="checkbox" onChange={onChange} />
          <span className="label-text pl-2">Use mock api</span>
        </label>
      </div>
      <div className="mockup-code">
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
    </>
  )
}

export default ApiExample
