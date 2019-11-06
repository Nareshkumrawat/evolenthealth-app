import Axios from "axios";
import Config from "../app/config";
import { SiteConstants } from "../constants";
import Helper from "../utils/helper";

const instance = Axios.create({
  timeout: 180000
});

const Network = (baseUrl = process.env.REACT_APP_BASE_API_URL) => {
  instance.defaults.baseURL = baseUrl;
  return instance;
};
