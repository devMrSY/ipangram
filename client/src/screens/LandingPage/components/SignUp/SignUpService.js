import urls from "../../../../global/constants/UrlConstants";
import { getCallParams, makeCall } from "../../../../utils/service";

export async function signUp(body) {
  try {
    const callParams = await getCallParams("POST", body);
    const response = await makeCall(urls.SIGNUP, callParams);
    return response;
  } catch (error) {
    throw error;
  }
}
