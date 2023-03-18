import { Injectable } from "@angular/core";
import { ApiService } from "@app/shared/services/api.service";
import { User } from "@models/user";

@Injectable({
  providedIn: "root",
})

export class UserService {
  selectedUser: User;
  users: User[];
  readonly URL_API = "http://localhost:3000/api/users";

  constructor(private apiService: ApiService) {
    this.selectedUser = new User();
    this.users = []
  }

  postUser(user: User) {
    return this.apiService.fetch('POST', 'users', { ...user });
  }

  getUsers() {
    return this.apiService.fetch('GET', 'users');
  }

  getUser(id: String) {
    return this.apiService.fetch('GET', `users/${id}`);
  }

  putUser(user: User) {
    return this.apiService.fetch('PUT', `users/${user._id}`, { ...user });
  }

  deleteUser(_id: string) {
    return this.apiService.fetch('DELETE', 'users');
  }
}
