import { Component, OnInit } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import {MatDialog} from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers = [];
  
  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  filterFirstName(ref) : QueryFn{
    return ref.orderBy('firstName', 'asc');
 }

  ngOnInit(): void {
    this.firestore
    .collection('users', this.filterFirstName.bind(this))
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes: any) => {
      console.log('Received changes from DB', changes);
      this.allUsers = changes;
    });
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }
}
