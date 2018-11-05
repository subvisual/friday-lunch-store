import fetch from 'node-fetch'

// config
const API_ROOT = 'https://merchants.sandbox-utrust.com/api'
// const API_ROOT = 'http://merchants.utrust.lvh.me:4000/api'
const CLIENT_ID = 'c8d65cc2-0c82-429a-95ea-3f65011fc2cc'
const CLIENT_SECRET = 'secret'

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
  const quantity = event.queryStringParameters.quantity
  const total = '5.00' * quantity

  const orderParams = {
    data: {
      type: 'orders',
      attributes: {
        order: {
          reference: 'order-1',
          amount: {
            total,
            currency: 'EUR',
            details: {
              subtotal: total,
              handling_fee: '0.00',
            },
          },
          return_urls: {
            return_url: 'http://example.com/return',
            cancel_url: 'http://example.com/cancel',
          },
          line_items: [
            {
              sku: 'FWRY832876',
              name: 'UDrink Cocktail',
              price: '5.00',
              currency: 'EUR',
              quantity: quantity,
            },
          ],
        },
        customer: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          address1: '118 Main St',
          address2: '7th Floor',
          city: 'New York',
          state: 'New York',
          postcode: '10001',
          country: 'US',
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
        body: JSON.stringify({ url: response.data.attributes.redirect_url }),
      })
    })
    .catch(e => {
      callback(e)
    })
}
