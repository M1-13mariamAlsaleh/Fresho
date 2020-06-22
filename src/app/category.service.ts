import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private database : AngularFireDatabase) { }

  getAll() : Observable<any> {
    return this.database.list('/categories', ref => ref.orderByChild('name'))
    .snapshotChanges() as Observable<any>;
  }
}
