import { filter } from 'lodash-es'
import useSWR from 'swr'

export const fetcher = async (query) => {
  const data = (await import('../data/frontMatters.json')).default
  return filter(data, item => item.data.title.includes(query.title))
}

export const useFrontMatters = (query = {}, options = {}) => {
  const result = useSWR(query, fetcher, options)
  return result
}

