import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function Roles() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Role</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      Roles
    </HelmetProvider>
  )
}

export default Roles
