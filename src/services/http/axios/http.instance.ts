import AxiosService from "./http.axios.service";
import Request from '../http.service'

const AxiosInstance = new Request(new AxiosService());

export default AxiosInstance;