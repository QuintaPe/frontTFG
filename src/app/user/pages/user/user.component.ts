import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { User } from "@user/models/user";
import { UserService } from "@user/services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
  providers: [UserService],
})
export class UserComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  addUser(form: NgForm) {
    if (form.value._id) {
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getUsers();
      });
    } else {
      this.userService.postUser(form.value).subscribe((res) => {
        this.getUsers();
        this.resetForm(form);
      });
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.userService.users = res;
    });
  }

  editUser(user: User) {
    this.userService.selectedUser = user;
  }

  deleteUser(_id: string, form: NgForm) {
    if (confirm("Are you sure you want to delete it?")) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.getUsers();
        this.resetForm(form);
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.userService.selectedUser = new User();
    }
  }
}
