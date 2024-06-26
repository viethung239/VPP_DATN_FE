import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss'
})
export class HeaderUserComponent {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, public cartService: CartService) { }

  ngOnInit(): void {

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  logout(): void {
    this.authService.Logout();
  }
}
