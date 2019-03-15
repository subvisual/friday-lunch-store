import fetch from 'node-fetch'

// config
const API_ROOT = 'https://merchants.api.pixels-utrust.com/api'
// const API_ROOT = 'http://merchants.utrust.lvh.me:4000/api'
const CLIENT_ID = 'c8d65cc2-0c82-429a-95ea-3f65011fc2cc'
const CLIENT_SECRET = 'secret'
const RANDOM_ORDER_REFERENCE = Math.random()
  .toString(36)
  .substring(4)

// utrust api
const utrustApi = {
  authenticate: () =>
    fetch(API_ROOT + '/stores/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: {
          type: 'session',
          attributes: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          },
        },
      }),
    }).then(response => response.json()),

  createOrder: (params, token) =>
    fetch(API_ROOT + '/stores/orders/', {
      method: 'POST',
      headers: {
        'content-type': 'application/vnd.api+json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(params),
    }).then(response => response.json()),
}

exports.handler = function(event, context, callback) {
  const cancel_url = event.queryStringParameters.cancel_url
  const return_url = event.queryStringParameters.return_url
  const currency = event.queryStringParameters.currency
  const name = event.queryStringParameters.name
  const price = event.queryStringParameters.price
  const quantity = event.queryStringParameters.quantity
  const total = (price * quantity).toFixed(2)

  const orderParams = {
    data: {
      type: 'orders',
      attributes: {
        order: {
          reference: RANDOM_ORDER_REFERENCE,
          amount: {
            total,
            currency: currency,
            details: {
              subtotal: total,
              handling_fee: '0.00',
            },
          },
          return_urls: {
            cancel_url: cancel_url,
            return_url: return_url,
          },
          line_items: [
            {
              sku: 'FWRY832876',
              name: name,
              price: price,
              currency: currency,
              quantity: quantity,
            },
          ],
        },
        customer: {
          email: 'john@example.com',
        },
      },
    },
  }

  utrustApi
    .authenticate()
    .then(response => {
      console.log('=== AUTHENTICATED ===', response)

      return utrustApi.createOrder(orderParams, response.data.attributes.token)
    })
    .then(response => {
      console.log('=== createOrder ===', response)

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          url: response.data.attributes.redirect_url,
        }),
      })
    })
    .catch(e => {
      callback(e)
    })
}
