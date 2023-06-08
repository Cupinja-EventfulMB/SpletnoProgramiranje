import React from "react";
import Modal from "./Modal";
import useAddInstitutionModal from "../hooks/useAddInstitution";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const commonInputClasses = "border-2 border-gray-300 rounded-md px-6 py-2";
const commonErrorClasses = "text-red-600";

const AddInstitutionModal = () => {
  const addInstitutionModal = useAddInstitutionModal();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      location: {
        "type": "Point",
        "coordinates": [14.506174, 46.051711]
      },
      mainImage: "",
      images: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3001/api/institution", data)
      .then(() => {
        addInstitutionModal.onClose();
        reset();
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={addInstitutionModal.isOpen}
      onClose={addInstitutionModal.onClose}
      title={"Add institution"}
      actionLabel={"Add institution"}
      onSubmit={handleSubmit(onSubmit)}
    >
    <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              {...register("name", { required: true })}
              className={commonInputClasses}
              type="text"
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
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="address">Address</label>
            <input
              {...register("address", { required: false })}
              className={commonInputClasses}
              type="text"
              placeholder="Not required"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="mainImage">Image</label>
            <input
              {...register("mainImage", { required: true })}
              className={commonInputClasses}
              type="text"
            />
            {errors.mainImage && (
              <span className={commonErrorClasses}>This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <input
              {...register("description", { required: true })}
              className={commonInputClasses}
              type="description"
            />
            {errors.description && (
              <span className={commonErrorClasses}>This field is required</span>
            )}
          </div>
        </div>
        {error && <p className="text-red-600">{error.message}</p>}
      </div>
    </Modal>

  );
};

export default AddInstitutionModal;