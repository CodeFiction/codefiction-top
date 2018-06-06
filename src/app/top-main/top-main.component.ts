import { Component, OnInit } from '@angular/core';
import { Datastructure } from '../../../Datastructure/TopperStack';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  template: `<div class="o-container o-container--large">

    <div class="u-center-block" style="height: 20px;">
    </div>

    <div class="o-grid">
    <div class="o-grid__cell o-grid__cell--width-10">
    <div class="c-avatar c-avatar u-small u-highest">
    <img class="c-avatar__img" src="assets/images/cf-icon.png">
    </div>
    </div>
    <div class="o-grid__cell o-grid__cell--width-90">
    <div class="u-center-block app-title">
    <div class="u-center-block__content u-center-block__content--vertical"><b>#{{currentTopper.room}}</b></div>
</div>
</div>
</div>

            <div class="o-grid">
            <div class="o-grid__cell o-grid__cell--width-50">
    
                <ul class="c-card c-card--highest u-high" id="topperList">
                    <div class="c-card__item c-card__item--divider">Toppers</div>
                    
                    <li *ngFor="let topper of topperList.getList()" [style.background-color]="topper.color"
                    class="c-card__item topper"><h3>{{topper.name === currentTopper.name ? '@'+topper.name : topper.name
                    }}</h3></li>
                </ul>
                
                <button (click)="topMe()"
                class="c-button c-button--rounded c-button--ghost-error c-button--block u-super u-highest">Speak up!
                <i class="fa fa-bullhorn" aria-hidden="true"></i>
                </button>
            
            </div>
            <div class="o-grid__cell o-grid__cell--width-50">
                <app-chat></app-chat>
            </div>
       
        </div>
    </div>
    <router-outlet></router-outlet>`,
  styles: ['#topperList { padding:0px; margin-top:0px; }'],
})
export class TopMainComponent implements OnInit {
  socketService: SocketService;
  currentTopper: Datastructure.ITopper;
  topperList: Datastructure.TopperStack = new Datastructure.TopperStack([]);
  socket;

  constructor(socketService: SocketService, private router: Router) {
    this.socketService = socketService;
    this.currentTopper = this.socketService.getCurrentTopper();
    if (this.currentTopper.name === null) {
      this.router.navigate(['/register'], {});
    }
  }

  ngOnInit() {
    this.socketService.getSocketConnection().on('update_toppers', data => {
      this.topperList.setList(data.toppers);
    });
  }

  topMe() {
    this.socketService.getSocketConnection().emit('top_me', this.currentTopper);
  }
}
