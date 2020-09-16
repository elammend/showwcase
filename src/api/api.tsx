import axios from "axios";

export const getSchoolSuggestions = (inputString: string) => {
  return axios.get(
    `http://universities.hipolabs.com/search?name=${inputString}`
  );
};
