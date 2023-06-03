import React from "react";
import Modal from "./Modal";
import useLoginModal from "hooks/useLoginModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "state/authSlice";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const commonInputClasses = "border-2 border-gray-300 rounded-md px-6 py-2";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3001/api/auth/login", data)
      .then((res) => {
        dispatch(loginSuccess(res.data));
        loginModal.onClose();
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={"Login"}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className={commonInputClasses}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            className={commonInputClasses}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        {error && <span className="text-red-600">{error}</span>}
      </div>
    </Modal>
  );
};

export default LoginModal;
