import { Injectable } from "@angular/core";
import { User } from "@models/user";
import { fetch } from "@utils/api";

@Injectable({
  providedIn: "root",
})

export class UserService {
  selectedUser: User;
  users: User[];
  readonly URL_API = "http://localhost:3000/api/users";

  constructor() {
    this.selectedUser = new User();
    this.users = []
  }

  postUser(user: User) {
    return fetch('POST', 'users', { ...user });
  }

  getUsers(opts: object) {
    return fetch('GET', 'users', { opts });
  }

  getUser(id: String) {
    return fetch('GET', `users/${id}`);
  }

  putUser(user: User) {
    return fetch('PUT', `users/${user._id}`, { ...user });
  }

  deleteUser(id: string) {
    return fetch('DELETE', `users/${id}`);
  }

  getUserBooking(id: String, opts: Object) {
    return fetch('GET', `users/${id}/bookings`, { opts });
  }
}
