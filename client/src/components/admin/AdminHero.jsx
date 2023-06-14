const AdminHero = () => {
    //gradient
    return (
      <div
        className={`
      w-full
      h-[300px]
      bg-gradient-to-r
      from-violet-600
      to-amber-500
    `}
      >
        <div className="flex flex-col justify-center h-full mx-40">
          <h1 className="text-4xl font-semibold text-white">
            Hello admin of EventfulMB!
          </h1>
          <p className="text-white text-lg">Make this page even better!</p>
        </div>
      </div>
    );
  };
  
  export default AdminHero;
  