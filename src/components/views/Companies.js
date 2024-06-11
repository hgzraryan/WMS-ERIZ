import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function Companies() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Company</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      Companies
    </HelmetProvider>
  )
}

export default Companies
