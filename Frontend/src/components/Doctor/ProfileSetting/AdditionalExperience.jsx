import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './AdditionalExperience.css';

import { Modal, Input } from "antd";

const AdditionalExperiance = ({ visible, onCancel, onAdd, data }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    onAdd(data);
    onCancel();
  };

  return (
    <Modal
      title="Add Additional Experiance"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card mb-2 p-3 mt-2">
          <h6 className="card-title text-secondary">Experience</h6>
          <div className="row form-row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group mb-2 card-label">
                <label>Hospital Name</label>
                <input
                  defaultValue={data?.experienceHospitalName}
                  {...register("experienceHospitalName")}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group mb-2 card-label">
                <label>From</label>
                <input
                  defaultValue={data?.expericenceStart}
                  {...register("expericenceStart")}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group mb-2 card-label">
                <label>To</label>
                <input
                  defaultValue={data?.expericenceEnd}
                  {...register("expericenceEnd")}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group mb-2 card-label">
                <label>Designation</label>
                <input
                  defaultValue={data?.designation}
                  {...register("designation")}
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

export default AdditionalExperiance;
