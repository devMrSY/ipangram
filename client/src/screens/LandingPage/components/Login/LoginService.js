import urls from "../../../../global/constants/UrlConstants";
import { getCallParams, makeCall } from "../../../../utils/service";

export async function login({ email, password }) {
  const body = {
    email: email,
    password: password,
  };
  try {
    const callParams = await getCallParams("POST", body);
    const response = await makeCall(urls.LOGIN, callParams);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
