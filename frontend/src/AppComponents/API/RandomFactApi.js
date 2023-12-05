import axios from "axios";

export const getFact = () => axios.get(`https://uselessfacts.jsph.pl/api/v2/facts/random`)