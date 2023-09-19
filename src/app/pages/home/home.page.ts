import { Component, OnInit } from '@angular/core';
import { getAuth,  signOut } from "firebase/auth";
import { UserModel } from 'src/app/modules/user/models/userModel';
import { UsersService } from 'src/app/modules/user/services/users.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user:UserModel
  userName: string

  constructor(
    private users:UsersService
  ) { }

  async ngOnInit() {
 this.user = await this.users.fetchLoggedUser()
 this.userName = this.user.displayName || this.user.email
 console.log("user",this.userName)
 console.log(this.hello())
  }
  hello(){
    return `paz inverential ${this.userName}`
  }

logout(){
  console.log("logging out")
  const auth = getAuth();
  signOut(auth)
}


}