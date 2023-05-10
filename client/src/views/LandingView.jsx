import React, { useEffect } from "react";

const LandingPage = ({socket}) => {
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
  return <>HomePage</>;
};

export default LandingPage;