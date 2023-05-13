import { StringConstants } from "./StringConstants";

class UrlConstants extends StringConstants {
  url_dev = "http://localhost:4000";

  loginViewPath = "/login";
  signupViewPath = "/signup";
  employeeViewPath = "/employee";
  managerViewPath = "/manager";

  API = "api";

  LOGIN = `${this.url_dev}/${this.API}/${this.EMPLOYEES}/login`;
  //EMPLOYEES (manager and employee)
  GETEMPLOYEESBYUSERID = `${this.url_dev}/${this.API}/${this.EMPLOYEES}/getDetailByUserId/`;
  SIGNUP = `${this.url_dev}/${this.API}/${this.EMPLOYEES}/sign-up`;
}

let urls = new UrlConstants();
export default urls;
