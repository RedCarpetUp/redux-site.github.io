import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
import Text from "common/components/Text";
// import {Label} from 'semantic-ui-react'
import Container from "common/components/UI/Container";
import { callApi } from "common/utils/loginMiddleware";
import React, { useState } from "react";
import "react-phone-number-input/style.css";

import {
  DonateButton,
  DonationForm,
} from "../../../pages/login/login_section.style";
import { useNotification } from "common/hooks/useNotification";

const Form = ({ row, col, formTitle }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const notify = useNotification();

  const submitForm = (e) => {
    e.preventDefault();
    try {
      if (
        phone == "" ||
        name == "" ||
        email == "" ||
        city == "" ||
        company == "" ||
        desc == "" ||
        url == ""
      ) {
        notify({ message: "Please Fill All fields", type: "error" });
        return;
      }
      callApi("/sdk_enquiry", "POST", {
        mobile: phone,
        full_name: name,
        email_id: email,
        city: city,
        company_name: company,
        comments: desc,
        url: url,
      })
        .then((response) => {
          console.log(response);
          if (response.result === "success") {
            notify({ message: response.message, type: "success" });
          }
          setCity("");
          setCompany("");
          setName("");
          setPhone("");
          setEmail("");
          setDesc("");
          setUrl("");
          console.log(desc);
        })
        .catch(() => {
          notify({
            message: "Some error occurred, Try Again Later",
            type: "error",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      className="section"
      style={{
        backgroundImage:
          "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)",
        padding: "5rem 0",
      }}
      id="demo"
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
                    content="Request a Demo"
                    style={{ paddingTop: "25px", color: "darkgreen" }}
                  />
                </center>
                <Container>
                  <Box className="row">
                    <Box className="col">
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
                          placeholder="joe@redcarpet.com"
                          onChange={(e) => {
                            setEmail(e);
                          }}
                          aria-label="Email"
                        />
                        <br />
                        <Text content="Company Name:" />
                        <Input
                          inputType="text"
                          value={company}
                          placeholder="RedCarpet"
                          onChange={(e) => {
                            setCompany(e);
                          }}
                          aria-label="Company Name"
                        />
                        <br />
                        <Text content="Company Website URL:" />
                        <Input
                          inputType="url"
                          value={url}
                          placeholder="https://redacrpetup.com"
                          onChange={(e) => {
                            setUrl(e);
                          }}
                          aria-label="Company Url"
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
                        <br />
                        <Text content="Comments:" />
                        <Input
                          inputType="textarea"
                          value={desc}
                          placeholder="Comments"
                          onChange={(e) => {
                            setDesc(e);
                          }}
                          aria-label="Comments"
                        />
                        <DonateButton type="submit">Submit </DonateButton>
                      </DonationForm>
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
