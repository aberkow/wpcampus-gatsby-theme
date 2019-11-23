/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  
  // Query content for WordPress posts.
  // @TODO remove fields we're not using.
  const posts = await graphql(`
    query {
      allWordpressPost(filter: { type: { eq: "post" }, status: { eq: "publish" } }) {
        edges {
          previous {
            id
            wordpress_id
            slug
            path
            title
            date
          }
          next {
            id
            wordpress_id
            slug
            path
            title
            date
          }
          node {
            id
            path
          }
        }
      }
    }
  `)
  const postTemplate = path.resolve(`./src/templates/post.js`)
  posts.data.allWordpressPost.edges.forEach(edge => {
    createPage({
      // will be the url for the page
      path: edge.node.path,
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.id,
        next: edge.next,
        previous: edge.previous,
      },
    })
  })
}
