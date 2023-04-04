import { Injectable } from '@angular/core';
import { apiEnviroment } from 'src/environments/environment';
import { transformGetParams } from '@utils/functions';
import axios from 'axios';

const {API_BASE_URL } = apiEnviroment;

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor() {}

  fetch(method:string, url:string, params: any= {}, isFormData = false) {
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
        Authorization: `Bearer ${token}`,
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'

      },
      withCredentials: true,
    };
  
    let URL = `${API_BASE_URL}/${url}`;
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
      .catch((error) => {
        throw error;
      });
  }
}
