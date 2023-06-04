import React from "react";
import Modal from "./Modal";
import axios from "axios";
import useEditInstitutionsModal from "../hooks/useEditInstitutionsModal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const EditInstitutionsModal = ({ institution, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const {
    edit,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      title={institution ? `Edit institution ${institution.name}` : "Edit Institution"}
      actionLabel={"Edit institution"}
    >
      {/* Modal content */}
    </Modal>
  );
};

export default EditInstitutionsModal;