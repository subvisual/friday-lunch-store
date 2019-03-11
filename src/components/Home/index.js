import React from 'react'

import Button from '../Button'
import Quantity from '../Quantity'

import productImage from './tshirt.png'

import './index.css'

const CURRENCY = 'EUR'
const QUANTITY = '1'
const PRICE = '1.00'

const UTRUST_API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : '/'

const callApi = (endpoint, data) =>
  fetch(UTRUST_API + endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })

class Home extends React.Component {
  state = {
    loading: false,
  }

  handlePay = () => {
    this.setState({ loading: true }, () => {
      const host_url = this.props.location.href
      const cancel_url = host_url
      const return_url = host_url

      callApi(
        `.netlify/functions/createOrder?&currency=${CURRENCY}&price=${PRICE}&quantity=${QUANTITY}&cancel_url=${cancel_url}&return_url=${return_url}`
      )
        .then(response => response.json())
        .then(response => {
          window.location.href = response.url
        })
        .catch(error => console.log(error))
    })
  }

  render() {
    return (
      <div className="Home-root">
        <div className="Home-row">
          <div className="Home-column">
            <div className="Home-title">Let’s suit up!</div>
            <p className="Home-description">
              Our team will guide you through the first steps of{' '}
              <span className="smallCaps">UTRUST</span> payments...
            </p>
          </div>
          <div className="Home-column" />
        </div>
        <div className="Home-row">
          <div className="Home-column">
            <div>
              <img
                className="Home-image"
                src={productImage}
                alt="Product image"
              />
            </div>
          </div>
          <div className="Home-column">
            <div className="Home-subtitle">PixelsCamp Official T-shirt</div>
            <p className="Home-description">
              100% cotton
              <br />
              Regular Fit
            </p>
            <p className="Home-price">{`€ ${PRICE}`}</p>
            <Button loading={this.state.loading} onClick={this.handlePay}>
              Pay with <span className="smallCaps">UTRUST</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
