import { Injectable } from '@angular/core';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { temaModel } from 'rescued/f10scout/src/app/models/tema';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { BehaviorSubject, Observable } from 'rxjs';

import {  collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class TemiService implements ItemServiceInterface{
  Collection="temi"
  db:any
  items_list: Array<temaModel> = []
  $items: BehaviorSubject<Array<temaModel>> = new BehaviorSubject<Array<temaModel>>([])
  constructor() { }
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  reference: string;
  items;
  async  getItem(key: string) {
    const docRef = doc(this.db, this.Collection, key);
    const docSnap = await getDoc(docRef)
    console.log("users snap",docSnap.data())
     return new temaModel(docSnap.data())
  }
  async  updateItem(item: ItemModelInterface) {
    return setDoc(doc(this.db,this.Collection,item.key),item.serialize())
  }
  deleteItem(key: string) {
    console.log("deleting",key)
    return deleteDoc(doc(this.db,"users",key))
    
  }
  getEmptyItem(): temaModel {
    return new temaModel()
  }
  async  setItem(item: ItemModelInterface) {
 
    return  setDoc(doc(this.db,this.Collection,item.key),item.serialize())
  }
  loadDataAndPublish() {
    const auth = getAuth();
  }
  async  createItem(item: ItemModelInterface) {
  
    return  setDoc(doc(this.db,this.Collection,item.key),item.serialize())
  }
}
