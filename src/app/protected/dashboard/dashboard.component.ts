import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

import {
  faUser,
  faEdit,
  faSignOut,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/auth/interfaces/interfaces';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    const token = localStorage.getItem('token');
    if (!token || !this.authService.isValidToken(token)) {
      // No hay un token válido en el localStorage, redirige a la página de inicio de sesión.
      this.route.navigate(['/login']);
    }
    const decodedToken = this.authService.DecodeToken(token!);

    console.log('Token decodificado:', decodedToken);
    let user: User;
    if (Cookie.check('user')) {
      console.log('COOKIE:', Cookie.get('user'));
      user = JSON.parse(Cookie.get('user'));
    } else {
      user = {
        username: decodedToken.sub!,
        authorities: JSON.parse(decodedToken.authorities!), //contrario de un stringify(obtener el objeto)
        enabled: true,
      };
    }
    this.authService._usuario = user;
    console.log('USUARIO:', this.authService._usuario);
  }
  faUser = faUser;
  faEdit = faEdit;
  faSignOut = faSignOut;
  faCaretDown = faCaretDown;
  get usuario() {
    return this.authService.usuario;
  }
  logout() {
    this.authService.logout();
    this.route.navigate(['/auth']);
  }
}
