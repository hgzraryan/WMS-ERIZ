import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function Customers() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Customers</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      Customers
    </HelmetProvider>
  )
}

export default Customers
