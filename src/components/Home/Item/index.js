import React from 'react'
import { navigate } from 'gatsby'

import './index.css'

class Item extends React.Component {
  handleClick = event => {
    event.preventDefault()
    const { path } = this.props

    navigate(path)
  }

  render() {
    const { name, image, price } = this.props

    return (
      <div className="Item" onClick={this.handleClick}>
        <img className="Item-image" src={image} />
        <div className="Item-name">{name}</div>
        <div className="Item-price">{`€ ${price}`}</div>
      </div>
    )
  }
}

export default Item
