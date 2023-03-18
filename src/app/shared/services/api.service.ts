import { Injectable } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { apiEnviroment } from 'src/environments/environment';
import { transformGetParams } from '@utils/functions';
import axios from 'axios';

const {API_BASE_URL, API_URL } = apiEnviroment;

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private authService: AuthService,
  ) {}

  fetch(method:string, url:string, params:{[key: string]: any} = {}, isFormData:boolean = false) {
    const token= this.authService.userToken;
    const CONFIG: {
      method:string, 
      headers: {}, 
      withCredentials:boolean, 
      body?:{[key: string]: any}
      data?:{}
      url?:string
    } = {
      method,
      headers: { Authorization: `Bearer ${token}` },
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
          CONFIG.body = params;
          // if (isFormData) {
          //   const formData = new FormData();
          //   Object.keys(params).forEach((key) => {
          //     formData.append(key, typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]);
          //   });
          //   CONFIG.data = formData;
          // } else {
            CONFIG.data = params;
          // }
          break;
      }
    }
  
    CONFIG.url = URL;
    console.log(CONFIG);
    return axios(CONFIG)
      .then(response => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
