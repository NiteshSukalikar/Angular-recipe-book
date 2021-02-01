import { ValueConverter } from "@angular/compiler/src/render3/view/template";

export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationdate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationdate || new Date() > this._tokenExpirationdate) {
      return null;
    }
    return this._token;
  }
}

//this model is used all the core data which makes up the new user !!
//this porpertise are necessary for the user
//validating for token is still valid ..
//token still exists or valid also check here
