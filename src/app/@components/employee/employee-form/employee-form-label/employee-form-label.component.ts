import { Component, Input } from "@angular/core";

@Component({
  selector: "app-employee-form-label",
  templateUrl: "./employee-form-label.component.html"
})
export class EmployeeFormLabelComponent {

  @Input()
  label!: string;

}
