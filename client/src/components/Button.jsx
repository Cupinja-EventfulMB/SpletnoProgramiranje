const Button = ({ text, onClick, outline, small }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-rose-500
        rounded-md
        text-white
        font-semibold
        hover:bg-rose-400
        transition
        duration-150
        ${small ? "px-4 py-1 text-sm" : "px-6 py-2 text-lg w-full"}
        `}
    >
      {text}
    </button>
  );
};

export default Button;
