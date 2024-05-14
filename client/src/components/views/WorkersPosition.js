import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function WorkersPosition() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Workers Position</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      WorkersPosition
    </HelmetProvider>
  )
}

export default WorkersPosition
