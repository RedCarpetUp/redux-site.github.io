import React, { Fragment, useState } from "react";
import DocumentList from "../DocumentList";
import DocumentsWrapper from "./style";
import { alertCircle } from "react-icons-kit/feather/alertCircle";
import Icon from "react-icons-kit";
import { arrowRight } from "react-icons-kit/fa/arrowRight";
import { arrowDown } from "react-icons-kit/fa/arrowDown";

const Documents = ({
  phone,
  accessToken,
  docs,
  description,
  requiredDocs,
  updateRequiredDocuments,
  selectedProduct,
  userProductId,
  videoApproval,
}) => {
  const [viewDocuments, setViewDocuments] = useState(false);
  const [arrow, setArrow] = useState(arrowRight);
  const toggle = () => {
    if (viewDocuments) {
      setViewDocuments(false);
      setArrow(arrowRight);
    } else {
      setViewDocuments(true);
      setArrow(arrowDown);
    }
  };
  return (
    <Fragment>
      <div>
        <DocumentsWrapper>
          <div className="row">
            <div className="doc-card" onClick={toggle}>
              <div className="row">
                <div className="col50-left">
                  <h1 className="card-description">{description}</h1>
                  <p className="mand-doc">
                    (Mandatory Documents: {requiredDocs})
                  </p>
                </div>

                <p className="col50">
                  <Icon icon={arrow} size={25} />
                </p>
              </div>
            </div>
            <div className="row-80">
              <div className="col10">
                <Icon icon={alertCircle} />
              </div>
              <div className="col90">
                Make sure your photo/video is not blurry, it is clicked in good
                light and preferably is as clear as possible as it will be used
                for verification purposes.
              </div>
            </div>
          </div>
          {viewDocuments
            ? docs.map((doc) => {
                return (
                  <Fragment>
                    {doc.pages == "2" ? (
                      <Fragment>
                        <DocumentList
                          phone={phone}
                          accessToken={accessToken}
                          backend_name={doc.backend_name}
                          document_sequence="1"
                          name={doc.name + " front"}
                          updateRequiredDocuments={updateRequiredDocuments}
                          selectedProduct={selectedProduct}
                          userProductId={userProductId}
                        />
                        <DocumentList
                          phone={phone}
                          accessToken={accessToken}
                          backend_name={doc.backend_name}
                          document_sequence="2"
                          name={doc.name + " back"}
                          updateRequiredDocuments={updateRequiredDocuments}
                          selectedProduct={selectedProduct}
                          userProductId={userProductId}
                        />
                      </Fragment>
                    ) : (
                      <DocumentList
                        phone={phone}
                        accessToken={accessToken}
                        backend_name={doc.backend_name}
                        name={doc.name}
                        document_sequence="1"
                        updateRequiredDocuments={updateRequiredDocuments}
                        selectedProduct={selectedProduct}
                        userProductId={userProductId}
                        videoApproval={videoApproval}
                      />
                    )}
                  </Fragment>
                );
              })
            : ""}
        </DocumentsWrapper>
      </div>
    </Fragment>
  );
};

export default Documents;
