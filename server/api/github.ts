import { defineEventHandler, H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const githubToken = config.githubToken // Assuming the token is named GITHUB_TOKEN in runtime config

  if (!githubToken) {
    console.error('GitHub token is not configured.')
    // Consider throwing an error or returning a specific response
    // For now, let's return an error object, which Nuxt will handle
    return {
      statusCode: 500,
      statusMessage: 'Server Error',
      data: { message: 'GitHub token is not configured.' }
    }
  }

  // Get the 'limit' query parameter, default to 8 if not provided
  const queryParams = getQuery(event)
  const limit = parseInt(queryParams.limit as string) || 8

  const graphqlQuery = `
    query GetViewerRepositories($limit: Int!) {
      viewer {
        repositories(first: $limit, orderBy: {field: CREATED_AT, direction: DESC}) {
          totalCount
          nodes {
            id
            name
            createdAt
            description
            url
            forks {
              totalCount
            }
            watchers {
              totalCount
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  `

  try {
    const response = await $fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${githubToken}`,
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { limit }
      }),
    })

    // Assuming the GitHub API returns data in a structure like { data: { viewer: { ... } } }
    // Adjust based on actual API response structure
    if (response && response.data) {
      return response.data.viewer.repositories
    } else {
      // Handle cases where the response structure is not as expected
      console.error('Unexpected response structure from GitHub API:', response)
      return {
        statusCode: 500,
        statusMessage: 'Server Error',
        data: { message: 'Unexpected response structure from GitHub API.' }
      }
    }
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error)
    // Return a structured error response
    // Nuxt 3 automatically handles errors thrown in event handlers,
    // but returning a structured response can be more informative for the client.
    return {
      statusCode: error.response?.status || 500,
      statusMessage: error.response?.statusText || 'Server Error',
      data: error.data || { message: 'Failed to fetch data from GitHub.' }
    }
  }
})
