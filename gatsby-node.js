const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const productPage = path.resolve(`src/templates/product-page.js`)

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: productPage,
        context: {}, // additional data can be passed via context
      })
    })
  })
}
