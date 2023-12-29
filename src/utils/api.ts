import axios from "axios";
import { transformGetParams } from "./functions";
import environment from "src/environments/environment";

export async function fetch(method:string, url:string, params: any= {}, isFormData = false) {
  const token = localStorage.getItem('token');

  const CONFIG: {
    method:string,
    headers: {},
    withCredentials:boolean,
    body?: any
    data?:{}
    url?:string
  } = {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'

    },
    withCredentials: true,
  };

  let URL = url.startsWith('https://') ? url : `${environment.api.API_BASE_URL}/${url}`;
  if (params && typeof params === 'object') {
    switch (method) {
      case 'GET':
      case 'DELETE':
        URL += transformGetParams(params);
        break;

      case 'POST':
      case 'PUT':
      default:
        const sortedParams = Object.fromEntries(
          Object.entries(params).sort(([, v1], [, v2]) => v1 instanceof File ? 1 : v2 instanceof File ? -1 : 0)
        );
        CONFIG.body = sortedParams;
        CONFIG.data = sortedParams;

        break;
    }
  }

  CONFIG.url = URL;

  return axios(CONFIG)
    .then(response => response.data)
    .catch((axiosError) => {
      if (axiosError.code === 'ERR_BAD_REQUEST') {
        const error = axiosError.response.data;
        if (error.name === 'TokenExpiredError') {
          localStorage.removeItem('token');
        }
        throw error;
      }
      throw axiosError;
    });
}
