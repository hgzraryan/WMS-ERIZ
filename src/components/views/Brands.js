import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function Brands() {
  return (
    <HelmetProvider>

    <div>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Explore Brands</title>
    <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
</Helmet>
      Brands
    </div>
    </HelmetProvider>
  )
}

export default Brands
