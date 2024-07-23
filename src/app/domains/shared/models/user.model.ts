export interface User {

  email: string;
  password: string;
  created: string;

}

export interface Login {
  email: string;
  password: string;
}

export interface SignInToken {
  
    user: User;
    token: {
        token: string;
    }

}