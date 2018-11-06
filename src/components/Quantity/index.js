import React from 'react'

import './index.css'

class Quantity extends React.Component {
  render() {
    return (
      <div className="Quantity-root">
        <div className="Quantity-label">Quantity</div>
        <div className="Quantity-box">
          <div className="Quantity-number">
            {this.props.quantity}
            <div className="Quantity-nav">
              <button
                className="Quantity-buttonMore"
                onClick={() => this.props.onHandleQuantity(+1)}
              >
                +
              </button>
              <button
                className="Quantity-buttonLess"
                onClick={() => this.props.onHandleQuantity(-1)}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Quantity
