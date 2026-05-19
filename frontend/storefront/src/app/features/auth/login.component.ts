import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `<div class="container"><h1>Login</h1><p>Login feature - to be implemented.</p></div>`,
  styles: [`.container { max-width: 400px; margin: 2rem auto; padding: 0 1rem; }`]
})
export class LoginComponent {}
