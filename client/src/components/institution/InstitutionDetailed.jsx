import React, { useState } from "react";
import InstitutionMap from "./InstitutionMap";

const InstitutionDetailed = ({ institution }) => {
  const { name, email, phoneNumber, address, location, mainImage, images, description } = institution;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="pt-10 mb-10 mt-5 mx-20 p-10 rounded-lg" style={{ backgroundColor: 'rgb(237,237,237)' }}>
      <div className="flex">
        <div className="w-1/3 pr-4">
          <div>
            <img
              src={mainImage}
              alt="Main Image"
              className="w-full h-auto max-h-60 max-w-60 object-cover cursor-pointer rounded-lg"
              onClick={() => handleImageClick(mainImage)}
            />
          </div>

          <div className="flex flex-wrap mt-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="w-1/6 h-auto m-2 cursor-pointer rounded-lg"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>

        <div className="w-2/3 ml-5 mr-5">
          <h2>{name}</h2>
          <p>Email: {email}</p>
          <p>Phone Number: {phoneNumber}</p>
          <p>Address: {address}</p>
          <p>Description: {description}</p>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-75">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected Image"
              className="max-h-96 max-w-96 rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black rounded-full w-8 h-8 flex items-center justify-center"
              onClick={handleCloseImage}
            >
              X
            </button>
          </div>
        </div>
      )}

      <div className=" ml-5 mr-5 mt-5">
        <div style={{ height: "300px" }}>
          <InstitutionMap institution={institution} />
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetailed;