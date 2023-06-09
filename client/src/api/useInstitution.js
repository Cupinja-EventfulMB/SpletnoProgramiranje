import axios from "axios";
import { async } from "q";

const api = "http://localhost:3001/api/institution";

const getOneInstitution = async (id) => {
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

const getAllInstitutions = async () => {
  return axios.get(api).then((res) => {
    return res.data;
  });
};

const getInstitutionEvents = async () => {

}


const useInstitution = () => {
  return { getOneInstitution, getAllInstitutions };
};

export default useInstitution;