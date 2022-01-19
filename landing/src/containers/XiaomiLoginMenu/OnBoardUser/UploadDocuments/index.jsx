import React, { useState, useEffect, Fragment, useRef } from "react";
import { callApi } from "common/utils/loginMiddleware";

import Button from "common/components/Button";
import Wrapper, { ProgressBarWrapper } from "./style";
import DocumentList from "../DocumentList";
import CardIssuedXiaomi from "../../Xiaomi/CardIssued";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useNotification } from "common/hooks/useNotification";

const UploadDocuments = ({
  phone,
  accessToken,
  redirectUser,
  selectedProduct,
  getBacktoProduct,
  moveUser,
  dataBranch,
  userProfile,
}) => {
  let total_docs_uploaded = 0;
  const [cardTrackingXiaomi, setCardTrackingXiaomi] = useState(false);
  const [userProductId, setUserProductId] = useState("");
  const [documents, setDocuments] = useState([]);
  const [index, setIndex] = useState(0);
  const notify = useNotification();
  const [loading, setLoading] = useState(false);
  const updateRequiredDocuments = () => {
    total_docs_uploaded = total_docs_uploaded + 1;
  };

  const getUploadedDocuments = async (documents, id) => {
    let approvedDocsCount = 0;
    const allApprovedDocs = [];
    const documentNames = [];
    const documentSequence = [];
    documents.map((document) => {
      documentNames.push(document.name);
    });
    try {
      let response = await callApi(
        "/get_user_documents",
        "GET",
        {
          user_product_id: id,
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        response.documents.map((document) => {
          if (document.verification_status == "APPROVED") {
            if (document.document_type === "Aadhar") {
              allApprovedDocs.push(
                document.sequence === 1 ? "Aadhaar front" : "Aadhaar back"
              );
            } else {
              allApprovedDocs.push(document.document_type);
            }
          } else if (
            document.document_type === "Bank Statement" &&
            document.verification_status === "PENDING"
          ) {
            allApprovedDocs.push(document.document_type);
          } else if (
            document.document_type === "KYC Video" &&
            (document.verification_status === "PENDING" ||
              document.verification_status === "REJECTED")
          ) {
            allApprovedDocs.push(document.document_type);
          }
        });

        allApprovedDocs.map((document) => {
          if (documentNames.includes(document)) {
            approvedDocsCount = approvedDocsCount + 1;
            documentSequence.push(
              documents.find((doc) => doc.name === document)
            );
          }
        });
        documents.map((document) => {
          if (!documentSequence.includes(document)) {
            documentSequence.push(document);
          }
        });

        setDocuments(documentSequence);
        if (approvedDocsCount === documentNames.length) showProducts();
        else setIndex(approvedDocsCount);
      } else {
        notify({
          message: "Unable to fetch Documents. Try Again Later.",
          type: "error",
        });
      }
    } catch (error) {
      notify({
        message: "Unable to fetch Documents. Try Again Later.",
        type: "error",
      });
    }
  };

  const showProducts = async () => {
    let product;
    if (selectedProduct == "redcarpet_xiaomi_customer")
      product = "redcarpet_xiaomi_customer";
    try {
      if (selectedProduct == "redcarpet_xiaomi_customer") {
        let response3 = await callApi(
          `/set_user_profile_ids_${product}`,
          "POST",
          {
            confirm_upload: true,
            product_type: selectedProduct,
            user_product_id: userProductId,
          },
          phone,
          accessToken
        );
        if (response3.result == "error") {
          if (
            response3.message === "verifying your docs, please wait a moment"
          ) {
            notify({ message: response3.message, type: "error" });
          } else if (response3.message === "Doc Upload Failed") {
            notify({
              message: "Please re-upload rejected docs",
              type: "error",
            });
          } else {
            let arrOfMessage = response3.message
              .split(/[:,]/)
              .slice(1)
              .filter((e) => !["KYC Video"].includes(e.trim()));
            if (arrOfMessage[0]) {
              notify({
                message: `${arrOfMessage[0]} needs to be uploaded.`,
                type: "error",
              });
            }
          }
        }
      } else {
        let response3 = await callApi(
          "/set_user_profile_ids",
          "POST",
          [{ confirm_upload: true, product_type: selectedProduct }],
          phone,
          accessToken
        );
      }
    } catch (error) {
      notify({
        message: "Unable to fetch Documents. Try Again Later.",
        type: "error",
      });
    }
    try {
      let response = await callApi(
        "/user_products_and_states/" + selectedProduct,
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        response.data.map(async (product) => {
          if (
            product.current_task != null &&
            product.product_type == selectedProduct
          ) {
            if (
              product.current_task == "doc_upload" &&
              selectedProduct !== "redcarpet_xiaomi_customer"
            ) {
              notify({ message: "Please Upload All Documents", type: "error" });
            }
            if (selectedProduct == "redcarpet_xiaomi_customer") {
              if (
                [
                  "merchant_eval",
                  "disburse_amount",
                  "loan_agreement",
                  "awaiting_merchant",
                  "card_issue",
                  "card_activate",
                  "card_load",
                  "rejects",
                ].includes(product.current_task)
              ) {
                setCardTrackingXiaomi(true);
              }
            } else {
              notify({ message: "Please Upload All Documents", type: "error" });
            }
          }
        });
      }
    } catch {
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    }
  };

  const getUserProductId = async () => {
    try {
      let response = await callApi(
        "/user_products_and_states/" + selectedProduct,
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        response.data.map(async (product) => {
          if (
            product.current_task != null &&
            product.product_type == selectedProduct
          ) {
            setUserProductId(product.user_product_id);
            getDocuments(product.user_product_id);
          }
        });
      }
    } catch (error) {
      notify({
        message: "Unable to fetch Documents. Try Again Later.",
        type: "error",
      });
    }
  };
  const iterate = () => {
    if (index === documents.length - 1) {
      showProducts();
    } else {
      setIndex(index + 1);
    }
  };
  const getDocuments = async (id) => {
    let arr = [];
    let count;
    try {
      let response = await callApi(
        "/docs_for_upload",
        "GET",
        {
          docs_for: selectedProduct,
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        response.docs.map((value, idx) => {
          value.docs.map((document) => {
            if (document.backend_name === "Aadhar" && document.pages === 2) {
              arr.push(
                Object.assign(
                  { ...document },
                  { name: "Aadhaar front", pages: 1 }
                )
              );
              arr.push(
                Object.assign(
                  { ...document },
                  { name: "Aadhaar back", pages: 2 }
                )
              );
            } else {
              arr.push(document);
            }
          });
        });
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].backend_name === "Bank Statement") {
            if (i < arr.length - 1) {
              [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
          }
        }
        getUploadedDocuments(arr, id);
        count = response.docs.reduce(function (id, docs) {
          return id + docs.docs_required;
        }, 0);
      }
    } catch (error) {
      notify({
        message: "Unable to fetch Documents. Try Again Later.",
        type: "error",
      });
    }
  };
  useEffect(() => {
    getUserProductId();
  }, []);
  return (
    <Fragment>
      {cardTrackingXiaomi ? (
        <CardIssuedXiaomi
          phone={phone}
          accessToken={accessToken}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          redirectUser={redirectUser}
          moveUser={moveUser}
          userProfile={userProfile}
        />
      ) : (
        <div>
          <div className="row-left">
            <div className="col30">
              <hr className="line" />
            </div>
            <div className="col70">
              <h1>Upload Documents</h1>
            </div>
          </div>
          <div>
            <div
              style={{
                width: "75%",
                margin: "0 auto",
                marginBottom: "20px",
              }}
            >
              {documents.length > 1 && (
                <ProgressBarWrapper>
                  <ProgressBar
                    percent={(index / (documents.length - 1)) * 100}
                    filledBackground="#00D88D"
                  >
                    {documents.map((document, idx) => {
                      return (
                        <Step transition="scale">
                          {({ accomplished }) => (
                            <div
                              className={
                                accomplished ? "progressed" : "progress"
                              }
                            >
                              <p>{idx + 1}</p>
                            </div>
                          )}
                        </Step>
                      );
                    })}
                  </ProgressBar>
                </ProgressBarWrapper>
              )}
            </div>
            <Wrapper>
              {documents[index] && (
                <DocumentList
                  phone={phone}
                  accessToken={accessToken}
                  backend_name={documents[index].backend_name}
                  document_sequence={documents[index].pages}
                  name={documents[index].name}
                  updateRequiredDocuments={updateRequiredDocuments}
                  selectedProduct={selectedProduct}
                  userProductId={userProductId}
                  iterate={iterate}
                  index={index}
                />
              )}
            </Wrapper>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UploadDocuments;
