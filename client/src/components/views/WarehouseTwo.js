import React from "react";
import { HelmetProvider,Helmet } from 'react-helmet-async'

function WarehouseTwo() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Warehouse</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      WarehouseOTwo
    </HelmetProvider>
  );
}

export default WarehouseTwo;
