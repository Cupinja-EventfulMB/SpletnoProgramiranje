import {Formik} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginSuccess} from "state";
import Button from "components/form/Button";

const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm Password is required"),
    phoneNumber: yup.string(),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const initialValuesRegister = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",

};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = ({pageType}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        console.log(JSON.stringify(values));
        const savedUserResponse = await fetch(
            "http://localhost:3001/api/auth/register",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        ).catch((err) => console.log(err));
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        if (savedUser) {
            navigate("/login");
        }
    };
    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/api/auth/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );
        const res = await loggedInResponse;
        console.log(res.status)
        const loggedIn = await loggedInResponse.json();


        onSubmitProps.resetForm();
        if (res.status == 200) {
            dispatch(
                loginSuccess({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/dashboard");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  resetForm,
              }) => (
                <form onSubmit={handleSubmit} className="flex flex-col">
                    {isRegister && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="border-[1px] border-gray-300 rounded-md p-2 mb-2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="border-[1px] border-gray-300 rounded-md p-2 mb-2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="border-[1px] border-gray-300 rounded-md p-2 mb-2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="border-[1px] border-gray-300 rounded-md p-2 mb-2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone number"
                                className="border-[1px] border-gray-300 rounded-md p-2 mb-2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phoneNumber}
                            />
                            <label htmlFor="dateOfBirth" className="block font-medium mb-1 text-gray-400">Date of
                                Birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                className="border-[1px] border-gray-300 rounded-md p-2 mb-2 text-gray-400"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dateOfBirth}
                                min="1900-01-01"
                                max="2023-12-31"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="border-[1px] border-gray-300 rounded-md p-2 mb-2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                            />
                        </>
                    )}
                    {isLogin && (
                        <>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="border-[1px] border-gray-300 rounded-md p-2 mb-2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="border-[1px] border-gray-300 rounded-md p-2 mb-2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                        </>
                    )}
                    <div className="flex justify-between items-center">
                        <Button
                            text={isLogin ? "Login" : "Register"}
                            onClick={() => handleFormSubmit(values)}
                        />
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default Form;