import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private database : AngularFireDatabase) { }

  save(user : firebase.User) {
    this.database.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid : string) : Observable<AppUser> {
    return this.database.object('/users/' + uid).valueChanges() as Observable<AppUser>;
  }
}
