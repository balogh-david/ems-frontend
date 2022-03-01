import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BackButtonComponent } from "../@reusable-components/back-button/back-button.component";
import { ErrorMessageComponent } from "../@reusable-components/error-message/error-message.component";
import { LanguageSelectorComponent } from "../@reusable-components/language-selector/language-selector.component";
import { PaginationComponent } from "../@reusable-components/pagination/pagination.component";
import { AppEqualPermissionDirective } from "../core/directives/app-equal-permission.directive";
import { AppPermissionDirective } from "../core/directives/app-permission.directive";

@NgModule({
  declarations: [
    ErrorMessageComponent,
    BackButtonComponent,
    AppPermissionDirective,
    AppEqualPermissionDirective,
    PaginationComponent,
    LanguageSelectorComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
  ],
  exports: [
    ErrorMessageComponent,
    BackButtonComponent,
    AppEqualPermissionDirective,
    AppPermissionDirective,
    PaginationComponent,
    LanguageSelectorComponent,
  ]
})
export class SharedModule {}
