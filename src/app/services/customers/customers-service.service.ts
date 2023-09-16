import { Injectable } from '@angular/core';
import { Database, DatabaseReference, DataSnapshot, getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { BehaviorSubject, Observable } from 'rxjs';
import { credentials } from 'src/app/configs/credentials';
import { Customer } from 'src/app/models/Customer';
import { MyFirebaseHelper } from 'src/app/modules/helpers/createFirebaseApp';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements ItemServiceInterface {
  constructor(public authService: AuthService) {
    new MyFirebaseHelper().createFirebaseApp(credentials.firebase)
    this.reference = 'userProfile'
    this.db = getDatabase()
    this.itemsListRef = ref(this.db, this.reference)
    this.loadDataAndPublish(this.publishItems)
  }
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  createItem(item: ItemModelInterface) {
    throw new Error('Method not implemented.');
  }

  publishItems(lista: Customer[]) {// must stay inside onValue to update data evry time there is an update

    this.$items.next(lista)

  }

  deleteAuthUser(data: { email: string }) {
    console.log("deleting", data)
    const functions = getFunctions()
    const deleteAuthUser = httpsCallable(functions, 'deleteAuthUser')
    return deleteAuthUser(data)
  }

  addCustomClaim(data: { email: string, claims: {} }) {
    const functions = getFunctions()
    const addCustomClaim = httpsCallable(functions, 'addCustomClaim')
    return addCustomClaim({ email: data.email, claims: data.claims })
  }
 
  getUser(email:string){
    console.log("getting user of",email)
    const functions= getFunctions()
    const getUserProfile= httpsCallable(functions,"getUserProfile")
    return getUserProfile({email:email})
  }

  reference: string = "userProfile"
   $items: BehaviorSubject<ItemModelInterface[]> = new BehaviorSubject([])
  items_list: Customer[];
  db: Database;
  itemsListRef: DatabaseReference;
  readonly items: Observable<ItemModelInterface[]> = this.$items.asObservable()
  getItem(key: string, next: (item?: any) => void): void {
    const reference = ref(this.db, `${this.reference}/${key}`)
    onValue(reference, user => { next(user) })
  }
  updateItem(item: ItemModelInterface) {
    const reference = ref(this.db, `${this.reference}/${item.key}`)
    return set(reference, item.serialize())
  }
  async deleteItem(key: string) {
    var email = ""
    const reference = ref(this.db, `${this.reference}/${key}`)
    this.getItem(key, (user: DataSnapshot) => {
      if (user.val()) {// con il nuovo sistema di registrazione utenti potrebbe 
        email = user.val().email
        console.log("user to delete", user.val())
        this.deleteAuthUser({ email: email }).then(() => { })
      }
    })
    return remove(reference).then(res => { console.log(`removed ${res}`) }).catch(err => { console.log(`deleted user data for ${email}`) })
  }
  getEmptyItem(): ItemModelInterface {
    return new Customer()
  }
  setItem(item: ItemModelInterface) {
    return push(this.itemsListRef, item.serialize())
  }
  loadDataAndPublish(next?): void {
    onValue(this.itemsListRef, (snapshot) => {


      this.items_list = []
      snapshot.forEach(e => {
        const item = new Customer(e.val())
        item.setKey(e.key)

        this.items_list.push(item)


      })
      this.publishItems(this.items_list)
    })
  }
}
