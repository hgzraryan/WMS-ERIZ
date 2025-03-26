import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function CommonInfoTwo() {
  return (
    <HelmetProvider>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Info</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      CommonInfoTwo
    </HelmetProvider>
  )
}

export default CommonInfoTwo
