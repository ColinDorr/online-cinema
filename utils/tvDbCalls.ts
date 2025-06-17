import { useStreamingDataStore } from '@/stores/streamingData'


/**
 * Returns a valid bearer token, fetches a new one if missing.
 */

export async function getValidBearerToken(): Promise<string> {
  console.log("start API => getValidBearerToken")
  const streamingData = useStreamingDataStore()
  const { public: { API_URL, API_TOKEN } } = useRuntimeConfig();

  if (!streamingData.bearerToken) {
    try {
      const data = await apiHandler(
        'POST', 
        `${API_URL}/login`, 
        { apikey: API_TOKEN }
      )
      if (data.status === 'success' && data.data?.token) {
        streamingData.setBearerToken(data.data.token)
        return data.data.token
      }
      throw new Error('Login failed: Invalid response')
    } catch (err) {
      console.error('Error fetching bearer token:', err)
      throw err
    }
  }

  return streamingData.bearerToken
}
/**
 * Internal generic API request handler.
 */
async function apiHandler<T = any>(
  method: 'GET' | 'POST',
  endpoint: string,
  data?: any,
  bearerToken?: string
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
  }

  const config: RequestInit = {
    method,
    headers,
    ...(method === 'POST' ? { body: JSON.stringify(data) } : {}),
  }

  try {
    const res = await fetch(endpoint, config)
    if (!res.ok) {
      const errorData = await res.json().catch(() => null)
      const message = errorData?.message || res.statusText || 'API Error'
      throw new Error(message)
    }
    return await res.json()
  } catch (error: any) {
    console.error('API Error:', error.message)
    throw error
  }
}

/**
 * Generic TVDB API call with bearer token injection.
 */
async function tvDBCall(
  endpoint: string,
  params: Record<string, any> = {},
  method: 'GET' | 'POST' = 'POST'
): Promise<any> {
  const streamingData = useStreamingDataStore()
  const { public: { API_URL } } = useRuntimeConfig()
  const bearerToken = await getValidBearerToken()
  return await apiHandler(method, `${API_URL}${endpoint}`, params, bearerToken)
}

/**
 * Fetch series data from TVDB API.
 */
export async function getSeries(
  params: Record<string, any> = {}
): Promise<any> {
  console.log("start API => series")
  const endpoint = `/series`
  return await tvDBCall(endpoint, params, "GET")
}

/**
 * Fetch a single series by ID from TVDB API.
 */
export async function getSeriesById(id: number): Promise<any> {
  console.log("start API => getSeriesById")
  const endpoint = `/series/${id}/extended`
  return await tvDBCall(endpoint, {}, "GET")
}


/**
 * Fetch movie data from TVDB API.
 */
export async function getMovies(
  params: Record<string, any> = {},
): Promise<any> {
  console.log("start API => movies")
  const endpoint = `/movies`
  return await tvDBCall(endpoint, params, "GET")
}

/**
 * Fetch a single movie by ID from TVDB API.
 */
export async function getMovieById(id: number): Promise<any> {
  console.log("start API => getMovieById")
  const endpoint = `/movies/${id}/extended`
  return await tvDBCall(endpoint, {}, "GET")
}

/**
 * Fetch people data from TVDB API.
 */
export async function getPeople(
  params: Record<string, any> = {},
): Promise<any> {
  console.log("start API => getPeople")
  const endpoint = `/people`
  return await tvDBCall(endpoint, params, "GET")
}


/**
 * Fetch a single person by ID from TVDB API.
 */
export async function getPersonById(id: number): Promise<any> {
  console.log("start API => getPersonById")
  const endpoint = `/people/${id}/extended`
  return await tvDBCall(endpoint, {}, "GET")
}
