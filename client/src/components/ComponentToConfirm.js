import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

const ComponentToConfirm = ({
  confirmUserRef,
  handleCloseModal,
  handleDeleteItem,
  selectedItemId,
  userName,
  userId
}) => {
  return (
    <Modal show={selectedItemId !== null} size="xl" onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Հեռացնել աշխատակցին
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="contact-body contact-detail-body ">
            <div data-simplebar className="nicescroll-bar">
              <div className="d-flex flex-xxl-nowrap flex-wrap">
                <div className="contact-info w-100">
                  <div className="card">
                    <div className="card-body">
                      <div className="modal-body">
                        <form>
                          <div className="row gx-12 ">
                            <div className="col-sm-12">
                              <div className="form-group center">
                                <label
                                  className="form-label"
                                  htmlFor="confirmUser"
                                >
                                  Աշխատակցի հեռացման համար խնդրում ենք մուտքագրել "{userName}" տեքստը
                                </label>
                                <input
                                  ref={confirmUserRef}
                                  type="text"
                                  name="name"
                                  placeholder="Մուտքագրել պահանջվող տեքստը"
                                  id="confirmUser"
                                  className="form-control w-50"
                                  autoComplete="off"
                                  value={confirmUserRef.value}
                                  onChange={(e) =>
                                    (confirmUserRef.current = e.target.value)
                                  }
                                  required
                                />
                              </div>
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
                      onClick={() => handleDeleteItem(userId)}
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Ջնջել
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleCloseModal(selectedItemId)}
                    >
                      Չեղարկել
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ComponentToConfirm;
