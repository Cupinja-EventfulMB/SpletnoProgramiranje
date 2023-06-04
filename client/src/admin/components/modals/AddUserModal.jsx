import React from "react";
import Modal from "./Modal";
import useRegisterModal from "hooks/useRegisterModal";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const commonInputClasses = "border-2 border-gray-300 rounded-md px-6 py-2";
const commonErrorClasses = "text-red-600";

const AddUserModal = () => {
  const registerModal = useRegisterModal();
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
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3001/api/auth/register", data)
      .then(() => {
        registerModal.onClose();
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
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title={"Register"}
      actionLabel={"Register"}
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
            <label htmlFor="password">Password</label>
            <input
              {...register("password", { required: true })}
              className={commonInputClasses}
              type="password"
            />
            {errors.password && (
              <span className={commonErrorClasses}>This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              {...register("confirmPassword", { required: true })}
              className={commonInputClasses}
              type="password"
            />
            {errors.confirmPassword && (
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
          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input
              {...register("dateOfBirth", { required: true })}
              className={commonInputClasses}
              type="date"
            />
            {errors.dateOfBirth && (
              <span className={commonErrorClasses}>This field is required</span>
            )}
          </div>
        </div>
        {error && <p className="text-red-600">{error.message}</p>}
      </div>
    </Modal>

  );
};

export default AddUserModal;