import React from 'react'

import Item from './Item'

import './index.css'

class Home extends React.Component {
  render() {
    const { products } = this.props

    return (
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
    )
  }
}

export default Home
