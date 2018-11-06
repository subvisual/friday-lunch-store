import React from 'react'

import Layout from '../components/Layout'
import Home from '../components/Home'

const IndexPage = ({ location }) => (
  <Layout>
    <Home location={location} />
  </Layout>
)

export default IndexPage
