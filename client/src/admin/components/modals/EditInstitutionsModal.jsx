import React from "react";
import Modal from "./Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import useEditInstitutionsModal from "../hooks/useEditInstitutionsModal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const commonInputClasses = "border-2 border-gray-300 rounded-md px-6 py-2";
const commonErrorClasses = "text-red-600";

const EditInstitutionsModal = ({ institution, isOpen, onClose }) => {
  const editInstitutionModal = useEditInstitutionsModal();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [formValues, setFormValues] = useState(null); // New state variable

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      id: institution._id,
      name: institution.name,
      email: institution.email,
      phoneNumber: institution.phoneNumber,
      description: institution.description,
      address: institution.address,
      location: institution.location,
      mainImage: institution.mainImage,
      images: institution.images
    },
  });

  useEffect(() => {
    // Update form values when default values change
    setFormValues({
      id: institution._id,
      name: institution.name,
      email: institution.email,
      phoneNumber: institution.phoneNumber,
      description: institution.description,
      address: institution.address,
      location: institution.location,
      mainImage: institution.mainImage,
      images: institution.images
    });
  }, [institution]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3001/api/institution/${data.id}`, data);
      editInstitutionModal.onClose();
      setIsUpdateSuccessful(true);
      reset(data); // Reset the form values to the new data
      setFormValues(data); // Update form values with the new data
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={institution ? `Edit institution ${institution.name}` : "Edit Institution"}
      actionLabel={"Edit institution"}
    >
      <div className="flex flex-col gap-4">
        {isUpdateSuccessful && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
            Successful update!
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              {...register("name", { required: true })}
              className={commonInputClasses}
              type="text"
              onChange={handleInputChange}
            />
            {errors.name && (
              <span className={commonErrorClasses}>This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              className={commonInputClasses}
              type="email"
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className={commonErrorClasses}>This field is required</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              {...register("phoneNumber", { required: false })}
              className={commonInputClasses}
              type="text"
              placeholder="Not required"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="address">Address</label>
            <input
              {...register("address", { required: true })}
              className={commonInputClasses}
              type="text"
              onChange={handleInputChange}
            />
            {errors.address && (
              <span className={commonErrorClasses}>This field is required</span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditInstitutionsModal;
