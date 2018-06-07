import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopMainComponent } from './top-main/top-main.component';
import { routing } from './app.route';
import * as io from 'socket.io-client';
import { SocketService } from './socket.service';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMainComponent,
    RegisterComponent,
    ChatComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpModule, routing],
  providers: [SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
