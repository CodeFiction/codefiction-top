import {
  Component,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';

import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import { Datastructure } from '../../../Datastructure/TopperStack';
import { Chat } from '../../../Datastructure/Message';

@Component({
  selector: 'app-chat',
  template: `<div class="c-card c-card--highest chatWindow">
    <div class="c-card__item c-card__item--brand">Live Chat</div>
    <div #chatwindow (click)="scrollToBottom()" class="chatwindow-wrapper">
        <div *ngFor="let message of messages" class="message-item" title="{{message.date |  date: 'H:m:s'}}"><b>@{{message.sender}}</b> {{message.message}}</div>
    </div>
    </div>
<input type="text" name="message" id="message"  (keyup.enter)="sendMessage($event)" placeholder="Say something..." class="c-field message-box" />
`,
  styles: [
    '.chatWindow { background: #e5edf9;  }',
    '.chatwindow-wrapper { height: 350px;  overflow-y: scroll; }',
    '.message-box { height: 60px; font-size: 20px; font-weight: bold; margin-top: 10px; }',
    '.message-item { padding: 10px; }',
    'b { color: #2e69c9; }'
  ]
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatwindow') private myScrollContainer: ElementRef;

  private previousChatHeight: number = 0;
  currentTopper: Datastructure.ITopper;
  messages: Chat.Message[];

  constructor(private socketService: SocketService, private router: Router) {
    this.socketService = socketService;
    this.currentTopper = this.socketService.getCurrentTopper();
    this.messages = [];
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.socketService.getSocketConnection().on('message', data => {
      this.messages.push(data);
    });
  }

  sendMessage(event) {
    let message: Chat.Message = {
      message: event.target.value,
      sender: this.currentTopper.name,
      room: this.currentTopper.room,
      date: null
    };

    this.socketService.getSocketConnection().emit('message', message);
    event.target.value = '';
  }

  scrollToBottom(): void {
    if (this.canScroll()) {
      this.previousChatHeight = this.myScrollContainer.nativeElement.scrollHeight;
      try {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight + 30;
      } catch (err) {}
    }
  }

  // http://stackoverflow.com/a/35493028/3399234
  private canScroll(): boolean {
    return (
      this.previousChatHeight !==
      this.myScrollContainer.nativeElement.scrollHeight
    );
  }
}
