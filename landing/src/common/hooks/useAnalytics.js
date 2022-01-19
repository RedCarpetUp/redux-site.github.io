import { callApi } from "common/utils/loginMiddleware";
import { firebase } from "../utils/firebase";
const useAnalytics = async (data) => {
  const device_data = JSON.parse(sessionStorage.getItem("device_data"));
  const phone = sessionStorage.getItem("phone");
  const accessToken = sessionStorage.getItem("accessToken");

  const userData = {
    source: "website",
    ...data,
    ...device_data,
  };

  if (process.env.API_URL === process.env.PROD_URL) {
    firebase.analytics().logEvent(data.Event, userData);
  }

  let response = await callApi(
    "/get_credit_score?TAG=analytics",
    "POST",
    {
      ...data,
      source: "website",
    },
    phone,
    accessToken
  );
  return "";
};

export default useAnalytics;
