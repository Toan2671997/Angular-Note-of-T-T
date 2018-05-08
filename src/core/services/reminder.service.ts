import { Injectable } from '@angular/core';
import { MyReminder } from '../models/MyReminder';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

// This is for Item
import { MyReminderItem } from '../models/MyReminderItem';

@Injectable()
export class ReminderService {

  reminderDoc: AngularFirestoreDocument<MyReminder>;

  // This is for Item
  itemCollection: AngularFirestoreCollection<MyReminderItem>;
  reminder: MyReminder;

  constructor(public db: AngularFirestore) {
    // this.reminders = this.db.collection('/Reminders').valueChanges();

    this.reminderCollection = this.db.collection('/Reminders', ref => ref.orderBy('title', 'asc'));

    this.reminders = this.reminderCollection.snapshotChanges().map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as MyReminder;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getReminders () {
    return this.reminders;
  }

  addReminder(reminder: MyReminder) {
    this.reminderCollection.add(reminder);
  }

  deleteReminder(reminder: MyReminder) {
    this.reminderDoc = this.db.doc(`/Reminders/${reminder.id}`);
    this.reminderDoc.delete();
  }

  updateReminder(reminder: MyReminder) {
    this.reminderDoc = this.db.doc(`/Reminder/${reminder.id}`);
    this.reminderDoc.update(reminder);
  }
  // get reminders() {
  //   return this._reminders.asObservable();
  // }

  // loadReminders() {
  //   this.db.collection('reminders').snapshotChanges().subscribe(actions => {
  //    const items = actions.map(a => {
  //       const item = a.payload.doc.data() as MyReminder;
  //       console.log(item);
  //       return item;
  //     });
  //     return this._reminders.next(items);
  //   });
  // }

  // pushReminder(reminder: MyReminder) {
  //   const reminders = this._reminders.getValue();
  //   reminders.push(reminder);
  //   this._reminders.next(reminders);
  //   this.db.collection('reminders').add(reminder);
  // }

  // deleteReminder(reminder: MyReminder) {
  //   const reminders = this._reminders.getValue();
  //   reminders.forEach((item, index) => {
  //     if (item === reminder) {
  //       reminders.splice(index, 1);
  //     }
  //   });
  //   this._reminders.next(reminders);
  // }
}
