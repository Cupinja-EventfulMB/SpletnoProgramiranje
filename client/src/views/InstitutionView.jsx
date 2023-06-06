import React, { useEffect, useState } from "react";

//COMPONENTS
import InstitutionCardContainer from "components/institution/InstitutionCardContainer";
import Gradient from "components/Gradient";
import LoginModal from "components/modals/LoginModal";
import RegisterModal from "components/modals/RegisterModal";

//REDUX
import { useSelector } from "react-redux";

import axios from "axios";
import EventCardContainer from "components/event/EventCardContainer";

const LandingView = ({ socket }) => {

  const [institution, setInstitution] = React.useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        //onsole.log("Received notification:", data.message);
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
      <Gradient
        title={"EventfulMB"}
        subtitle={"Welcome to EventfulMB"}
      />
      <RegisterModal />
      <LoginModal />
      <div className="container mx-auto h-[600px] flex flex-row py-2">
        <div className="w-4/6 py-1 overflow-y-auto" id="i">
          <EventCardContainer />
        </div>
      </div>
    </>
  );
};

export default LandingView;
