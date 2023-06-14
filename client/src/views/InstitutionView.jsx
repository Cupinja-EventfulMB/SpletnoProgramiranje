import React, { useEffect, useState } from "react";

import useInstitution from "api/useInstitution";

//COMPONENTS
import InstitutionCardContainer from "components/institution/InstitutionCardContainer";
import Gradient from "components/Gradient";
import LoginModal from "components/modals/LoginModal";
import RegisterModal from "components/modals/RegisterModal";


const InstitutionView = ({ socket }) => {

  const [institution, setInstitution] = React.useState([]);
  const [institutions, setInstitutions] = React.useState([]);

  const { getAllInstitutions } = useInstitution();

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

  useEffect(() => {
    getAllInstitutions().then((i) => {
      setInstitutions(i);
    });
  }, []);

  return (
    <>
      <Gradient
        title={"EventfulMB"}
        subtitle={"Welcome to EventfulMB"}
      />
      <RegisterModal />
      <LoginModal />
      <div className="container mx-auto h-[600px] flex flex-row py-2">
        <div className="py-1 overflow-y-auto" id="i">
          <InstitutionCardContainer institutions={institutions} title="Institutions" />
        </div>
      </div>
    </>
  );
};

export default InstitutionView;