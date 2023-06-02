import Button from "components/form/Button";
import Form from "components/form/Form";

const RegisterPage = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] rounded-md shadow-lg bg-white" style={{ height: 'auto' }}>
      <div className="border-b-[1px] w-full p-2 text-center font-semibold text-lg">
        Register
      </div>
      <div className="w-full p-4 flex flex-col">
        <Form pageType={"register"} />
      </div>
    </div>
  );
};

export default RegisterPage;
