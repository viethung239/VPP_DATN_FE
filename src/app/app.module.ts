import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './admin/body/body.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { HeaderComponent } from './admin/header/header.component';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SublevelMenuComponent } from './admin/sidenav/sublevel-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule } from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { CdkMenuModule } from '@angular/cdk/menu';
import { LayoutUserComponent } from './user/layout-user/layout-user.component';
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderUserComponent } from './user/header-user/header-user.component';
import { FooterUserComponent } from './user/footer-user/footer-user.component';
import { BodyUserComponent } from './user/body-user/body-user.component';
import { BlogComponent } from './user/blog/blog.component';
import { ShopUserComponent } from './user/shop-user/shop-user.component';
import { ProductDetailShopComponent } from './user/product-detail-shop/product-detail-shop.component';
import { AboutUserComponent } from './user/about-user/about-user.component';
import { CartUserComponent } from './user/cart-user/cart-user.component';
import {MatTabsModule} from '@angular/material/tabs';
import {NgxPaginationModule} from 'ngx-pagination';
import { BlogDetailComponent } from './user/blog-detail/blog-detail.component';
import { ProfileUserComponent } from './user/profile-user/profile-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { StatusDialogComponent } from './user/profile-user/status-dialog/status-dialog.component';
import { DetailCartComponent } from './user/profile-user/detail-cart/detail-cart.component';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    HeaderComponent,
    LayoutAdminComponent,
    DashboardComponent,
    SublevelMenuComponent,
    LoginComponent,
    LayoutUserComponent,
    DashboardUserComponent,
    HeaderUserComponent,
    FooterUserComponent,
    BodyUserComponent,
    BlogComponent,
    ShopUserComponent,
    ProductDetailShopComponent,
    AboutUserComponent,
    CartUserComponent,
    BlogDetailComponent,
    ProfileUserComponent,
    StatusDialogComponent,
    DetailCartComponent,


    //




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    OverlayModule,
    MatMenuModule,
    CdkMenuModule,
    MatCardModule,
    MatTabsModule,
    NgxPaginationModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatTreeModule,
    ///









  ],
  providers: [
    [provideHttpClient(withFetch()),JwtHelperService],
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
