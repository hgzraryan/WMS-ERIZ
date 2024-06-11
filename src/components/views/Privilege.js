import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function Privilege() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Privilege</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      Privilege
    </HelmetProvider>
  )
}

export default Privilege
