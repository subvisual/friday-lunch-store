import fetch from 'node-fetch'

// config
const API_ROOT = 'https://merchants.api.sandbox-utrust.com/api'

exports.handler = function(event, context, callback) {
  const cancel_url = event.queryStringParameters.cancel_url
  const return_url = event.queryStringParameters.return_url
  const currency = event.queryStringParameters.currency
  const name = event.queryStringParameters.name
  const price = event.queryStringParameters.price
  const email = event.queryStringParameters.email
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
          email: email,
        },
      },
    },
  }

  fetch(API_ROOT + '/stores/orders/', {
    method: 'POST',
    headers: {
      'content-type': 'application/vnd.api+json',
      authorization: 'Bearer ' + process.env.TOKEN,
    },
    body: JSON.stringify(orderParams),
  })
    .then(response => response.json())
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
