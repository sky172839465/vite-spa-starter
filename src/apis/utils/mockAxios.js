import MockAdapter from 'axios-mock-adapter'
import { flow, get, reduce } from 'lodash-es'

const mockServiceMap = import.meta.glob(['../*.mock.js'], { eager: true })
const mockServicePathMap = flow(
  () => import.meta.glob(['../*.js', '!../*.mock.js'], { eager: true }),
  serviceMap => reduce(serviceMap, (collect, service, filePath) => {
    const endpoint = get(service, 'endpoint')
    collect[endpoint] = filePath.replace('.js', '.mock.js')
    return collect
  }, {})
)()

const getMockResponse = (config) => {
  const { url = '' } = config
  
  const mockApiPath = get(mockServicePathMap, [url.split('?')[0]])
  const mocker = get(mockServiceMap, [mockApiPath, 'default'])
  if (!mocker) {
    return [500, { message: 'mockResponse not found' }]
  }

  return [200, mocker(config)]
}

const getMockAxios = (axiosInstance) => {
  const mockAdapter = new MockAdapter(axiosInstance, { delayResponse: 300 })
  mockAdapter.onAny().reply((config) => getMockResponse(config))
}

export default getMockAxios
