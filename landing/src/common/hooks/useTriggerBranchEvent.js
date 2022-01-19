import { callApi } from "common/utils/loginMiddleware";

const useTriggerBranchEvent = (dataBranch, phone, accessToken, userProfile, branch) => {

  const checkBranchData = async () => {

    try {
      if (dataBranch["~id"]) {
        try {
          let response = await callApi(
            "/get_events_branch",
            "GET",
            {},
            phone,
            accessToken
          );
          if (response.result == "success") {
            if (response.data) {
              response.data.map(async (d) => {
                if (!d.hit_status) {
                  let custom_data = {
                    "event": d.event,
                    "userName": userProfile.user_data.first_name,
                    "userId": userProfile.user_data.user_id,
                    "userPhone": userProfile.user_data.phone_number,
                    "platform": "website",
                  };
                  branch.logEvent(d.event, custom_data, function (err) {
                    console.log(err);
                  });
                  let response1 = await callApi(
                    "/event_hit_success",
                    "POST",
                    {
                      product_type: d.product_type,
                      type: d.tag,
                    },
                    phone,
                    accessToken
                  );
                }
              });
            }
          }
        } catch (err) {
        }
      }
    } catch (error) {
    }
  }

  checkBranchData()
  return ""
}

export default useTriggerBranchEvent;
