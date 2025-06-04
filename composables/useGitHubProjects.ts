import { useAsyncData } from '#app' // Or from 'nuxt/app' in Nuxt 3

export const useGitHubProjects = (limit: number = 8) => {
  // The key needs to be unique for each different limit,
  // otherwise useAsyncData might return cached data from a different limit.
  const asyncDataKey = `github-projects-${limit}`

  // useAsyncData will call $fetch internally for GET requests by default.
  // The first argument is a unique key, the second is the fetcher function.
  const { data, pending, error } = useAsyncData(
    asyncDataKey,
    () => $fetch(`/api/github?limit=${limit}`),
    {
      // You can provide default values or transformations here if needed
      // For example, if the server endpoint returned the data directly without being nested
      // under a `viewer.repositories` like structure, you might adjust it here.
      // However, our server route /api/github is designed to return data
      // in the shape { nodes: [], totalCount: X }, which should be
      // compatible with what components expect from the old `data.viewer.repositories` structure.
      // If the server returns { data: { viewer: { repositories: ... } } } you might need:
      // transform: (response) => response.data?.viewer?.repositories
    }
  )

  return {
    data, // This will now hold the direct response from /api/github
    pending,
    error,
  }
}