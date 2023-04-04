// import { Component, OnInit } from "@angular/core";
// import { AuthService } from "@app/auth/services/auth.service";

// @Component({
//   selector: "app-user",
//   templateUrl: "./user.component.html",
//   styleUrls: ["./user.component.scss"],
// })
// export class UserComponent implements OnInit {
//   showAside: Boolean = localStorage.getItem('showAside') === 'true';
//   menuOptions: any[] = [];
  
//   constructor(public authService: AuthService) {}

//   ngOnInit() {
//     const role = this.authService.user.role;
//     if (role === 'user') {
//       this.menuOptions = [
//         {
//           name: 'Tus reservas',
//           icon: 'work',
//           to: '/user/bookings',
//         },
//         {
//           name: 'Editar perfil',
//           icon: 'person',
//           to: '/user/edit-account',
//         }
//       ]
//     } else if (role === 'manager') {
//       this.menuOptions = [
//         {
//           name: 'Crear camping',
//           icon: 'work',
//           to: '/manager/camping/',
//         },
//         {
//           name: 'Editar perfil',
//           icon: 'person',
//           to: '/manager/edit-account',
//         }
//       ]
//     } else  {
//       this.menuOptions = [
//         {
//           name: 'Tus reservas',
//           icon: 'work',
//           to: '/admin/bookings',
//         },
//         {
//           name: 'Editar perfil',
//           icon: 'person',
//           to: '/admin/edit-account',
//         }
//       ]
//     }
//   }

//   toggleMenu() {
//     this.showAside = !this.showAside;
//     localStorage.setItem('showAside', this.showAside.toString());
//   }
// }

