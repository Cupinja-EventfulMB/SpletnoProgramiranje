import React from "react";
import Modal from "./Modal";
import axios from "axios";
import { format } from "date-fns";
import useEditUsersModal from "../hooks/useEditUsersModal";
import { useState } from "react";
import { useForm } from "react-hook-form";

const commonInputClasses = "border-2 border-gray-300 rounded-md px-6 py-2";
const commonErrorClasses = "text-red-600";

const EditUsersModal = ({ user, isOpen, onClose }) => {
  const editUsersModal = useEditUsersModal();

  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false); 

  const dateOfBirthValue = user.dateOfBirth
    ? format(new Date(user.dateOfBirth), "yyyy-MM-dd")
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.password,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3001/api/user/${data.id}`, data);
      editUsersModal.onClose();
      setIsUpdateSuccessful(true);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={user ? `Edit user ${user.name}` : "Edit User"}
      actionLabel={"Edit user"}
    >
      <div className="flex flex-col gap-4">
        {isUpdateSuccessful && ( // Render success message if update is successful
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
                value={dateOfBirthValue}
            />
            {errors.dateOfBirth && (
              <span className={commonErrorClasses}>This field is required</span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditUsersModal;
