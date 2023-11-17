//import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {Helmet} from "react-helmet";

const Missing = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);


    return (






<article>
<Helmet>
    <meta charSet="utf-8" />
    <title>Vteam LIMS | error 404</title>
    <link rel="icon" type="image/x-icon" href="/dist/img/favicon.ico"></link>
</Helmet>

{/*<!-- Wrapper -->*/}
<div className="hk-wrapper hk-pg-auth" data-menu="light" data-footer="simple">

    {/*<!-- Main Content -->*/}
    <div className="hk-pg-wrapper">
        <div className="container-xxl" >
            {/*<!-- Page Body -->*/}
            <div className="hk-pg-body" >
                <div className="row" >
                    <div className="col-xl-7 col-lg-6 d-lg-block d-none">
                        <div className="auth-content py-md-0 py-8">
                            <div className="row">
                                <div className="col-xl-12 text-center">
                                    text
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6 col-md-7 col-sm-10 ">
                        <div className="auth-content py-md-0 py-8">
                            <div className="w-100">
                                <div className="row">
                                    <div className="col-xxl-9 col-xl-8 col-lg-11">
                                        <h1 className="display-4 fw-bold mb-2">Գաղտնիության քաղաքականություն</h1>
                                        {/*<!-- <p className="p-lg">Ներեցեք, հայցվող էջը հնարավոր չէ գտնել: Փորձեք գտնել այլ անունով:</p> -->*/}
                                      <button className="btn btn-primary mt-4" onClick={goBack}>Վերադառնալ սկիզբ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- /Page Body -->*/}		
        </div>
        
        {/*<!-- Page Footer -->*/}
        <div className="hk-footer">
            <footer className="container-xxl footer">
                <div className="row">
                    <div className="col-xl-5">
                        <p className="footer-text"><span className="copy-text">ERP համակարգ  © {new Date().getFullYear()}</span> <a href="/privacy-policy" className="" target="_blank">Գաղտնիության քաղաքականություն</a></p>
                    </div>
                    
                </div>
            </footer>
        </div>
        {/*<!-- / Page Footer -->*/}

    </div>
    {/*<!-- /Main Content -->*/}
</div>
{/*<!-- /Wrapper -->*/}

</article>









    )
}

export default Missing
