import React, { useState, useEffect, Suspense, useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import {
  firstName_validation,
  lastName_validation,
  email_validation,
  city_validation,
  street_validation,
  zipCode_validation,
  additional_validation,
  emergencyContactName_validation,
} from "../../utils/inputValidations";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import ErrorSvg from "../../dist/svg/error.svg";
import CustomPhoneComponent from "../CustomPhoneComponent";
import CustomDateComponent from "../CustomDateComponent";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "react-phone-number-input/style.css";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import LoadingSpinner from "../LoadingSpinner";
import { deepEqual, deleteNullProperties, objToArrWithObjects } from "../../utils/helper";
import { USERS_URL } from "../../utils/constants";
import { Editor } from "@tinymce/tinymce-react";
const roleState = [
  { label:'Ադմին',name: "Admin", value: 5150 },
  { label:'Հաստատող',name: "Approver", value: 3345 },
  { label:'Փոփոխող',name: "Editor", value: 1984 },
  { label:'Օգտատեր',name: "User", value: 2001 },
  { label:'Նմուշառող',name: "Sampler", value: 1212 },
  { label:'Բժիշկ',name: "Doctor", value: 9578 },  
]
function UserEditModal({ user, setEditRow, refreshData }) {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [merried, setMerried] = useState("");
  //console.log(user)
  const { trigger } = useForm();
  const methods = useForm({
    mode: "onChange",
  });
  const editorRef = useRef(null);

  const animatedComponents = makeAnimated();
  const colourStyles = {
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: "#fff",
      borderColor: isFocused ? "#fff" : "#e8e3e3",
      boxShadow: "#e8e3e3",

      ":hover": {
        borderColor: "#fff",
      },
    }),
    option: (styles, { data }) => ({
      ...styles,
      zIndex:100,
    }),
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#0096fb",
      color: "#fff",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#0096fb",
      color: "#e8e3e3",
      ":hover": {
        backgroundColor: "#0096fb",
        color: "#eb3434",
      },
    }),
  };
  const onRoleSelect = (data) => {
    const  role ={ [data?.name]: data?.value };
    return role
    // let rolesArr = {};
    // for (let role of data) {
    //   rolesArr[role.name] = role.value;
    // }
    // return rolesArr;
  };
  const onGenderSelect = (value) => {
    setGender(value);
    trigger("gender");
  };
  const onUserMerriedSelect = (event) => {
    setMerried((prev) => event.target.value);
  };
  useEffect(() => {
    if (CountryRegionData[11][0] === "Armenia") {
      CountryRegionData[11][0] = "Հայաստան";
      CountryRegionData[11][2] =
        "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
    }
    setCountry(user?.contact?.address?.country);
  }, []);
  const onSubmit = methods.handleSubmit(
    async ({
      firstName,
      lastName,
      position,
      email,
      //user,
      password,
      phone,
      street,
      city,
      state,
      country,
      zipCode,
      gender,
      maritalStatus,
      roles,
      emergencyContactNumber,
      emergencyContactName,
      dateOfBirth,
      additional
    }) => {
      const newDateOfBirthString = dateOfBirth
        ? new Date(
            dateOfBirth.getTime() - dateOfBirth.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0]
        : null;
       console.log(gender)
       console.log(user.gender)
      const updatedUser = {
        firstname:
          firstName?.trim() !== user?.firstname?.trim() ? firstName : null,
        lastname: lastName?.trim() !== user?.lastname?.trim() ? lastName : null,
        position: position?.trim() !== user?.position?.trim() ? position : null,
        email: email?.trim() !== user?.email?.trim() ? email : null,
        contact: {
          address: {
            city:
              city?.trim() !== user?.contact?.address?.city?.trim()
                ? city
                : null,
            country:
              country?.trim() !== user?.contact?.address?.country?.trim()
                ? country
                : null,
            state:
              state?.trim() !== user?.contact?.address?.state?.trim()
                ? state
                : null,
            street:
              street?.trim() !== user?.contact?.address?.street?.trim()
                ? street
                : null,
            zipCode:
              zipCode?.trim() !== user?.contact?.address?.zipCode?.trim()
                ? zipCode
                : null,
          },
          emergencyContactName:
            emergencyContactName?.trim() !==
            user?.contact?.emergencyContactName?.trim()
              ? emergencyContactName
              : null,
          emergencyContactNumber:
            emergencyContactNumber?.trim() !==
            user?.contact?.emergencyContactNumber?.trim()
              ? emergencyContactNumber
              : null,
          phone: phone?.trim() !== user?.contact?.phone?.trim() ? phone : null,
        },
        gender: gender?.trim() !== user?.gender?.trim() ? gender : null,
        maritalStatus:
          maritalStatus?.trim() !== user?.maritalStatus?.trim()
            ? maritalStatus
            : null,
        roles:!deepEqual(objToArrWithObjects(user?.roles),roles)?onRoleSelect(roles):null ,
        birthday:
          user?.birthday !== newDateOfBirthString ? newDateOfBirthString : null,
          additionalData: editorRef.current.getContent({ format: "text" }).trim()!==user?.additionalData?.trim()?editorRef.current.getContent({ format: "text" }):null,

      };
      // formData.append("text", JSON.stringify(newUser));
      // formData.append("image", image);
      // console.log(newUser)
      const updatedFields = deleteNullProperties(updatedUser);

      console.log('updatedFields',updatedFields);
      try {
        await axiosPrivate.put(
          USERS_URL,
          { updatedFields, id: user.userId },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        setEditRow(false);
        refreshData();
        //notify(`${newUser.firstname} ${newUser.lastname} աշխատակիցը ավելացված է`)
      }
      catch (err) {
            if (!err?.response) {
              setErrMsg("No Server Response");
            } else if (err.response?.status === 409 & err.response?.data?.message ==="Conflict email already registered"  ) {
              setErrMsg("Կրկնվող էլ․ հասցե");
            } else if (err.response?.status === 409 & err.response?.data?.message ==="Conflict username already registered"  ) {
              setErrMsg("Կրկնվող ծածկանուն");
            }else {
              setErrMsg(" Failed");
            }
          }
    }
  );

  return (
    <>
      <Modal show={() => true} size="xl" onHide={() => setEditRow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Թարմացնել աշխատակցի տվյալները
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense fallback={<LoadingSpinner />}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
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
                          {/* <div className="text-center mt-5">
                          <div className="dropify-circle edit-img">
                            <img
                              width={"100px"}
                              height={"100px"}
                              style={{
                                borderRadius: "50%",
                                cursor: "pointer",
                              }}
                              onClick={() => intupAvatarRef.current.click()}
                              src={imageUrl}
                              className="avatar_upload_preview"
                              alt="preview"
                              onDrop={handleDrop}
                              onDragEnter={handleDragEmpty}
                              onDragOver={handleDragEmpty}
                            />
                            <input
                              hidden
                              type="file"
                              ref={intupAvatarRef}
                              onChange={handleChangeFile}
                              className="dropify-1"
                              //data-default-file="dist/img/avatar2.jpg"
                            />
                          </div>
                          <div className="cp-name text-truncate mt-3">
                            Աշխատակցի նկարը
                          </div>
    
                          <div
                            className="rating rating-yellow my-rating-4"
                            data-rating="3"
                          ></div>
                          <p>&nbsp;</p>
                        </div> */}

                          <div className="card">
                            <div className="card-header">
                              <a href="#">Անձնական տվյալներ</a>
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
                                    <Input
                                      {...firstName_validation}
                                      defaultValue={user?.firstname}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...lastName_validation}
                                      defaultValue={user?.lastname}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...email_validation}
                                      defaultValue={user?.email}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="doctor"
                                      >
                                        Հեռախոս
                                      </label>
                                      {methods?.formState.errors.phone && (
                                        <span className="error text-red">
                                          <span>
                                            <img
                                              src={ErrorSvg}
                                              alt="errorSvg"
                                            />
                                          </span>
                                          պարտադիր
                                        </span>
                                      )}
                                    </div>
                                    <CustomPhoneComponent
                                      name="phone"
                                      control={methods.control}
                                      defaultValue={user?.contact?.phone}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="country"
                                      >
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
                                      defaultValue={
                                        user?.contact?.address?.country
                                      }
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <CountryDropdown
                                          {...field}
                                          classes="form-control"
                                          defaultOptionLabel="Երկիր"
                                          value={field.value}
                                          priorityOptions={["Armenia"]}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            setCountry(val);
                                            trigger("country");
                                          }}
                                          style={{
                                            appearance: "auto",
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="state"
                                      >
                                        Մարզ
                                      </label>
                                      {methods?.formState.errors.state && (
                                        <span className="error text-red">
                                          <span>
                                            <img
                                              src={ErrorSvg}
                                              alt="errorSvg"
                                            />
                                          </span>
                                          պարտադիր
                                        </span>
                                      )}
                                    </div>
                                    <Controller
                                      name="state"
                                      control={methods.control}
                                      defaultValue={
                                        user?.contact?.address?.state
                                      }
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <RegionDropdown
                                          {...field}
                                          classes="form-control"
                                          country={country}
                                          defaultOptionLabel="Մարզ"
                                          value={field.value}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            setRegion(val);
                                            trigger("state");
                                          }}
                                          style={{
                                            appearance: "auto",
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...city_validation}
                                      defaultValue={
                                        user?.contact?.address?.city
                                      }
                                    />{" "}
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...street_validation}
                                      defaultValue={
                                        user?.contact?.address?.street
                                      }
                                    />{" "}
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...zipCode_validation}
                                      defaultValue={
                                        user?.contact?.address?.zipCode
                                      }
                                    />{" "}
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <div className="d-flex justify-content-between me-2">
                                        <label
                                          className="form-label"
                                          htmlFor="birthday"
                                        >
                                          Ծննդյան ամսաթիվ
                                        </label>
                                        {methods.formState.errors
                                          .dateOfBirth && (
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
                                      <div>
                                        <CustomDateComponent
                                          name="dateOfBirth"
                                          control={methods.control}
                                          defaultValue={user?.birthday}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row gx-3 mt-2 mb-2">
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
                                            <img
                                              src={ErrorSvg}
                                              alt="errorSvg"
                                            />
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
                                          defaultChecked={
                                            user?.gender === "Male"
                                          }
                                          onChange={() =>
                                            onGenderSelect("Male")
                                          }
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
                                          defaultChecked={
                                            user?.gender === "Female"
                                          }
                                          onChange={() =>
                                            onGenderSelect("Female")
                                          }
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
                                      <div className="d-flex justify-content-between me-2">
                                        <label
                                          className="form-check-label"
                                          htmlFor="male"
                                        >
                                          Ընտանեկան կարգավիճակ
                                        </label>
                                        {methods.formState.errors
                                          .maritalStatus && (
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
                                    </div>
                                    <div className="d-flex  align-items-center">
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="married"
                                          value="married"
                                          defaultChecked={
                                            user?.maritalStatus === "married"
                                          }
                                          onChange={() =>
                                            onUserMerriedSelect("married")
                                          }
                                          {...methods.register(
                                            "maritalStatus",
                                            {
                                              required: true,
                                            }
                                          )}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="married"
                                        >
                                          Ամուսնացած
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="single"
                                          value="single"
                                          defaultChecked={
                                            user?.maritalStatus === "single"
                                          }
                                          onChange={() =>
                                            onUserMerriedSelect("single")
                                          }
                                          {...methods.register(
                                            "maritalStatus",
                                            {
                                              required: true,
                                            }
                                          )}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="single"
                                        >
                                          Չամուսնացած
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="row gx-3">
                                <div className="col-sm-6">
                                  <Input {...user_validation} defaultValue={user?.username}/>
                                </div>
                                <div className="col-sm-6">
                                  <Input {...password_validation} defaultValue={user?.password}/>
                                </div>
                              </div> */}

                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...emergencyContactName_validation}
                                      defaultValue={
                                        user?.contact?.emergencyContactName
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="phoneNumber"
                                      >
                                        Լրացուցիչ կոնտակտի հեռախոս
                                      </label>
                                      {methods.formState.errors
                                        .emergencyContactNumber && (
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
                                    <CustomPhoneComponent
                                      name="emergencyContactNumber"
                                      control={methods.control}
                                      defaultValue={
                                        user?.contact?.emergencyContactNumber
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
                        <div className="card-body" style={{zIndex:'0'}}>
                          <div className="modal-body">
                            <form>
                              <div className="row gx-12">
                                   <div className="col-sm-12">
                              <Editor
                                apiKey={process.env.REACT_APP_EDITOR_KEY}
                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                initialValue={user?.additionalData}
                                init={{
                                  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
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
                      {errMsg && 
                        <div>
                          <ol>
                            <li style={{fontSize:'12px',color:'red',listStyle: 'inside'}}>
                            {errMsg}
                            </li>
                          </ol>
                        </div>
                        }
                          <div className="modal-footer align-items-center">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setEditRow(false)}
                            >
                              Չեղարկել
                            </button>
                            <button
                              type="button"
                              onClick={onSubmit}
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                            >
                              Հաստատել
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </FormProvider>
            )}
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserEditModal;
