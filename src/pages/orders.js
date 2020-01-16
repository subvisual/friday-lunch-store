import React from 'react'
import moment from 'moment'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const startWeek = moment().startOf('week')
const endWeek = moment().endOf('week')

export default ({ data }) => {
  const orders =
    data?.allOrder?.nodes.filter(
      order =>
        order.status === 'paid' &&
        moment(order.created_at).isBetween(startWeek, endWeek)
    ) || []

  const orderGroups = orders.reduce((acc, order) => {
    const name = order.items[0].name
    acc[name] = acc[name] || []
    acc[name].push(order)
    return acc
  }, {})

  return (
    <Layout>
      <h1>This week's orders</h1>
      <p>Total: {orders.length}</p>
      {Object.keys(orderGroups).map(key => (
        <div key={key}>
          <p>
            <b>
              {key} ({orderGroups[key].length})
            </b>
          </p>
          <ul>
            {orderGroups[key].map(order => (
              <li key={order.id}>
                <p>{order.customer.email}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  {
    allOrder {
      nodes {
        id
        status
        created_at
        items {
          name
          quantity
        }
        customer {
          email
        }
      }
    }
  }
`
