import React from 'react'
import { HelmetProvider,Helmet } from 'react-helmet-async'

function StatisticTwo() {
  return (
    <HelmetProvider>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Statistic</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      StatisticTwo
    </HelmetProvider>
  )
}

export default StatisticTwo
