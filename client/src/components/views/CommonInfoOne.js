import React from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

function CommonInfoOne() {
  return (
    <>
        <HelmetProvider>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Info</title>
        <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
      </Helmet>
      CommonInfoOne
      </HelmetProvider>

    </>
  );
}

export default CommonInfoOne;
