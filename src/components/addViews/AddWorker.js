import React, { useEffect, useRef, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { Modal } from "react-bootstrap";
import { REGISTER_WORKER, REGISTER_WORKERROLE, WORKERSROLES_URL, } from '../../utils/constants';
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { city_validation, email_validation, emergencyContactName_validation, fullName_validation, name_validation, password_validation, respPersonFullName_validation, status_validation, street_validation, user_validation, zipCode_validation } from '../../utils/inputValidations';
import { Input } from '../Input';
import { Editor } from '@tinymce/tinymce-react';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";
import CustomPhoneComponent from '../CustomPhoneComponent';
import CustomDateComponent from '../CustomDateComponent';
import { CountryDropdown, RegionDropdown,CountryRegionData  } from 'react-country-region-selector';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

function AddWorker({ handleToggleCreateModal, refreshData }) {
  const navigate = useNavigate()
  const location = useLocation();
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [merried, setMerried] = useState(""); 
    const [isActive, setIsActive] = useState(""); 
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [gender, setGender] = useState(""); 
    const [workerRoles, setWorkerRoles] = useState([]); 

  const onGenderSelect = (event) => {
    setGender(prev=>event.target.value)
  };
    const { trigger } = useForm();
  
   useEffect(() => {
      if (CountryRegionData[11][0] === "Armenia") {
        CountryRegionData[11][0] = "Հայաստան"
        CountryRegionData[11][2] = "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
      }
    }, []);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedWorkerRoles = await axiosPrivate.get(WORKERSROLES_URL);
          setWorkerRoles(fetchedWorkerRoles?.data?.jsonString);
  
          //setIsLoading(false);
        } catch (err) {
          console.log(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      };
      setTimeout(() => {
        fetchData();
      }, 500);
    }, [navigate]);
    const onWorkerStateSelect = (event) => {
        setIsActive(prev=>event.target.value)
      };
    const onWorkerMerriedSelect = (event) => {
        setMerried(prev=>event.target.value)
      };

    const methods = useForm({
      mode: "onChange",
    });
  
    const editorRef = useRef(null);

    const notify = (text) =>
    toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const onSubmit = methods.handleSubmit(async ({
      fullName,
      email,
      street,
      city,
      state,
      country,
      zipCode,
      workerRole,
      emergencyContactName,
      emergencyContactNumber,
      gender,
      phone,
      dateOfBirth,
      user,
      password,
      maritalStatus,
    }) => {
      debugger
      const newWorker = {
        fullName: fullName,        
        username:user,
        password:password,
        contact: {
          email: email,
          phone: phone,
          address: {
            street: street,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
          },
        },
        workerRole: workerRole?.value,
        gender: gender,
        maritalStatus:maritalStatus,
        dateOfBirth: dateOfBirth ? moment(dateOfBirth).format('YYYY-MM-DD') : null,
        emergencyContactName: emergencyContactName,
        emergencyContactNumber: emergencyContactNumber,
        profilePictureUrl: "profilePictureUrl",
        isActive: 1,
        additional: editorRef.current.getContent({ format: "text" }),

      };
  
      //console.log('newWorker',newWorker);
      try {
        await axiosPrivate.post(REGISTER_WORKER, newWorker, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
        handleToggleCreateModal(false);
        refreshData();
        notify(
          `${newWorker.fullName} աշխատակիցը ավելացված է`
        );
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        }  else {
          setErrMsg(" Failed");
        }
      }
    }); 

      
    return (
        <Modal
        show={() => true}
        size="xl"
        onHide={() => handleToggleCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Ավելացնել նոր աշխատակից
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProvider {...methods}>
            <div className="contact-body contact-detail-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="d-flex flex-xxl-nowrap flex-wrap">
                  <div className="contact-info w-100">
                    <Form
                      onSubmit={(e) => e.preventDefault()}
                      noValidate
                      autoComplete="off"
                      className="container"
                    >
                      <div className="card">
                        <div className="card-header">
                          <a href="#">Աշխատակցի տվյալներ</a>
                          <button
                            className="btn btn-xs btn-icon btn-rounded btn-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Edit"
                          >
                            <span
                              className="icon"
                              data-bs-toggle="modal"
                              data-bs-target="#editInfo"
                            >
                              <span class="feather-icon">
                                <FeatherIcon icon="edit-2" />
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="card-body">
                        <div className="modal-body">
                        <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...fullName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...email_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            
                            <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="phoneNumber">
                                Հեռախոս
                              </label>
                              {methods.formState.errors.phone && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                                    <CustomPhoneComponent name="phone"  control={methods.control} />  
                            </div>
                            <div className="col-sm-6">
                                      <div className="d-flex justify-content-between me-2">
                                        <label
                                          className="form-label"
                                          htmlFor="workerRole"
                                        >
                                          Պաշտոն
                                        </label>
                                        {methods.formState.errors.workerRole && (
                                          <span className="error text-red">
                                            <span>
                                              <img
                                                src={ErrorSvg}
                                                alt="errorSvg"
                                              />
                                            </span>{" "}
                                            պարտադիր
                                          </span>
                                        )}
                                      </div>
                                      <div className="form-control">
                                        <Controller
                                          name="workerRole"
                                          control={methods.control}
                                          defaultValue={null}
                                          rules={{ required: true }}
                                          render={({ field }) => (
                                            <Select
                                              {...field}
                                              // onChange={(val) => {
                                              //   field.onChange(val.value);
                                              //   onPartnerSelect(val);
                                              // }}
                                              // value={agents.find(
                                              //   (option) =>
                                              //     option.value === partnerName
                                              // )}
                                              //options={workersRoles}
                                              options={workerRoles.map((elem) => ({
                                                value: elem.workerRoleId,
                                                label: `${elem?.workerRoleId}․  ${elem?.name}`,
                                              }))}
                                              placeholder={"Ընտրել"}
                                            />
                                          )}
                                        />
                                      </div>
                                    </div>
                          </div>
                          <div className="row gx-3 mb-3">
                          <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="country">
                                Երկիր
                              </label>
                              {methods?.formState.errors.country && (
                                <span className="error text-red">
                                  <img src={ErrorSvg} alt="errorSvg" />
                                  Պարտադիր
                                </span>
                              )}
                              </div>
                              <Controller
                                name="country"
                                control={methods.control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <CountryDropdown
                                    {...field}
                                    classes="form-control"
                                    defaultOptionLabel="Երկիր"
                                    value={country}
                                    priorityOptions={['Armenia']}
                                    onChange={(val) => {
                                      field.onChange(val);
                                      setCountry(val);
                                      methods.trigger("country");
                                      methods.setValue("state",'')
                                      methods.trigger("state")
                                    }}
                                    style={{
                                      appearance:'auto'
                                    }}
                                  />
                                )}
                              />
                            </div>
                            <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                            <label className="form-label" htmlFor="state">
                                  Մարզ
                                </label>
                                {methods?.formState.errors.state && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>
                                    պարտադիր
                                  </span>
                                )}
                                </div>
                                <Controller
                                name="state"
                                control={methods.control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <RegionDropdown
                                  blankOptionLabel="Մարզ"
                                  defaultOptionLabel="Մարզ"
                                  classes="form-control"
                                  country={country}
                                  value={region}
                                  onChange={(val) => {
                                    field.onChange(val);
                                    setRegion(val);
                                    trigger("state");
                                  }}
                                  style={{
                                    appearance:'auto'
                                  }}
                                />                           
                          )}
                        />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...city_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...street_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...zipCode_validation} />
                            </div>
                            {/* <div className="col-sm-6">
                              <Input {...additional_validation} />
                            </div> */}
                          </div>
                         
                          <div className="row gx-3">
                          <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-check-label"
                                  htmlFor="gender"
                                >
                                  Սեռ
                                </label>
                                {methods.formState.errors.gender && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>{" "}
                                    պարտադիր
                                  </span>
                                )}
                              </div>
                              <div className="d-flex  align-items-center">
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id="male"
                                    value="Male"
                                    onChange={() => onGenderSelect("Male")}
                                    {...methods.register("gender", {
                                      required: true,
                                    })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="male"
                                  >
                                    Արական
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id="female"
                                    value="Female"
                                    onChange={() => onGenderSelect("Female")}
                                    {...methods.register("gender", {
                                      required: true,
                                    })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="female"
                                  >
                                    Իգական
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="mb-2">
                              <label className="form-check-label" htmlFor="male">
                              Կարգավիճակ
                              </label>
                            </div>
                            <div className="d-flex  align-items-center">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  id="isActive"
                                  value="Ակտիվ"
                                  checked={isActive === "Ակտիվ"}
                                  onChange={onWorkerStateSelect} 
                                />
                              <label className="form-check-label" htmlFor="male">
                              Ակտիվ
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="notActive"
                                value="Ոչ Ակտիվ"
                                checked={isActive === "Ոչ Ակտիվ"} 
                                onChange={onWorkerStateSelect} 
                              />
                              <label className="form-check-label" htmlFor="female">
                              Ոչ Ակտիվ
                              </label>
                              </div>
                              </div>
                            </div>
                            
                            {/* <div className="col-sm-6">
                              <label className="form-label" htmlFor="gender">
                                Կարգավիճակ
                              </label>
                              <Multiselect
                                options={[
                                  { doctorState: "Ակտիվ" },
                                  { doctorState: "Ոչ Ակտիվ" },
                                ]} // Options to display in the dropdown
                                displayValue="doctorState" // Property name to display in the dropdown options
                                onSelect={onDoctorStateSelect} // Function will trigger on select event
                                //  onRemove={onResearchDelete} // Function will trigger on remove event
                                closeOnSelect={true}
                                singleSelect
                                id="input_tags_4"
                                className="form-control"
                                ref={doctorStateRef}
                                hidePlaceholder={true}
                                placeholder="Կարգավիճակ"
                                style={{
                                  height: "10rem",
                                  overflow: "hidden",
                                }}
                              />
                            </div> */}
                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="purchaseDate"
                                  >
                                  Ծննդյան ամսաթիվ
                                </label>
                                  {methods.formState.errors.dateOfBirth && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                                <div>
                                <CustomDateComponent name="dateOfBirth" control={methods.control}/>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="mb-2">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-check-label" htmlFor="male">
                              Ընտանեկան կարգավիճակ
                              </label>
                              {methods.formState.errors.maritalStatus && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>{" "}
                                    պարտադիր
                                  </span>
                                )}
                                </div>
                            </div>
                            <div className="d-flex  align-items-center">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  id="married"
                                  value="married"                                
                                  onChange={() => onWorkerMerriedSelect("married")}
                                    {...methods.register("maritalStatus", {
                                      required: true,
                                    })}
                                />
                              <label className="form-check-label" htmlFor="married">
                              Ամուսնացած
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="single"
                                value="single"
                                onChange={() => onWorkerMerriedSelect("single")}
                                    {...methods.register("maritalStatus", {
                                      required: true,
                                    })}
                              />
                              <label className="form-check-label" htmlFor="single">
                              Չամուսնացած
                              </label>
                              </div>
                              </div>
                            </div>
                          </div>

                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...emergencyContactName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="phoneNumber">
                              Լրացուցիչ կոնտակտի հեռախոս
                              </label>
                              {methods.formState.errors.emergencyContactNumber && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                               <CustomPhoneComponent name="emergencyContactNumber"  control={methods.control} />
   
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...user_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...password_validation} />
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                      <div className="separator-full"></div>
                      <div className="card">
                        <div className="card-header">
                          <a href="#">Հավելյալ տվյալներ</a>
                          <button
                            className="btn btn-xs btn-icon btn-rounded btn-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Edit"
                          >
                            <span
                              class="icon"
                              data-bs-toggle="modal"
                              data-bs-target="#moreContact"
                            >
                              <span class="feather-icon">
                                <FeatherIcon icon="edit-2" />
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="card-body"style={{zIndex:'0'}}>
                          <div className="modal-body">
                            <form>
                              <div className="row gx-12">
                                <div className="col-sm-12">
                                  {console.log()}
                                <Editor
                                  apiKey={process.env.REACT_APP_EDITOR_KEY}
                                  onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                  }
                                  init={{
                                    height:300,
                                    plugins:
                                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagembed linkchecker",                                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                    mergetags_list: [
                                      { value: 'First.Name', title: 'First Name' },
                                      { value: 'Email', title: 'Email' },
                                    ],
                                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                  }}
                                  
                                />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="separator-full"></div>
  
                      <div className="modal-footer align-items-center">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => handleToggleCreateModal(false)}
                        >
                          Չեղարկել
                        </button>
                        <button
                          type="button"
                          onClick={onSubmit}
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Ավելացնել
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </FormProvider>
        </Modal.Body>
      </Modal>
    );
  }

export default AddWorker
