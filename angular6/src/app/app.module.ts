import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { searchPipe } from './pipes/search';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthenticationGuard } from './guards/authentication.guard';

import { ImageCropperModule } from 'ngx-image-cropper';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'conversation/:id', component: ConversationComponent},
  {path: 'profile', component: ProfileComponent,  canActivate: [AuthenticationGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    ConversationComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    searchPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    AngularFireDatabaseModule,
    ImageCropperModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
