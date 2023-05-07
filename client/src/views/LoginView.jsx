import Form from "components/form/Form";

const LoginPage = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] rounded-md shadow-lg bg-white" style={{ height: 'auto' }}>
      <div className="border-b-[1px] w-full p-2 text-center font-semibold text-lg">
        Login
      </div>
      <div className="w-full p-4 flex flex-col">
        <Form pageType={"login"} />
      </div>
    </div>
  );
};

export default LoginPage;
