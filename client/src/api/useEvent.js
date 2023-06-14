import axios from "axios";

const api = "http://localhost:3001/api/event";

const getOneEvent = async (id) => {
  return axios
    .get(api + "/" + id)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

const getAllEvents = async () => {
  return axios.get(api).then((res) => {
    return res.data;
  });
};


const toggleGoingEvent = async (eventId, userId) => {
  axios.post(api + "/going", { userId: userId, eventId: eventId });
};

const toggleInterestedEvent = async (eventId, userId) => {
  axios.post(api + "/interested", { userId: userId, eventId: eventId });
};

const useEvent = () => {
  return { getOneEvent, getAllEvents, toggleGoingEvent, toggleInterestedEvent };
};

export default useEvent;