import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function StatisticOne() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Statistic</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      StatisticOne
    </HelmetProvider>
  )
}

export default StatisticOne
