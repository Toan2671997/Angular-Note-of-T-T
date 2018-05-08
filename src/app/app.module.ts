import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './body/login/login.component';
import { MenuAppComponent } from './body/login/menu-app/menu-app.component';
import { ReminderComponent } from './body/login/menu-app/reminder/reminder.component';
import { FormsModule } from '@angular/forms';
import { LeftComponent } from './body/login/menu-app/reminder/left/left.component';
import { RightComponent } from './body/login/menu-app/reminder/right/right.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { ReminderService } from '../core/services/reminder.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    LoginComponent,
    MenuAppComponent,
    LoginComponent,
    ReminderComponent,
    LeftComponent,
    RightComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Angular-Note-of-TandT'),
    AngularFirestoreModule
  ],
  providers: [ReminderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
