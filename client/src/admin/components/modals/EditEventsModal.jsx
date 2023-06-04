import React from "react";
import Modal from "./Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import useEditEventsModal from "../hooks/useEditEventsModal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const commonInputClasses = "border-2 border-gray-300 rounded-md px-6 py-2";
const commonErrorClasses = "text-red-600";

const EditEventsModal = ({ event, isOpen, onClose }) => {
  const editEventModal = useEditEventsModal();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [formValues, setFormValues] = useState(null); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      id: event._id,
      name: event.title,
      date: event.date,
      location: event.date,
      description: event.description,
      image: event.image,
      category: event.category,
      going: event.going,
      interested: event.interested,
    },
  });

  useEffect(() => {
    setFormValues({
      id: event._id,
      name: event.name,
      date: event.date,
      location: event.date,
      description: event.description,
      image: event.image,
      category: event.category,
      going: event.going,
      interested: event.interested,
    });
  }, [event]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3001/api/event/${data.id}`, data);
      editEventModal.onClose();
      setIsUpdateSuccessful(true);
      reset(data);
      setFormValues(data); 
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
      title={event ? `Edit event ${event.title}` : "Edit Event"}
      actionLabel={"Edit event"}
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
          <label htmlFor="date">Date</label>
          <input
            {...register("date", { required: true })}
            className={commonInputClasses}
            type="date"
            onChange={handleInputChange}
          />
          {errors.date && (
            <span className={commonErrorClasses}>This field is required</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description", { required: true })}
            className={`${commonInputClasses} w-full h-40`} // Add h-40 class to increase height
            onChange={handleInputChange}
          />
          {errors.description && (
            <span className={commonErrorClasses}>This field is required</span>
          )}
        </div>
      </div>
    </div>
    </Modal>
  );
};

export default EditEventsModal;
