import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function OrderOne() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Order</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      OrderOne
    </HelmetProvider>
  )
}

export default OrderOne
