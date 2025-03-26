import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function PaymentTwo() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Payment</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      PaymentTwo
    </HelmetProvider>
  )
}

export default PaymentTwo
