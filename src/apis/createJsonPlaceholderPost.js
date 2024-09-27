import useSWRMutation from 'swr/mutation'

import getCustomAxios from './utils/axios'

export const endpoint = 'https://jsonplaceholder.typicode.com/posts'

export const fetcher = () => async ({ arg = {} }) => {
  const { title, content, userId } = arg
  const body = JSON.stringify({
    title,
    content,
    userId
  })
  const axios = await getCustomAxios()
  return axios(endpoint, {
    method: 'POST',
    body
  })
}

export const useCreateJsonPlaceholderUser = (query = {}, options = {}) => {
  const result = useSWRMutation('useCreateJsonPlaceholderUser', fetcher(query), options)
  return result
}

