import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function WarehouseOne() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Warehouse</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      WarehouseOne
    </HelmetProvider>
  )
}

export default WarehouseOne
