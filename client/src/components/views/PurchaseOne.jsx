import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function PurchaseOne() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Purchase</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      PurchaseOne
    </HelmetProvider>
  )
}

export default PurchaseOne
