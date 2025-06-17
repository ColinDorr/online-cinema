/**
 * Unit tests for TV DB API utility functions.
 * Tests cover environment variables, authentication,
 * and API calls for movies, series, and people.
 */

import { describe, it, expect, beforeEach, vi, test } from 'vitest'
import { getValidBearerToken, getMovies, getMovieById, getSeries, getSeriesById, getPeople, getPersonById } from '@/utils/tvDbCalls'


// Mock setup for stores and config
const mockStreamingDataStore = {
  bearerToken: '',
  setBearerToken: vi.fn((token: string) => {
    mockStreamingDataStore.bearerToken = token
  }),
}

vi.mock('@/stores/streamingData', () => ({
  useStreamingDataStore: () => mockStreamingDataStore,
}))

vi.mock('#app', () => ({
  useRuntimeConfig: () => ({
    public: {
      API_URL: process.env.API_URL,
      API_TOKEN: process.env.API_TOKEN,
    },
  }),
}));


// ==============================
// Environment Variable Validation
// ==============================
describe('Validate Environment', () => {

  it('API_URL and API_TOKEN are set and valid strings', () => {
    // Check that API_URL environment variable is defined and non-empty string
    expect(process.env.API_URL).toBeDefined();
    expect(typeof process.env.API_URL).toBe('string');
    expect(process.env.API_URL).not.toBe('');

    // Check that API_TOKEN environment variable is defined and non-empty string
    expect(process.env.API_TOKEN).toBeDefined();
    expect(typeof process.env.API_TOKEN).toBe('string');
    expect(process.env.API_TOKEN).not.toBe('');
  })

})


// =======================
// Authentication / Login
// =======================
describe('Validate Login', () => {

  beforeEach(() => {
    // Reset mocks and clear bearer token before each test to avoid test pollution
    vi.clearAllMocks()
    mockStreamingDataStore.bearerToken = ''
  })

  it('Retrieve Bearer token', async () => {
    // Mock global.fetch to simulate API response for the /login endpoint
    global.fetch = vi.fn().mockImplementation((url, options) => {
      expect(url).toBe('/login');
      return Promise.resolve({
        ok: true,
        json: async () => ({
          status: 'success',
          data: { token: 'mocked-token' },
        }),
      })
    })

    // Verify that the token returned matches the mocked token from the API
    const token = await getValidBearerToken();
    expect(token).toBe('mocked-token')
  })

})


// ===================
// Movies API
// ===================
describe('Validate Movies API', () => {

  beforeEach(() => {
    // Clear mocks before each test to isolate tests
    vi.clearAllMocks()
  })

  it('Fetch list of movies', async () => {
    // Mock fetch to return a list of movies
    const response = {
      status: "success",
      data: [
        { id: 1, name: "Movie One" },
        { id: 2, name: "Movie Two" },
      ],
    }

    global.fetch = vi.fn().mockImplementation((url) => {
      expect(url).toBe('/movies')
      return Promise.resolve({
        ok: true,
        json: async () => response,  // return response directly, no extra nesting
      })
    })

    // Fetch movies and verify response matches mock
    const movies = await getMovies()
    expect(movies).toEqual(response)
  })

  it('Fetch single movie by ID', async () => {
    const movieId = 123
    const response = {
      status: "success",
      data: { id: movieId, name: "Movie One" }
    }

    global.fetch = vi.fn().mockImplementation((url) => {
      expect(url).toBe(`/movies/${movieId}/extended`)
      return Promise.resolve({
        ok: true,
        json: async () => response,
      })
    })

    // Fetch single movie by ID and verify response
    const movie = await getMovieById(movieId)
    expect(movie).toEqual(response)
  })

})


// ===================
// Series API
// ===================
describe('Validate Series API', () => {

  beforeEach(() => {
    // Clear mocks before each test to isolate tests
    vi.clearAllMocks()
  })

  it('Fetch list of series', async () => {
    const response = {
      status: "success",
      data: [
        { id: 10, name: "Series One" },
        { id: 20, name: "Series Two" },
      ],
    }

    global.fetch = vi.fn().mockImplementation((url) => {
      expect(url).toBe('/series')
      return Promise.resolve({
        ok: true,
        json: async () => response,
      })
    })

    // Fetch series list and verify response
    const series = await getSeries()
    expect(series).toEqual(response)
  })

  it('Fetch single series by ID', async () => {
    const seriesId = 321
    const response = {
      status: "success",
      data: { id: seriesId, name: "The Great Series" }
    }

    global.fetch = vi.fn().mockImplementation((url) => {
      expect(url).toBe(`/series/${seriesId}/extended`)
      return Promise.resolve({
        ok: true,
        json: async () => response,
      })
    })

    // Fetch single series by ID and verify response
    const series = await getSeriesById(seriesId)
    expect(series).toEqual(response)
  })

})


// ===================
// People API
// ===================
describe('Validate People API', () => {

  beforeEach(() => {
    // Clear mocks before each test to isolate tests
    vi.clearAllMocks()
  })

  it('Fetch list of people', async () => {
    const response = {
      status: "success",
      data: [
        { id: 100, name: "Person One" },
        { id: 200, name: "Person Two" },
      ],
    }

    global.fetch = vi.fn().mockImplementation((url) => {
      expect(url).toBe('/people')
      return Promise.resolve({
        ok: true,
        json: async () => response,
      })
    })

    // Fetch people list and verify response
    const people = await getPeople()
    expect(people).toEqual(response)
  })

  it('Fetch single person by ID', async () => {
    const personId = 987
    const response = {
      status: "success",
      data: { id: personId, name: "Famous Person" }
    }

    global.fetch = vi.fn().mockImplementation((url) => {
      expect(url).toBe(`/people/${personId}/extended`)
      return Promise.resolve({
        ok: true,
        json: async () => response,
      })
    })

    // Fetch single person by ID and verify response
    const person = await getPersonById(personId)
    expect(person).toEqual(response)
  })

})


/**
 * End of TV DB API utility tests
 */
