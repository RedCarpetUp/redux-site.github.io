import React, { Fragment, useEffect, useState } from "react";
import Input from "common/components/Input";

import Button from "common/components/Button";
import UploadPdfWrapper from "./style";
import { callApi } from "common/utils/loginMiddleware";
import axios from "axios";
import { useNotification } from "common/hooks/useNotification";

const UploadPdf = ({
  selectedProduct,
  closeUpload,
  phone,
  accessToken,
  backend_name,
  userProductId,
  movePdfForward,
}) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [newBankName, setNewBankName] = useState("");
  const [bankNames, setBankNames] = useState([]);
  const notify = useNotification();
  useEffect(() => {
    getBankName();
  }, []);
  const getBankName = async () => {
    try {
      let response = await callApi(
        "/get_avaialble_banks_for_statment",
        "GET",
        {},
        phone,
        accessToken
      );
      let result = Object.entries(response);
      setBankNames(result);
    } catch (error) {
      console.error(error);
    }
  };
  const onFileChange = (event) => {
    if (event.target) {
      if (event.target.files[0].type != "application/pdf") {
        notify({
          message: "Please Select a PDF file to Proceed",
          type: "error",
        });
        setSelectedFile("");
      } else {
        setSelectedFile(event.target.files[0]);
      }
    }
  };
  const displayBankName = () => {
    const listItems = bankNames.map((name) => (
      <option value={name[1]}>{name[0]}</option>
    ));
    return (
      <UploadPdfWrapper>
        <select
          name="bank_name"
          placeholder="Select Bank Name"
          value={newBankName}
          onChange={(e) => setNewBankName(e.target.value)}
          className="form-control-select"
          style={{ width: "50%", marginBottom: "40px" }}
        >
          <option value="" selected disabled hidden>
            Select Bank Name
          </option>
          {listItems}
          <option value="999">Other</option>
        </select>
      </UploadPdfWrapper>
    );
  };
  const uploadPdf = async () => {
    if (newBankName === "") {
      notify({ message: "Please Select a Bank Name", type: "error" });
      return;
    } else if (!selectedFile) {
      notify({ message: "Please Select a PDF file to Proceed", type: "error" });
      return;
    }
    try {
      setIsLoading(true);

      let response1 = await callApi(
        "/photoupload",
        "GET",
        {},
        phone,
        accessToken
      );
      setUploadUrl(response1.image_url);
      const image_url = response1.image_url;
      const url = response1.post_params.action;
      const fields = response1.post_params.fields;
      let fd = new FormData();
      for (const field of fields) {
        fd.append(field.name, field.value);
      }
      fd.append("file", selectedFile);
      let response2 = await axios.post(url, fd);
      if (image_url && (response2.status == 204 || response2.status == 200)) {
        let product;
        if (selectedProduct == "redcarpet_xiaomi_customer")
          product = "redcarpet_xiaomi_customer";
        try {
          if (selectedProduct == "redcarpet_xiaomi_customer") {
            let response3 = await callApi(
              `/set_user_profile_ids_${product}`,
              "POST",
              {
                type: backend_name,
                deviceId: "",
                imeiNo: "",
                product_type: selectedProduct,
                confirm_upload: false,
                url: image_url,
                password: password,
                user_product_id: userProductId,
                bank_id: ["999", "Other"].includes(newBankName)
                  ? ""
                  : newBankName,
              },
              phone,
              accessToken
            );
            notify({
              message: "Document Uploaded Successfully",
              type: "success",
            });
          } else {
            let response3 = await callApi(
              "/set_user_profile_ids",
              "POST",
              // [{ confirm_upload: true, product_type: "term_loan_reset" }],
              [
                {
                  type: backend_name,
                  deviceId: "",
                  imeiNo: "",
                  product_type: selectedProduct,
                  confirm_upload: false,
                  url: image_url,
                  password: password,
                },
              ],
              phone,
              accessToken
            );
            notify({
              message: "Document Uploaded Successfully",
              type: "success",
            });
          }

          let response4 = await callApi(
            "/get_user_documents",
            "GET",
            {
              user_product_id: userProductId,
            },
            phone,
            accessToken
          );
          if (response4.result == "success") {
            response4.documents.map((document) => {
              if (document.document_type === backend_name) {
                closeUpload(document.verification_status);
                movePdfForward();
              }
            });
          }
        } catch (error) {
          notify({
            message: "Some Error Occurred, try again later.",
            type: "error",
          });
        }
      } else {
        notify({
          message: "Some Error Occurred, try again later.",
          type: "error",
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notify({ message: error.message, type: "error" });
    }
  };
  return (
    <Fragment>
      {isLoading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <UploadPdfWrapper>
          <label style={{ textAlign: "center", marginTop: "20px" }}>
            Select Bank Name and upload personal savings account bank statement
            of 3 months (account should be in the applicant's name):
          </label>
          {displayBankName()}
          <label class="file">
            <input
              type="file"
              onChange={(event) => {
                onFileChange(event);
              }}
              className="pass"
              accept=".pdf"
              required
            />
            <span class="file-custom"></span>
          </label>
          <div className="row-80">
            <p className="col90">
              Note: You can only upload pdf files and if your file is password
              encrypted please remember to type it in the space below and
              upload.
            </p>
          </div>

          <Input
            type="text"
            label="PDF Password"
            placeholder="PDF Password"
            className="pass"
            value={password}
            onChange={(event) => {
              setPassword(event);
            }}
          />
          <Button title="Upload" className="btn" onClick={uploadPdf}></Button>
        </UploadPdfWrapper>
      )}
    </Fragment>
  );
};

export default UploadPdf;
