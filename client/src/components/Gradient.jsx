const Gradient = ({ title, subtitle }) => {
  //gradient
  return (
    <div
      className={`
    w-full
    h-[230px]
    bg-gradient-to-r
    from-rose-500
    to-amber-500
  `}
    >
      <div className="flex flex-col justify-center h-full mx-40">
        <h1 className="text-4xl font-semibold text-white">{title}</h1>
        <p className="text-white text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default Gradient;