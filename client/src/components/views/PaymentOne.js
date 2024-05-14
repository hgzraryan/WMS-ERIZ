import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function PaymentOne() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Payment</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      PaymentOne
    </HelmetProvider>
  )
}

export default PaymentOne
