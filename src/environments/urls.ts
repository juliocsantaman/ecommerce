import { environment } from "./environmet"; 

export const URLS = {
  registerUser: environment.hosts.ecommerce + 'api/v1/user/register',
  login: environment.hosts.ecommerce + 'api/v1/user/login',
  getUserData: environment.hosts.ecommerce + 'api/v1/user/getUserData?email={email}'
};