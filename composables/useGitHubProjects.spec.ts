import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue' // Import ref for creating reactive refs in mock data
import { useGitHubProjects } from './useGitHubProjects' // Path to the composable
import { useAsyncData } from '#imports' // Correct import for Nuxt's auto-imported composables

// Mock useAsyncData
// The path '#imports' should resolve correctly due to the alias in vitest.config.ts
vi.mock('#imports', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useAsyncData: vi.fn(), // Mock specific function
  }
})

describe('useGitHubProjects', () => {
  // Typed mock for useAsyncData to ensure we can control its behavior per test
  const mockedUseAsyncData = useAsyncData as vi.Mock

  beforeEach(() => {
    // Reset mocks before each test
    mockedUseAsyncData.mockReset()
  })

  it('should return successful data', async () => {
    const mockData = { nodes: [{ id: '1', name: 'Test Project 1' }] }
    mockedUseAsyncData.mockReturnValue({
      data: ref(mockData),
      pending: ref(false),
      error: ref(null),
      refresh: vi.fn(),
      execute: vi.fn(),
      status: ref('success'),
    })

    const { data, pending, error } = useGitHubProjects(1)

    expect(useAsyncData).toHaveBeenCalledWith('github-projects-1', expect.any(Function), expect.any(Object))
    expect(data.value).toEqual(mockData)
    expect(pending.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('should return an error state', async () => {
    const mockError = new Error('Failed to fetch projects')
    mockedUseAsyncData.mockReturnValue({
      data: ref(null),
      pending: ref(false),
      error: ref(mockError),
      refresh: vi.fn(),
      execute: vi.fn(),
      status: ref('error'),
    })

    const { data, pending, error } = useGitHubProjects(5)

    expect(useAsyncData).toHaveBeenCalledWith('github-projects-5', expect.any(Function), expect.any(Object))
    expect(data.value).toBeNull()
    expect(pending.value).toBe(false)
    expect(error.value).toEqual(mockError)
  })

  it('should reflect a pending state', async () => {
    mockedUseAsyncData.mockReturnValue({
      data: ref(null),
      pending: ref(true),
      error: ref(null),
      refresh: vi.fn(),
      execute: vi.fn(),
      status: ref('pending'),
    })

    const { data, pending, error } = useGitHubProjects(3)

    expect(useAsyncData).toHaveBeenCalledWith('github-projects-3', expect.any(Function), expect.any(Object))
    expect(data.value).toBeNull() // Or initial value if defined
    expect(pending.value).toBe(true)
    expect(error.value).toBeNull()
  })

  it('should pass the limit parameter correctly to useAsyncData key and fetcher', () => {
    const limit = 7
    // Mock the $fetch call within the useAsyncData fetcher function
    const mockFetcher = vi.fn().mockResolvedValue({ nodes: [] });

    mockedUseAsyncData.mockImplementation((key, fetcher) => {
      // Call the actual fetcher to ensure it's being formed correctly
      fetcher().then(mockFetcher)
      return {
        data: ref(null),
        pending: ref(false),
        error: ref(null),
        refresh: vi.fn(),
        execute: vi.fn(),
        status: ref('idle'),
      }
    })

    useGitHubProjects(limit)

    expect(useAsyncData).toHaveBeenCalledWith(`github-projects-${limit}`, expect.any(Function), expect.any(Object))
    // To further test if $fetch inside the handler of useAsyncData is called with the correct URL,
    // we would need to mock $fetch globally or pass it as a dependency.
    // For this test, we're confirming useAsyncData gets the right key and a function.
    // The actual call to `/api/github?limit=${limit}` is an integration detail of the fetcher function
    // passed to useAsyncData.
  })
})
