import Button from "common/components/Button";

import React, { useState, useEffect } from "react";
import { callApi } from "common/utils/loginMiddleware";
import axios from "axios";
import { useNotification } from "common/hooks/useNotification";

const UserDocuments = ({ phone, accessToken, userProductId }) => {
  const [isView, setIsView] = useState(false);
  const [availDoc, setIsAvailDoc] = useState(false);
  const [docs, setDocs] = useState();
  const notify = useNotification();

  const downloadDocument = (url, doc_type) => {
    axios({
      method: "GET",
      url: url,
      responseType: "blob",
    })
      .then((response) => {
        console.log(response.data);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        let fileName = "";
        if (doc_type == "Card Statement") {
          fileName = "file.pdf";
        } else if (
          response.data.type == "image/png" ||
          response.data.type == "image/jpg" ||
          response.data.type == "image/jpeg"
        ) {
          fileName = "file.jpg";
        } else {
          fileName = "file.pdf";
        }
        link.setAttribute("download", fileName); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        notify({ message: error.message, type: "error" });
      });
  };

  const userDocument = async () => {
    let resp1 = await callApi(
      "/get_user_documents",
      "GET",
      {
        user_product_id: userProductId,
      },
      phone,
      accessToken
    );
    if (
      resp1.result == "success" &&
      resp1.documents &&
      resp1.documents.length > 0
    ) {
      setIsAvailDoc(true);
      setDocs(resp1.documents);
    }
  };

  useEffect(() => {
    userDocument();
  }, []);

  const toggle = () => {
    setIsView(!isView);
  };

  const renderDetails = () => {
    if (isView && availDoc) {
      return docs.map((doc, index) => {
        if (doc.verification_status == "APPROVED") {
          return (
            <tr key={index}>
              <td>{doc.document_type}</td>
              <td>
                <Button
                  title="Download"
                  style={{
                    marginTop: "5%",
                    marginLeft: "23%",
                    height: "15px",
                    width: "90%",
                  }}
                  className="btn"
                  onClick={(e) =>
                    downloadDocument(doc.image_url, doc.document_type)
                  }
                ></Button>
              </td>
            </tr>
          );
        }
      });
    }
  };

  return (
    <div className={"pcardWrapper"}>
      <div className={"card"}>
        <div className={"cardHeader"}>
          <div className="row">
            <div className={"col50 smartCardHeader"}>
              <img
                src="/images/redcarpet-logo.png"
                height="35px"
                width="35px"
                alt="RC"
              />
              <h4 style={{ marginLeft: "1rem" }}>Your Documents</h4>
            </div>
          </div>
        </div>

        <div
          className={"cardBody"}
          style={{ paddingBottom: "1rem", paddingTop: "1rem" }}
        >
          <div>
            <p>Click on button to view your documents</p>
            <div>
              <Button
                title="View Documents"
                style={{ marginTop: "15px" }}
                className="btn"
                onClick={toggle}
              />
            </div>
          </div>
          <div>{renderDetails()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDocuments;
