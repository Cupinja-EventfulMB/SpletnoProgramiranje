import React, { useEffect } from "react";

//COMPONENTS
import Button from "../components/Button";
import Gradient from "components/Gradient";

const LandingView = ({ socket }) => {
  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        console.log("Received notification:", data.message);
        // Display the notification using a library or custom code
      });

      // Cleanup when the component is unmounted
      return () => {
        socket.off("notification");
      };
    }
  }, [socket]);
  return (
    <>
      <Gradient />
    </>
  );
};

export default LandingView;
