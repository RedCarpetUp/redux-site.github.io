import Axios from "axios";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
import Text from "common/components/Text";
// import {Label} from 'semantic-ui-react'
import Container from "common/components/UI/Container";
import React, { useState } from "react";
import "react-phone-number-input/style.css";

import {
  DonateButton,
  DonationForm,
} from "../../../pages/login/login_section.style";
import CONFIG from "common/utils/config";
import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";
//import { ContentWrapper } from "public/styles/charity.style";
const Form = ({ row, col, formTitle }) => {
  const notify = useNotification();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [college, setCollege] = useState("");
  const [screen, setScreen] = useState(true);
  const [otp, setOtp] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    callApi(
      "/app_number",
      "GET",
      {
        mobile: phone,
        name: name,
        email: email,
      },
      phone
    )
      .then((response) => {
        // console.log(response);
        if (response.result === "success") {
          notify({ message: "OTP sent sucessfully!", type: "success" });
          setScreen(false);
        }
      })
      .catch(() => {
        notify({
          message: "Some error occurred, Try Again Later",
          type: "error",
        });
      });
  };

  const submitOtp = (e) => {
    e.preventDefault();
    callApi("/app_number_verify", "GET", {
      code: otp,
      mobile: phone,
    }).then((response) => {
      if (response !== "Code") {
        var fields = {
          subject: "Campus Ambassador Form",
          type: "Campus Ambassador Form",
          email: email,
          phone: phone,
          name: name,
          description:
            "Name :" +
            name +
            "<br>" +
            "Email :" +
            email +
            "<br>" +
            "College Name:" +
            college_name +
            "<br>" +
            "Mobile Number:" +
            phone +
            "<br>" +
            "City :" +
            city,
          status: 2,
          priority: 3,
          tags: [city],
        };
        Axios.post(CONFIG.FRESHDESK_URL, fields, {
          headers: {
            "Content-Type": "application/json",
            Authorization: btoa(CONFIG.FRESHDESK_API_KEY + ":x"),
          },
        })
          .then((response) => {
            if (response.data) {
              this.setState({
                token: response,
                ub: true,
                ab: true,
              });
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
      if (response === "Code") {
        alert("Incorrect OTP Entered");
      }
    });
    console.log(otp);
  };

  return (
    <section
      className="section"
      style={{
        backgroundImage:
          "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)",
        padding: "5rem 0",
      }}
    >
      <Container>
        <Box className={`row`} {...row}>
          <Box className={`col ma formContainer`} {...col}>
            <div
              className="section-dialog bg-gray shadow-8"
              style={{ background: "#fafbfb", borderRadius: "15px" }}
            >
              <div>
                <center>
                  <Heading
                    as="h1"
                    content="Campus Ambassador Form"
                    style={{ paddingTop: "25px", color: "darkgreen" }}
                  />
                </center>
                <Container>
                  <Box className="row">
                    <Box className="col">
                      {screen ? (
                        <DonationForm onSubmit={(e) => submitForm(e)}>
                          <Text content="Mobile Number:" />
                          <Input
                            inputType="number"
                            placeholder="715498XXXX"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e);
                            }}
                            aria-label="Mobile Number"
                          />
                          <br />
                          <Text content="Full Name:" />
                          <Input
                            inputType="text"
                            value={name}
                            placeholder="Joe San"
                            onChange={(e) => {
                              setName(e);
                            }}
                            aria-label="Full Name"
                          />
                          <br />
                          <Text content="Email Id:" />
                          <Input
                            inputType="email"
                            value={email}
                            placeholder="joe@xyz.com"
                            onChange={(e) => {
                              setEmail(e);
                            }}
                            aria-label="Email"
                          />
                          <br />
                          <Text content="College Name:" />
                          <Input
                            inputType="text"
                            value={college}
                            placeholder="XYZ Institue"
                            onChange={(e) => {
                              setCollege(e);
                            }}
                            aria-label="College Name"
                          />
                          <br />
                          <Text content="City:" />
                          <Input
                            inputType="text"
                            value={city}
                            placeholder="New Delhi"
                            onChange={(e) => {
                              setCity(e);
                            }}
                            aria-label="City"
                          />
                          <DonateButton type="submit">Next </DonateButton>
                        </DonationForm>
                      ) : (
                        <DonationForm onSubmit={(e) => submitOtp(e)}>
                          <Heading
                            as="h3"
                            content={`Otp has been sent to phone Number +91-${phone}`}
                          />
                          <Text content="OTP:" />
                          <Input
                            inputType="number"
                            placeholder="XXXXXX"
                            value={otp}
                            onChange={(e) => {
                              setOtp(e);
                            }}
                            aria-label="OTP"
                          />
                          <DonateButton type="submit">Continue </DonateButton>
                        </DonationForm>
                      )}
                    </Box>
                  </Box>
                </Container>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

Form.defaultProps = {
  row: {
    display: "flex",
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    alignItems: "center",
  },
  col: {
    pr: "15px",
    pl: "15px",
    flex: "0 0 80%",
    width: [1, 1, "80%", "70%"],
    margin: "0 auto",
  },
};

export default Form;
