/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const setupData = [
    {
        name:'Կազմակերպաիրավական ձևեր',
        //icon:settings,
        pathname:'setup/legalForms/page/1'

    },
]
function Setup() {
    const navigate = useNavigate();

    const handleNavigate = async (data) => {
        navigate(`/${data}`);
      };
  return (
    <HelmetProvider>
    <div>
      <div>
     <Helmet>
    <meta charSet="utf-8" />
    <title>Vteam LIMS | Setup</title>
    <link rel="icon" type="image/x-icon" href="../dist/img/favicon.ico"></link>
    </Helmet>
      </div>
    <div className="contactapp-wrap" style={{height:'100%'}}>
    <div className="contactapp-content">
      <div className="contactapp-detail-wrap w-100  ">
        <header className="contact-header">
          <div className="d-flex align-items-center justify-content-center w-100">
           
                <h1 style={{fontStyle:'italic', color:'#018a54'}}>Կարգաբերումներ</h1>
          
          </div>
          <div className="contact-options-wrap">
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret d-sm-inline-block d-none"
              href="#"
              data-bs-toggle="tooltip"
              data-placement="top"
             // onClick={refreshPage}
              title=""
              data-bs-original-title="Refresh"
            >
              <span className="icon">
                <span className="feather-icon">
                  <FeatherIcon icon="refresh-cw" />
                </span>
              </span>
            </a>
          </div>
        </header>
        <div className=" w-100 d-flex justify-content-center mt-2" >
        <div className="d-flex justify-content-center "style={{maxWidth:'1200px',flexWrap:'wrap', gap:'30px'}}>
    {setupData.map((el,id)=>{
            return(

                <div style={{border:'1px solid #018a54', display:'flex',alignItems:'center',padding:'20px',borderRadius:'10px',minWidth:'350px'}}>
                    <div className="avatar avatar-icon avatar-soft-info avatar-sm me-2">
                 <span className="initial-wrap">
                   <img src={el.icon} alt='setupItem' width={'25px'} height={'25px'}/>
                 </span>
               </div>
                 <div className="d-flex justify-content-center align-items-center h-100">
                 <p
                   style={{ cursor: "pointer", fontSize:'1.2rem',fontStyle:'italic' }}
                   onClick={(e) => handleNavigate(el?.pathname)}
                   >
                   {el.name}
                 </p>
               </div>
                </div>
)
    })}
    </div>
        </div>
      </div>
    </div>
  </div>
  </div>
    </HelmetProvider>   
  )
}

export default Setup
