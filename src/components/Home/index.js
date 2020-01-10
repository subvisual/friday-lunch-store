import React from 'react'
import { Link } from 'gatsby'

import Item from './Item'

import './index.css'

class Home extends React.Component {
  render() {
    const { products } = this.props

    return (
      <>
        <Link
          to="/orders"
          style={{ marginBottom: '54px', display: 'inline-block' }}
        >
          This week's orders
        </Link>

        <div className="Grid">
          {products.map(item => {
            const { id, frontmatter } = item.node

            return (
              <Item
                key={id}
                path={frontmatter.path}
                name={frontmatter.name}
                image={frontmatter.image}
                price={frontmatter.price}
              />
            )
          })}
        </div>
      </>
    )
  }
}

export default Home
