// tslint:disable: quotemark
import { Injectable, OnInit } from "@angular/core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DatabaseReference, getDatabase,ref, onValue,remove,set,push, update } from "firebase/database";
import { ItemServiceInterface } from "../../item/models/ItemServiceInterface";
import { UserModel } from "../models/userModel";
import { ItemModelInterface } from "../../item/models/itemModelInterface";
import { BehaviorSubject, Observable } from 'rxjs';
import { getFunctions, httpsCallable } from "firebase/functions";
import { configs } from "src/app/configs/configs";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { credentials } from "src/app/configs/credentials";
import {  collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";

@Injectable({
  providedIn: "root"
})
export class UsersService implements ItemServiceInterface, OnInit {
  public itemsListReference: DatabaseReference;
  items_list: Array<UserModel> = []
  $items: BehaviorSubject<Array<UserModel>> = new BehaviorSubject([])
  _loggedUser: BehaviorSubject<UserModel> = new BehaviorSubject(new UserModel)
  loggedUser: Observable<UserModel> = this._loggedUser.asObservable()
  readonly items: Observable<Array<UserModel>> = this.$items.asObservable()
static loggedUser:UserModel
db: any
usersRef
  constructor() {
    this.loadDataAndPublish()
    const app = initializeApp(credentials.firebase)
    this.db = getFirestore(app)
    this.usersRef = collection(this.db,'users')
    this.items.subscribe(items=>{
      
    })


  }
  
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  itemsListRef: DatabaseReference;
  reference='userProfile'

  ngOnInit(): void {
    console.log("init")
  }

  loadDataAndPublish() {
    const auth = getAuth();
    onAuthStateChanged(auth,this.authStateChangeHandler);
  }

  authStateChangeHandler = async () => {
    const q = query(collection(this.db, "users"));
    const querySnapshot = await getDocs(q);
    this.$items.next( querySnapshot.docs.map(snap=>new UserModel().load(snap.data()).setKey(snap.id)))
  }

  async getItem(key: string) {
    const docSnap = await getDoc(this.usersRef)
     return new UserModel(docSnap.data())
  }

  FetchRole(level:number){
    return configs.accessLevel.filter(accesslevel=>accesslevel.value==level)[0]
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  //
   callCloudPushUser(user:{}){
	const functions = getFunctions()
	

  const insertUser = httpsCallable(functions,'adminAddUserProfile')
  return insertUser(user).then((msg)=>{
	  console.log('insert use',msg)
  }).catch((error)=>{
console.error(error);
  });

  }

  setLoggedUser(user: ItemModelInterface) {
    this._loggedUser.next(new UserModel(user, user['uid']));
    UsersService.loggedUser= new UserModel(user, user['uid'])
    return this.loggedUser;
  }

  deleteItem(key: string) {
    console.log("deleting",key)
    return deleteDoc(doc(this.db,"users",key))
    
  }

  getEmptyItem() {
    return new UserModel();
  }

  async  setItem(item: ItemModelInterface) {
 
     return  setDoc(doc(this.db,"users",item.key),item.serialize())
   }


   async  createItem(item: ItemModelInterface) {
  
      return  setDoc(doc(this.db,"users",item.key),item.serialize())
    }
   
  getEntitiesList(): DatabaseReference{
    return this.itemsListReference;
  }

 async  updateItem(item: ItemModelInterface) {
    return setDoc(doc(this.db,"users",item.key),item.serialize())
  }
}
