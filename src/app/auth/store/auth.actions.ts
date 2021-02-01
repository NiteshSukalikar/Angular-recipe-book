import { Action } from "@ngrx/store";

export const LOGIN_START = "[Auth] Login start";
export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";

export class login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class logout implements Action {
  readonly type = LOGOUT;
}

export type AuthAction = login | logout;
