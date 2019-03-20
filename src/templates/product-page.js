import React from 'react'
import { graphql } from 'gatsby'
import { isNil } from 'lodash'

import Layout from '../components/Layout'
import Product from '../components/Product'

const ProductPage = ({ data, location }) => {
  if (isNil(data) || isNil(data.markdownRemark)) {
    return null
  } else {
    const { frontmatter } = data.markdownRemark

    return (
      <Layout>
        <Product
          location={location}
          name={frontmatter.name}
          description={frontmatter.description}
          image={frontmatter.image}
          price={frontmatter.price}
        />
      </Layout>
    )
  }
}

export default ProductPage

export const pageQuery = graphql`
  query ProductByPathc($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        name
        description
        image
        price
      }
    }
  }
`
