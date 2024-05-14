import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function PurchaseTwo() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Purchase</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      PurchaseTwo
    </HelmetProvider>
  )
}

export default PurchaseTwo
