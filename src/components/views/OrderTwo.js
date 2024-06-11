import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function OrderTwo() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Order</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      OrderTwo
    </HelmetProvider>
  )
}

export default OrderTwo
