import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';
import jwt from 'jwt-decode'
import Swal from "sweetalert2";
import { HelmetProvider,Helmet } from 'react-helmet-async'



import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('');
    //const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', true);
    const [passwordType, setPasswordType] = useState("password");


    useEffect(() => {
        userRef.current.focus();
    }, [])

    //useEffect(() => {
        //setErrMsg('');
   // }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const decodedJWT = jwt(accessToken);
            console.log(decodedJWT)
             const roles = decodedJWT.UserInfo.roles;
			 const isActive = decodedJWT.UserInfo.isActive;
            // const userId = decodedJWT.UserInfo.userId;

            // Clear localStorage before storing new data
            localStorage.removeItem("userData");
            localStorage.removeItem("userRoles");

            localStorage.setItem("userData", JSON.stringify(response?.data?.authUserData));
            localStorage.setItem("userRoles", JSON.stringify(roles));

			

			
			
            setAuth({ user, pwd, roles, accessToken });
            resetUser();
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                
                Swal.fire({  
                    icon: 'error',  
                    title: 'Հանգույցից պատասխան չկա',  
                    text: 'Հանգույցից պատասխան չկա',   
                    //footer: '<a href>Why do I have this issue?</a>'  
                });  
                
               // setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {

                Swal.fire({  
                    icon: 'error',  
                    title: 'Մուտքային տվյալները սխալ են!',  
                    text: 'Մուտքային տվյալները սխալ են!', 
                    //footer: '<a href>Why do I have this issue?</a>'  
                });  

               // setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                
                Swal.fire({  
                    icon: 'error',  
                    title: 'Չհավաստագրված մուտք!',  
                    text: 'Չհավաստագրված մուտք!',  
                    //footer: '<a href>Why do I have this issue?</a>'  
                });  

                //setErrMsg('Unauthorized');
            } else {

                Swal.fire({  
                    icon: 'error',  
                    title: 'Մուտքը չհաջողվեց!',  
                    text: 'Մուտքը չհաջողվեց!', 
                    //footer: '<a href>Why do I have this issue?</a>'  
                });  

                //setErrMsg('Login Failed');
            }
            //errRef.current.focus();
        }
    }


    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])


    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
    }

    return (
        <HelmetProvider>

        <section>

<div>

<Helmet>
    <meta charSet="utf-8" />
    <title>Enterprise Resource Planning and Management System</title>
    <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
</Helmet>
              
	 
{/* Wrapper */}
<div className="hk-wrapper hk-pg-auth" data-footer="simple">
{/* Main Content */}
  <div className="hk-pg-wrapper py-0">
      <div className="hk-pg-body py-0">
      {/* Container */}
          <div className="container-fluid">
          {/* Row */}
              <div className="row auth-split">
                  <div className="col-xl-5 col-lg-6 col-md-7 position-relative mx-auto">
                      <div className="auth-content flex-column pt-8 pb-md-8 pb-13">
                          <div className="text-center mb-5">
                              <a className="navbar-brand me-0" href="/login">
                                  <img className="brand-img d-inline-block login-brand-image" src="dist/img/logo-dark-blue.svg" alt="brand"/>
                              </a>
                          </div>
                          <form className="w-100" onSubmit={handleSubmit}>
                              <div className="row">
                                  <div className="col-xl-7 col-sm-10 mx-auto">
                                      <div className="text-center mb-4">
                                          <h4>Մուտք գործել համակարգ</h4>
                                          {/*<p>There are many variations of passages of Lorem Ipsum available, in some form, by injected humour</p>*/}
                                      </div>
                                      <div className="row gx-3">
                                          <div className="form-group col-lg-12">
                                              <div className="form-label-group">
                                                  <label>Ծածկանուն</label>
                                              </div>
                                              <input className="form-control" placeholder="Մուտքագրել ծածկանունը"    
                                              
                                              type="text"
                                              id="username"
                                              ref={userRef}
                                              autoComplete="off"
                                              {...userAttribs}
                                              required
                                              
                                              
                                              />
                                          </div>
                                          <div className="form-group col-lg-12">
                                              <div className="form-label-group">
                                                  <label>Ծածկագիր</label>
                                                  <a href="/reset-password" className="fs-7 fw-medium">Մոռացել ե՞ք ծածկագիրը</a>
                                              </div>
                                              <div className="input-group password-check">
                                                  <span className="input-affix-wrapper affix-wth-text">
                                                  <input className="form-control" placeholder="Մուտքագրել ծածկագիրը" 

                                                        type={passwordType}
                                                        id="password"
                                                        onChange={(e) => setPwd(e.target.value)}
                                                        value={pwd}
                                                        required
                                                      
                                                      
                                                      
                                                      
                                                      />
                                                      
                                                          <div className="input-group-btn input-suffix text-primary text-uppercase fs-8 fw-medium">
                                                           <span className="btn btn-outline-primary" onClick={togglePassword}>
                                                           { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                                                           </span>
                                                          </div>
                                                
                                                          
                                                          
                                                          
                                                          
                                                      
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="d-flex justify-content-center">
                                          <div className="form-check form-check-sm mb-3">
                                             {/* <input type="checkbox" className="form-check-input" id="logged_in" checked={true} onChange={e => {}}/>
                                              <label className="form-check-label text-muted fs-7" htmlFor="logged_in">Մնալ նույնականացված համակարգում</label>*/}

                                                
                                              <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="persist"
                                                onChange={togglePersist}
                                                checked={persist}
                                            />
                                            <label htmlFor="persist">Մնալ նույնականացված համակարգում</label>
    

                                          </div>
                                      </div>
                                                          
                                    {/*}  <button className="btn btn-primary btn-uppercase btn-block" type="submit">Մուտք</button>*/}


                                      <button className="btn btn-primary btn-uppercase btn-block" type="submit">Մուտք</button>

                                      {/*<p className="p-xs mt-2 text-center">New to Jampack? <a href="#"><u>Create new account</u></a></p>
                                      <a href="#" className="d-block extr-link text-center mt-4"><span className="feather-icon">
                                          <i data-feather="external-link"></i></span><u className="text-muted">Send feedback to our help forum</u>
                                      </a>*/}
                                  </div>
                              </div>
                          </form>
                      </div>
                      {/* Page Footer */}
                      <div className="hk-footer border-0">
                          <footer className="container-xxl footer">
                              <div className="row">
                                  <div className="col-xl-8 text-center">
                                      <p className="footer-text pb-0"><span className="copy-text">ERP  համակարգ © {new Date().getFullYear()}</span> 
                                      <span className="footer-link-sep">|</span>
                                      <a href="/privacy-policy" className="" target="_blank">Գաղտնիության քաղաքականություն</a>
                                      {/*
                                      <span className="footer-link-sep">|</span><a href="#" className="" target="_blank">T&C</a>
                                      <span className="footer-link-sep">|</span><a href="#" className="" target="_blank">System Status</a>
                                      */}
                                      </p>
                                  </div>
                              </div>
                          </footer>
                      </div>
                      {/* / Page Footer */}
                  </div>
                  <div className="col-xl-7 col-lg-6 col-md-5 col-sm-10 d-md-block d-none position-relative bg-primary-light-5">
                      <div className="auth-content flex-column text-center py-8">
                          <div className="row">
                              <div className="col-xxl-7 col-xl-8 col-lg-11 mx-auto">
                                  <h2 className="mb-4">ERP  համակարգ</h2>
                                  <p>Ձեռնարկությունների ռեսուրսների պլանավորման և կառավարման համակարգ</p>
                                  {/*<button className="btn  btn-flush-primary btn-uppercase mt-2">Take Tour</button>*/}
                              </div>
                          </div>
                          <img src="dist/img/data-analytics.svg"  className="img-fluid w-sm-50 mt-7" alt="login"/>
                      </div>
                  </div>
              </div>
              {/* /Row */}
          </div>
          {/* /Container */}
      </div>
      {/* /Page Body */}
  </div>
  {/* /Main Content */}
</div>
{/* /Wrapper */}




</div>


        </section>


   


        </HelmetProvider>
    )
}

export default Login
