
/**
 * abstaction of customer concept
 */
export class Customer {
  firstName="";
  lastName="";
  dor="";
  enabled=false;
  birthDate="";
  enablingCode="";
  enablingCodeUsed=false;
  level=0;
  email="";
  userType=0;
  key="";

  /**
   * @param  {object=} user - snapshot of the user
   * @param  {string=} key - of the user
   */
  constructor(user?: any, key?: string) {
    Object.assign(this, user);
  }
}
