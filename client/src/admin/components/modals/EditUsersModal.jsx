import React from "react";
import Modal from "./Modal";
import axios from "axios";
import useEditUsersModal from "../hooks/useEditUsersModal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const EditUsersModal = ({ user, isOpen, onClose }) => {
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
      title={user ? `Edit user ${user.name}` : "Edit User"}
      actionLabel={"Edit user"}
    >
      {/* Modal content */}
    </Modal>
  );
};

export default EditUsersModal;