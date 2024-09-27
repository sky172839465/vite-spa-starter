import useSWRMutation from 'swr/mutation'

import getCustomAxios from './utils/axios'

export const endpoint = 'https://jsonplaceholder.typicode.com/posts'

export const fetcher = () => async (key, { arg = {} }) => {
  const { title, content, userId } = arg
  const data = {
    title,
    content,
    userId
  }
  const axios = await getCustomAxios()
  return axios({
    url: endpoint,
    method: 'POST',
    data
  })
}

export const useCreateJsonPlaceholderUser = (query = {}, options = {}) => {
  const result = useSWRMutation('useCreateJsonPlaceholderUser', fetcher(query), options)
  return result
}

