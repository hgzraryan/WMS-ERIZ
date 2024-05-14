import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function Workers() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Workers</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      Workers
    </HelmetProvider>
  )
}

export default Workers
