import strings from "../global/constants/StringConstants";
import { store } from "./store";

// Checks if the error code is 401 or 403 -> Logout the user
export const checkStatus = async (error) => {
  if (error.status === 403 || error.status === 401) {
    // store.dispatch(logOutAction());
    // history.push(urls.landingViewPath);
    return true;
  }
  return false;
};

export const getCallParams = async (methodType, body) => {
  const accessToken = "Bearer " + store.getState().auth.token;
  const paramBody = methodType === "POST" ? { body: JSON.stringify(body) } : {};
  return {
    method: methodType,
    headers: await getHeaderObject(accessToken, strings.applicationJSON),
    ...paramBody,
  };
};

export async function getHeaderObject(accessToken, contentType) {
  try {
    if (accessToken) {
      return {
        ...contentType,
        Authorization: accessToken,
      };
    }
    // history.push(urls.landingViewPath);
    return null;
  } catch (error) {
    throw error;
  }
}

export const makeCall = async (callName, callParams, convertToJSON = true) => {
  try {
    let call = fetch(callName, callParams);
    let timeout = getTimeoutPromise();
    const response = await Promise.race([timeout, call]).catch((error) => {
      throw error;
    });
    let json;
    if (convertToJSON) {
      json = await response.json();
    }
    if (response && response.ok) {
      return json;
    }
    throw json;
  } catch (error) {
    if (await checkStatus(error)) {
      throw "notifiers.LOGGEDOUT";
    }
    console.log(error);
    throw error;
  }
};

export const getTimeoutPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        reject({
          error: true,
          message: "Something went wrong. Please reload the page.",
        }),
      30000 // 30 Seconds
    );
  });
};
