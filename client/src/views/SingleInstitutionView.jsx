import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

// COMPONENTS
import InstitutionCardContainer from "components/institution/InstitutionCardContainer";
import Gradient from "components/Gradient";
import LoginModal from "components/modals/LoginModal";
import RegisterModal from "components/modals/RegisterModal";
import InstitutionDetailed from "components/institution/InstitutionDetailed";

const SingleInstitutionView = ({ socket }) => {
  const location = useLocation();
  const institutionID = location.pathname.split("/")[2];
  const [institution, setInstitution] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Institution ID:", institutionID);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/institution/${institutionID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch institution");
        }
        const institutionData = await response.json();
        setInstitution(institutionData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitution();
  }, [institutionID]);

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        // console.log("Received notification:", data.message);
        // Display the notification using a library or custom code
      });

      // Cleanup when the component is unmounted
      return () => {
        socket.off("notification");
      };
    }
  }, [socket]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Gradient title={"EventfulMB"} subtitle={"Take a look at this institution"} />
      <RegisterModal />
      <LoginModal />
      <InstitutionDetailed institution={institution} />
    </>
  );
};

export default SingleInstitutionView;