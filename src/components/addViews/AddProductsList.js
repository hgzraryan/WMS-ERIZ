
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import ErrorSvg from "../../dist/svg/error.svg";
import { Input } from "../Input";
import { name_validation } from "../../utils/inputValidations";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { PRODUCTCATEGORIES_URL, REGISTER_PRODUCTSLIST } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import { deleteNullProperties } from "../../utils/helper";
import { toast } from "react-toastify";

function AddProductsList({
    handleToggleCreateModal,
    refreshData,
    
  }) {
    const navigate = useNavigate()

    const axiosPrivate = useAxiosPrivate();
    const editorRef = useRef(null);
    const [errMsg, setErrMsg] = useState("");

    const [productCategories, setProductCategories] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const productCategoriesResp = await axiosPrivate.get(PRODUCTCATEGORIES_URL);
          setProductCategories(productCategoriesResp?.data?.jsonString);
          //setIsLoading(false);
        } catch (err) {
          console.log(err);
          //navigate("/login", { state: { from: location }, replace: true });
        }
      };
      setTimeout(() => {
        fetchData();
      }, 500);
    }, [navigate]);
    const methods = useForm({
        mode: "onChange",
      });
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
      const onSubmit = methods.handleSubmit(async (data) => {
        const newProductsList = {
          name: data?.name || null,
          category: data?.productCategory?.value || 0,
          description: editorRef.current.getContent({ format: "text" }),
        };
    
        const updatedData = deleteNullProperties(newProductsList)
    
        try {
          await axiosPrivate.post(REGISTER_PRODUCTSLIST, updatedData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
    
          handleToggleCreateModal(false);
          refreshData();
          notify(
            `${newProductsList.name} Ապրանքը ավելացված է`
          );
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
      show={() => true}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ապրանքի տեսակ
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
                        <a href="#">Ապրանքի տվյալներ</a>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...name_validation} />
                        
                            </div>
                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                     className="form-label"
                                     htmlFor="productCategory"
                                   >
                                     Ապրանքի դասակարգը
                                   </label>
                                {methods.formState.errors.productCategory && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>{" "}
                                    պարտադիր
                                  </span>
                                )}
                              </div>
                              <div className="form-control">
                                <Controller
                                  name="productCategory"
                                  control={methods.control}
                                  defaultValue={null}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                    //   onChange={(val) => {
                                    //     field.onChange(val.value);
                                    //     onProductsClassSelect(val);
                                    //   }}
                                    //   value={productCategories.find(
                                    //     (option) =>
                                    //       option.value === productClassType
                                    //   )}
                                      options={[
                                        {
                                          value: 0,
                                          label: "Առանց դասակարգ",
                                        },
                                        ...productCategories?.map((item) => ({
                                          value: item.categoryId,
                                          label: item.name,
                                        })),
                                      ]}
                                      placeholder={"Ընտրել"}
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    <div className="separator-full"></div>
                    <div className="card">
                      <div className="card-header">
                        <a href="#">Հավելյալ տվյալներ</a>
                      
                      </div>
                      <div className="card-body" style={{ zIndex: "0" }}>
                        <div className="modal-body">
                          <form>
                            <div className="row gx-12">
                              <div className="col-sm-12">
                                <Editor
                                  apiKey={process.env.REACT_APP_EDITOR_KEY}
                                  onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                  }
                                  init={{
                                    plugins:
                                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagembed linkchecker",

                                    toolbar:
                                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                    tinycomments_mode: "embedded",
                                    tinycomments_author: "Author name",
                                    mergetags_list: [
                                      {
                                        value: "First.Name",
                                        title: "First Name",
                                      },
                                      { value: "Email", title: "Email" },
                                    ],
                                    ai_request: (request, respondWith) =>
                                      respondWith.string(() =>
                                        Promise.reject(
                                          "See docs to implement AI Assistant"
                                        )
                                      ),
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
  )
}

export default AddProductsList
