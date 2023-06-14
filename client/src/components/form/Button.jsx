const Button = ({
    title,
    action,
    primary,
    outline,
    disabled,
    small,
    type,
    full,
  }) => {
    return (
      <button
        type={type}
        onClick={action}
        disabled={disabled}
        className={`
        rounded-full
        font-semibold
        transition
        duration-200
        bg-neutral-800
        text-white
        ${outline && primary ? "border-[2px] border-rose-500" : ""}
        ${outline && !primary ? "border-[2px] border-neutral-800" : ""}
        ${!outline && primary ? "bg-rose-500 text-white hover:bg-rose-600" : ""}
        
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${small ? "text-sm px-4 py-[5px]" : "px-6 py-2"}
        ${full ? "w-full" : ""}
  
    `}
      >
        {title}
      </button>
    );
  };
  
  export default Button;
  