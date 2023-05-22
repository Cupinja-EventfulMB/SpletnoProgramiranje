import useEventPopup from "hooks/useEventPopup";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "components/Button";
import axios from "axios";
import { useSelector } from "react-redux";

const EventSideView = ({ isOpen, onClose }) => {
  const eventPopup = useEventPopup();
  const event = eventPopup.event;

  const { user } = useSelector((state) => state.auth);

  const [showPopup, setShowPopup] = useState(true);

  const [isGoing, setIsGoing] = useState(false);

  useEffect(() => {
    setShowPopup(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowPopup(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleIsGoing = () => {
    console.log(user._id);
    if (isGoing) {
      axios
        .delete("http://localhost:3001/api/events/going", {
          eventId: event.id,
          userId: user._id,
        })
        .then(() => {
          setIsGoing(false);
        });
    } else {
      axios
        .post("http://localhost:3001/api/events/going", {
          eventId: event.id,
          userId: user._id,
        })
        .then(() => {
          setIsGoing(true);
        });
    }
  };

  const handleIsInterested = () => {
    if (isGoing) {
      axios
        .delete("http://localhost:3001/api/events/interested", {
          eventId: event.id,
          userId: user._id,
        })
        .then(() => {
          setIsGoing(false);
        });
    } else {
      axios
        .post("http://localhost:3001/api/events/interested", {
          eventId: event.id,
          userId: user._id,
        })
        .then(() => {
          setIsGoing(true);
        });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`
    fixed right-0 top-0 h-full w-2/6 bg-white z-50 flex flex-col shadow-lg
    translate
    duration-300
    ${showPopup ? "translate-x-0" : "translate-x-full"}
    ${showPopup ? "opacity-100" : "opacity-0"}
    `}
    >
      <IoMdClose
        size={24}
        className="absolute top-2 right-2 text-2xl cursor-pointer z-50 text-white"
        onClick={handleClose}
      />
      <img
        src="https://content.eventim.com/static/uploaded/at/p/b/h/g/pbhg_960_360.webp"
        alt=""
        className="object-cover object-center w-full h-1/4"
      />
      <div className="flex flex-col gap-4 p-4">
        <h3 className="font-semibold text-2xl">{event.name}</h3>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <p className="font-semibold">Date:</p>
            <p>3 May 2023</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-semibold">Time:</p>
            <p>20:00</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-semibold">Location:</p>
            <p>Maribor</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-semibold">Price:</p>
            <p>20€</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Description:</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quibusdam, quia, quae voluptates voluptate quod
            voluptatibus quos doloribus quas fugit. Quisquam voluptatum,
            quibusdam, quia, quae voluptates voluptate quod voluptatibus quos
            doloribus quas fugit. Quisquam voluptatum, quibusdam, quia, quae
            voluptates voluptate quod voluptatibus quos doloribus quas fugit.
            Quisquam voluptatum, quibusdam, quia, quae voluptates voluptate quod
            voluptatibus quos doloribus quas fugit. Quisquam voluptatum,
            quibusdam, quia, quae voluptates voluptate quod voluptatibus quos
            doloribus quas fugit. Quisquam voluptatum, quibusdam, quia, quae
          </p>
        </div>
        {user && (
          <>
            <span>
              <input
                type="checkbox"
                name=""
                value={isGoing}
                onChange={handleIsGoing}
              />
              <label htmlFor="">Going</label>
            </span>

            <span>
              <input
                type="checkbox"
                name=""
                value={isGoing}
                onChange={handleIsInterested}
              />
              <label htmlFor="">Interested</label>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default EventSideView;
