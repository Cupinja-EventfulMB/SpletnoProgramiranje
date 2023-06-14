import React from "react";
import Modal from "./Modal";
import useAddEventModal from "../hooks/useAddEventModal";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const commonInputClasses = "border-2 border-gray-300 rounded-md px-6 py-2";
const commonErrorClasses = "text-red-600";

const AddEventModal = () => {
  const addEventModal = useAddEventModal();
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
      date: "",
      location: "647ca7abbd1054933e598875",
      description: "",
      image: "",
      category: "",
      going: "",
      interested: "",
      duration: ""
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3001/api/event", data)
      .then(() => {
        addEventModal.onClose();
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
      isOpen={addEventModal.isOpen}
      onClose={addEventModal.onClose}
      title={"Add event"}
      actionLabel={"Add event"}
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="location">Location</label>
            <input
              {...register("location", { required: true })}
              className={commonInputClasses}
              type="text"
              placeholder="Not required"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image">Image</label>
            <input
              {...register("image", { required: false })}
              className={commonInputClasses}
              type="text"
              placeholder="Not required"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="date">Date of birth</label>
            <input
              {...register("date", { required: true })}
              className={commonInputClasses}
              type="date"
            />
            {errors.date && (
              <span className={commonErrorClasses}>This field is required</span>
            )}
          </div>
        </div>
        {error && <p className="text-red-600">{error.message}</p>}
      </div>
    </Modal>

  );
};

export default AddEventModal;