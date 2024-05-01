import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './AdditionalEducationPopup.css';
import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Input } from "antd";

const AdditionalEducationPopup = ({ visible, onCancel, onAdd ,data}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    onAdd(data);
    onCancel();
  };

  return (
    <Modal
      title="Add Additional Education"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card mb-2 p-3 mt-2">
          <h6 className="card-title text-secondary">Education</h6>
          <div className="row form-row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group mb-2 card-label">
                <label>Education level</label>
                <input
                  defaultValue={data?.degree}
                  {...register("degree")}
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group mb-2 card-label">
                <label>College/Institute</label>
                <input
                  defaultValue={data?.college}
                  {...register("college")}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group mb-2 card-label">
                <label>Year of Completion</label>
                <input
                  defaultValue={data?.completionYear}
                  {...register("completionYear")}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </Modal>
  );
};

export default AdditionalEducationPopup;