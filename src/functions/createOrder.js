import fetch from 'node-fetch'

// config
const API_ROOT = 'https://merchants.api.sandbox-utrust.com/api'
const API_KEY = 'u_test_api_f0d624b9-4c33-43bb-8737-d600222c6eb4'

// utrust api
const utrustApi = {
  createOrder: (params, token) =>
    fetch(API_ROOT + '/stores/orders/', {
      method: 'POST',
      headers: {
        'content-type': 'application/vnd.api+json',
        authorization: 'Bearer ' + API_KEY,
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

  const randomOrderReference = Math.random()
    .toString(36)
    .substring(4)
    .toUpperCase()

  const orderParams = {
    data: {
      type: 'orders',
      attributes: {
        order: {
          reference: randomOrderReference,
          amount: {
            total,
            currency: currency,
            details: {},
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
          email: 'buyer-from-mini-store@example.com',
        },
      },
    },
  }

  utrustApi
    .createOrder(orderParams)
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
