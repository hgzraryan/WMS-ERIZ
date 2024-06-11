import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function Products() {
  return (
    <HelmetProvider>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Product</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      Products
    </HelmetProvider>
  )
}

export default Products
