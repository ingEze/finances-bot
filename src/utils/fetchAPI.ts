import axios, { AxiosResponse } from 'axios'

export async function fetchAPI(endpoint: string, params?: object): Promise<AxiosResponse> {
  const API_KEY = process.env.API_KEY
  if (!API_KEY) throw new Error('API_KEY is required')

  const response = await axios.get(`https://api.coingecko.com/api/v3${endpoint}`, {
    params,
    headers: {
      'x-cg-demo-api-key': API_KEY
    }
  })
  return response
}

