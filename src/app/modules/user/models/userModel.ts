import {
  ItemModelInterface,
  Genere
} from '../../item/models/itemModelInterface';
import { ItemServiceInterface } from '../../item/models/ItemServiceInterface';
import { Value } from '../../item/models/value';
import { DateModel } from './birthDateModel';
import { RoleModel } from './privilegesLevelModel';
import { configs } from 'src/app/configs/configs';
import { QuickAction } from '../../item/models/QuickAction';
import { KeyboardResize } from '@capacitor/keyboard';
import { Serializers } from '../../helpers/serializers';
// import { EditUserPage } from '../pages/edit-user/edit-user.page';
export class UserModel implements ItemModelInterface {
  birthDate: DateModel; // { day: number; month: number; year: number };
  email: string="";
  firstName: string="";
  lastName: string="";
  password: string;
  _expirationDate:DateModel
  _expirationTime:number
  title: string;
  key: string;
  offlineEnabled = false // for the moment false for default
  uid: string;
  level: number;
  quickActions: Array<QuickAction>;
  enabled: boolean;
  role: RoleModel;
  dor = new DateModel(new Date())
  displayName:string
  service: ItemServiceInterface;
  set fullName (name:string){
    this.firstName= name.split(' ')[0]
    this.lastName= name.split(' ')[1]
  }
get fullName(){
  return `${this.firstName} ${this.lastName}`
}
  set expirationDate (date:string){
    this._expirationDate = new DateModel(new Date(date))
    this._expirationTime = this._expirationDate.getTime()
  }
  get expirationDate (){
    return this._expirationDate?this._expirationDate.formatDate():""
  }
   get expirationTime(){
    return this._expirationTime
   }

  constructor(user?: {}, key?: string,) {
    this.load(user)
    if(this.level){
      this.role= configs.accessLevel.filter(
        (access: RoleModel) => access.value === this.level
      )[0];
    }
    if (key) {
      this.key = key
      this.uid = key
    }
  }
  note?: string;
  archived?: boolean;
  isArchived?(): boolean {
    return this.archived
  }
  archiveItem?(b: boolean) {
    this.archived = b
  }
  isArchivable?(): boolean {
    return true
  }
  setKey(key: string): UserModel {
    this.key = key
    return this
  }

  isOfflineEnabled() {
    return this.offlineEnabled
  }
  initialize(user: any) {
    Object.assign(this, user)
    return this
  }


  getNote() {
    return new Value({
      value: `${this.firstName} ${this.lastName}`,
      label: 'user'
    });
  }

  getTitle() {
    const defineText = (v:string)=>v?v:''
    return new Value({ value: `${defineText( this.displayName)}: ${this.email}`, label: 'user mail' });
  }

  build(item: {}) {
    const loader = ([Key, value]) => {
      this[Key] = value;
    };
    if(!this._expirationDate){
        this.expirationDate = new DateModel(new Date()).formatDate()
    }
    Object.entries(item).forEach(loader);
    // tslint:disable-next-line: no-string-literal

    
    if (item['birthDate']) {
      // tslint:disable-next-line: no-strin
      this.birthDate = new DateModel(item['birthDate']);
    }
    this.role = configs.accessLevel.filter(
      (access: RoleModel) => access.value === this.level
    )[0];

  }
  hasQuickActions() {
    return false;
  }
  getQuickActions() {
    return this.quickActions;
  }

  getCountingText() {
    return {plural:'utenti',singular:'utente'}
  }

  serialize() {
    const serializer= new Serializers()
    const out = {
      uid: this.uid || this.key,
      birthDate: this.birthDate ? this.birthDate.serialize() : '',
      dor: new DateModel(this.dor).formatDate(),
      email: this.email ?? '',
      firstName: this.firstName ?? '',
      lastName: this.lastName ?? '',
      fullName:this.fullName ?? '',
      enabled: !!this.enabled,
      displayName:serializer.serialize2String(this.displayName),
      expirationDate:serializer.serialize2String(this.expirationDate),
      level: this.role && this.role.value ? this.role.value : 3,
      archived: !!this.archived
    };
    if (!out.uid) {
      delete out.uid

    }

    return this.key ? { ...out, ...{ key: this.key } } : out
  }

  roleFactory(level) {

    const out = configs.accessLevel.filter(
      (access: RoleModel) => access.value === level
    )[0]

    return out ? out : configs.accessLevel[2] //utente standard

  }

  load(args) {
    Object.assign(this, args)
    this.role = this.roleFactory(this.level)
    if(args&&args['dor']){
      this.dor = new DateModel(new Date(this.dor))}
    this.key = this.key ?? this.uid
    this.enabled = Boolean(this.enabled)
    this.expirationDate= this.expirationDate||new DateModel(new Date()).formatDate()
    return this;

  }

  getValue3() {
    const value = new Value({ value: this.role?.key, label: 'ruolo ' });
    return value;
  }

  getValue2() {
    const value = new Value({
      value: this.enabled ? '     abilitato' : ' non abilitato',
      label: ' abilitato'
    });
    return value;
  }

  getValue4() {
    const value = new Value({
      value: this.fullName,
      label: ' nome intero '
    });
    return value;
  }

  getEditPopup() {
    return '/user/edit-user';
  }
  /*
  getEditPopup(item, service) {
    return "to be implemented";
  }*/

  getAggregate() {
    return new Value({ label: 'aggregato', value: 'to be implemented' });
  }

  getCreatePopup() {
    return 'to be implemented';
  }

  getElement() {
    const genere: Genere = 'o';
    return { element: 'Utente', genere };
  }
}
