import axios from "axios";

const api = "http://localhost:3001/api/user"

const getUser = async (id) => {
    return axios
    .get(api + "/" + id)
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

const getUserEvents = async (userId) => {
    return axios
    .get(api + "/" + userId + "events")
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

const useUser = () => {
    return {getUser, getUserEvents}
}

export default useUser;