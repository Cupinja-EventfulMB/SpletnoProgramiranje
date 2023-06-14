import useEventPopup from "hooks/useEventPopup";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "components/form/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import useEvent from "api/useEvent";

const EventSideView = ({ isOpen, onClose }) => {
  const { toggleGoingEvent, toggleInterestedEvent } = useEvent();

  const eventPopup = useEventPopup();
  const event = eventPopup.event;

  const user = useSelector((state) => state.auth.user);

  const [showPopup, setShowPopup] = useState(true);

  const [isGoing, setIsGoing] = useState(false);
  const [isInterested, setIsInterested] = useState( false  );

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
    toggleGoingEvent(event._id, user._id);
  };

  const handleIsInterested = () => {
    toggleInterestedEvent(event._id, user._id);
  };

  if (!isOpen) return null;

  return (
    <div
      id="sideview"
      className={`
    fixed right-0 top-0 h-full w-2/6 bg-white z-50 flex flex-col shadow-lg
    translate
    duration-300
    overflow-y-auto
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
        src={event.image}
        alt=""
        className="object-cover object-center w-full h-1/4"
      />
      <div className="flex flex-col gap-4 p-4">
        <h3 className="font-semibold text-2xl">{event.name}</h3>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <p className="font-semibold">Date:</p>
            <p>{event.date.match(/.*?\..*?\.(.{5})/)[0]}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-semibold">Time:</p>
            <p>{event.date.match(/.*?\..*?\.(.{6})(.*)/)[2]}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-semibold">Location:</p>
            <p>{event.location.institution}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Description:</p>
          <p>{event.description}</p>
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
                value={isInterested}
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