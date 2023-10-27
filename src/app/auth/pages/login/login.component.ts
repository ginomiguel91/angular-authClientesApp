import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    username: ['admin', [Validators.required]],
    password: ['12345', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    const { username, password } = this.miFormulario.value;
    this.authService.login(username, password).subscribe((resp) => {
      if (resp) {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire(
          'Error al ingresar',
          'Usuario o contraseña incorrectos',
          'error'
        );
      }
    });
  }
}
