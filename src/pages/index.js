import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Home from '../components/Home'
import Layout from '../components/Layout'

const IndexPage = ({ data, location }) => {
  const { edges: products } = data.allMarkdownRemark

  return (
    <Layout>
      <Home products={products} />
    </Layout>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      query IndexPageQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "product-page" } } }
          sort: { fields: [frontmatter___position], order: ASC }
        ) {
          edges {
            node {
              id
              frontmatter {
                path
                name
                image
                price
              }
            }
          }
        }
      }
    `}
    render={data => <IndexPage data={data} />}
  />
)
