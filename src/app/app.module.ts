import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ToastrModule } from "ngx-toastr";
import { AuthModule } from "./@components/auth/auth.module";
import { DashboardComponent } from "./@components/dashboard/dashboard.component";
import { NavbarComponent } from "./@reusable-components/navbar/navbar.component";
import { SidebarHeaderComponent } from "./@reusable-components/sidebar/sidebar-header/sidebar-header.component";
import { SidebarComponent } from "./@reusable-components/sidebar/sidebar.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RequestInterceptor } from "./interceptors/request";
import { LocalStorageService } from "./services/local-storage.service";
import { UserService } from "./services/user.service";
import { SharedModule } from "./shared/shared.module";

/**
 * AoT requires an exported function for factories
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarHeaderComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem("lang")?.toString() ?? "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
  ],
  providers: [
    UserService,
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
