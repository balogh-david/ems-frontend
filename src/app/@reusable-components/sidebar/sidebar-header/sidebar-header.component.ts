import { Component, OnInit } from "@angular/core";
import { UserType } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-sidebar-header",
  templateUrl: "./sidebar-header.component.html"
})
export class SidebarHeaderComponent implements OnInit {

  user!: UserType;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.findByUserName(
      localStorage.getItem("userName")!.toString()
    ).subscribe(
      (user: UserType) => {
        this.user = user;
      }
    );
  }

}
