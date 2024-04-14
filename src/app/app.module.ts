import { NgModule } from '@angular/core';
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

import { CdkMenuModule } from '@angular/cdk/menu';
import { LayoutUserComponent } from './user/layout-user/layout-user.component';
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderUserComponent } from './user/header-user/header-user.component';
import { FooterUserComponent } from './user/footer-user/footer-user.component';
import { BodyUserComponent } from './user/body-user/body-user.component';
import { BlogComponent } from './user/blog/blog.component';
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
    MatCardModule
    ///




  ],
  providers: [
    [provideHttpClient(withFetch()),JwtHelperService],
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
