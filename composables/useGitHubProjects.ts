export const useGitHubProjects = (limit: number = 8) => {
    const query = gql `
  {
    viewer {
      repositories(first: ${limit}, orderBy: {field: STARGAZERS, direction: DESC}, isFork: false) {
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
  }`

    return useAsyncQuery(query)
}