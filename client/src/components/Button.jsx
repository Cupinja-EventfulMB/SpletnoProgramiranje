const Button = ({ title, action, primary, outline, disabled }) => {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className={`
      rounded-full
      px-4
      py-[4px]
      font-semibold
      hover:opacity-80
      transition
      duration-200
      
      ${outline && primary ? "border-[2px] border-rose-500 text-gray-800" : ""}
      ${outline && !primary ? "border-[2px] border-gray-800" : ""}
      ${!outline && primary ? "bg-rose-500 text-white" : ""}
      ${disabled && primary ? "bg-rose-500 opacity-80 cursor-not-allowed" : ""}

  `}
    >
      {title}
    </button>
  );
};

export default Button;
