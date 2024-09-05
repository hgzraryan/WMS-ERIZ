import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { name_validation } from '../../utils/inputValidations';
import { Input } from '../Input';
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { REGISTER_PRODUCTCATEGORY } from '../../utils/constants';

const attributeTypes = [
  { value: "kg", label: "Կիլոգրամ" },
  { value: "piece", label: "Հատ" },
  { value: "Other", label: "Այլ" },
];
function AddProductClass({ handleToggleCreateModal ,refreshData}) {
  const navigate = useNavigate()
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const editorRef = useRef(null);
  const [attributs, setAttributs] = useState([]);
  const [units, setUnits] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errMsg, setErrMsg] = useState("");

  const handleInputChange = ( event) => {
    setInputValue(prev=>event)
  };
  const onUnitSelect = (data) => {
    setUnits(data)
  };
  const handleAddInput = () => {
    setAttributs(prev=>[...attributs, { attributeName: inputValue, attributeUnit: units.value, attributeUnitLabel:units.label }]);
    setInputValue('')
  };
  const handleDeleteInput = (name) => {
    const filteredAttributes = attributs.filter((el)=>el.attributeName!== name)
    setAttributs(filteredAttributes);
  };

  const methods = useForm({
    mode: 'onChange',
  });
  const onSubmit = methods.handleSubmit(async (data) => {
    const newAttribute = {
      name: data?.name,
      attributs:attributs,
      additional: editorRef.current.getContent({ format: "text" }),

    };
    //const updatedData = deleteNullProperties(newDiagnose)

    try {
      await axiosPrivate.post(REGISTER_PRODUCTCATEGORY, newAttribute, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      handleToggleCreateModal(false);
       refreshData();
      // notify(
      //   `${newDiagnose.diagnosticsName} Ախտորոշումը ավելացված է`
      // );
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg(" Failed");
      }
    }
  });
  return (
    <Modal
      show={true}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
          Ավելացնել ապրանքի դասակարգ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProvider {...methods}>
          <div className="contact-body contact-detail-body">
            <div data-simplebar className="nicescroll-bar">
              <div className="d-flex flex-xxl-nowrap flex-wrap">
                <div className="contact-info w-100">
                  <form
                    noValidate
                    autoComplete="off"
                    className="container"
                  >
                    <div className="card">
                      <div className="card-header">
                        <a href="#">Ապրանքի դասակարգի տվյալներ</a>
                        {/* <button
                          className="btn btn-xs btn-icon btn-rounded btn-light"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit"
                        >
                          <span className="icon">
                            <FeatherIcon icon="edit-2" />
                          </span>
                        </button> */}
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3 mb-2">
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...name_validation} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                      <div className="card">
                        <div className="card-header">
                          <a href="#">Դասակարգի Հատկանիշներ</a>
                       
                        </div>
                        <div className="card-body">
                          <div className="modal-body">
                            <div className="row gx-3 mb-2">
                    {attributs.length > 0 && (
                      <>
                              {attributs.map((input, index) => (
                                <>
                                <div className='d-flex'>

                                <ol start={index+1}>
                                <li key={index}>{input.attributeName+" - " + input.attributeUnitLabel}</li>
                                </ol>
                                <FeatherIcon
                                icon="delete"
                                width="35"
                                onClick={()=>handleDeleteInput(input.attributeName)}
                                style={{ cursor: 'pointer' }}
                                />
                                </div>
                               {/* {console.log(input)} */}
                                </>
                              ))}
                              </>
                            )}
                                <div  className="d-flex mb-2 gap-1">
                                  <div className="col-sm-6 ">
                                  <label
                                        className="form-label"
                                        htmlFor="attributeType"
                                        >
                                        Անվանում
                                      </label>
                                  <input
                                    name="attributeName"
                                    value={inputValue}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    placeholder={`Անվանում`}
                                    className="form-control me-3 mt-2"
                                    />
                                  {/* <Input
                                    name="attributeName"
                                    //onChange={(e) => handleInputChange(index, e)}
                                    placeholder={`Անվանում`}
                                    className="form-control me-3"
                                    /> */}
                                    </div>
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="attributeType"
                                        >
                                        Չափման միավոր
                                      </label>
                                      {methods.formState.errors
                                        .attributeType && (
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
                                        name="attributeType"
                                        control={methods.control}
                                        defaultValue={null}
                                        
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <Select
                                          {...field}
                                          
                                          value={field.value}
                                          isDisabled={!inputValue}
                                          options={attributeTypes}
                                          placeholder={"Ընտրել"}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            onUnitSelect(val);
                                          }}
                                          />
                                        )}
                                        />
                                    </div>
                                  </div>
                                </div>
                              <FeatherIcon
                                icon="plus-circle"
                                width="35"
                                onClick={handleAddInput}
                                style={{ cursor: 'pointer' }}
                                />
                            </div>
                          </div>
                          </div>
                          </div>

                    <div className="separator-full"></div>
                    <div className="card">
                      <div className="card-header">
                        <a href="#">Հավելյալ տվյալներ</a>
                      
                      </div>
                      <div className="card-body" style={{ zIndex: '0' }}>
                        <div className="modal-body">
                          <div className="row gx-12">
                            <div className="col-sm-12">
                              <Editor
                                apiKey={process.env.REACT_APP_EDITOR_KEY}
                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                init={{
                                  plugins:
                                    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagembed linkchecker',
                                  toolbar:
                                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                  tinycomments_mode: 'embedded',
                                  tinycomments_author: 'Author name',
                                }}
                              />
                            </div>
                          </div>
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
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={onSubmit}
                        disabled={!attributs.length}
                        >
                        Ավելացնել
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
}

export default AddProductClass;
