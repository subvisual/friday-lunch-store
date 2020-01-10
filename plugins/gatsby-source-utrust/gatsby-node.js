const axios = require('axios')
const moment = require('moment')

const API_URL = 'https://merchants.api.sandbox-utrust.com/api'

module.exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions

  const {
    data: {
      data: {
        attributes: { token },
      },
    },
  } = await axios.post(API_URL + '/session', {
    data: {
      type: 'session',
      attributes: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      },
    },
  })

  const {
    data: { data: orders },
  } = await axios.get(API_URL + '/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  orders
    .map(order => ({ ...order, created_at: new Date(order.created_at) }))
    .map(({ attributes: order, id }) => {
      const node = {
        ...order,
        id: createNodeId('Order-' + id),
        parent: null,
        internal: {
          type: 'Order',
          contentDigest: createContentDigest(id),
        },
      }

      createNode(node)
    })
}
