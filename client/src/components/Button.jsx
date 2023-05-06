const Button = ({ text, onClick, outline, small }) => {
  return (
    <button
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
