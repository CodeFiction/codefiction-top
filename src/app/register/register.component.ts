import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../userinfo.service";
import {Datastructure} from "../../../Datastructure/TopperStack";
import {Router} from "@angular/router";

@Component({
  template: `<div class="o-container o-container--small">

    <div class="u-center-block" style="height: 20px;">
    </div>

    <form id="addUserForm" name="addUserForm" onsubmit="return false;">
    
    <div class="o-grid">
        <div class="o-grid__cell o-grid__cell--width-60">
              <input type="text" name="userName" id="name" placeholder="e.g: Nickname" [class.c-field--error]="usernameInvalid" [(ngModel)]="currentTopper.name" class="c-field">
              <br />     
                  <input type="text" name="roomName" id="name" placeholder="Room to join" [(ngModel)]="currentTopper.room" class="c-field">
              <br />
              <span>Current online toppers: {{ onlineCount }}</span>
        </div>
        <div class="o-grid__cell o-grid__cell--width-40">
                <button (click)="addUser()" class="c-button c-button--info">Start topping <i class="fa fa-play" aria-hidden="true"></i></button>
        </div>
    </div>
    
    
    </form>
    </div>
<router-outlet></router-outlet>`
})

export class RegisterComponent implements OnInit {

    currentTopper: Datastructure.ITopper;
    usernameInvalid: boolean = false;
    onlineCount: number = 0;


    constructor(private userInfoService: UserInfoService, private router: Router){
        this.router = router;
        this.userInfoService = userInfoService;
        this.currentTopper = this.userInfoService.getCurrentTopper();

    }

    addUser() {
        this.userInfoService.getSocketConnection().emit('addUser', this.currentTopper);
    }

  ngOnInit() {

      this.userInfoService.getSocketConnection().on('update_toppers', (totalTopppers) => {
            this.onlineCount = totalTopppers;
      });

      this.userInfoService.getSocketConnection().on('update_me', (data) => {
          this.currentTopper.id = data.id;
          this.router.navigate(['/topper'], {});
      });

      this.userInfoService.getSocketConnection().on('register_failed', (data) => {
          this.currentTopper.id = data.id;
          this.usernameInvalid = true;
      });

  }

}
