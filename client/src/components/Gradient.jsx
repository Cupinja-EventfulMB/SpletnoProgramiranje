const Gradient = () => {
    //gradient
    return (
      <div
        className={`
      w-full
      h-[400px]
      bg-gradient-to-r
      from-violet-800
      to-amber-600
      
    `}
      >
        <div className="flex flex-col justify-center h-full mx-40">
          <h1 className="text-4xl font-semibold text-white">
            EventfulMB
          </h1>
          <p className="text-white text-lg">Find the best events in Maribor for you...</p>
        </div>
      </div>
    );
  };
  
export default Gradient;  