import React, { Fragment, useState, useEffect, useRef } from "react";
import DocumentListWrapper from "./style";
import TakePhoto from "../TakePhoto";
import Icon from "react-icons-kit";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import { arrowRight } from "react-icons-kit/fa/arrowRight";
import { arrowDown } from "react-icons-kit/fa/arrowDown";
import { xCircle } from "react-icons-kit/feather/xCircle";
import { iosCheckmark } from "react-icons-kit/ionicons/iosCheckmark";
import { alertCircle } from "react-icons-kit/feather/alertCircle";
import { camera } from "react-icons-kit/feather/camera";

import ImagePreviewAfterUpload from "../ImagePreviewAfterUpload";
import UploadPdf from "../UploadPdf";
import WebcamStreamCapture from "../recordVideo";
import { useNotification } from "common/hooks/useNotification";

const DocumentList = ({
  phone,
  accessToken,
  name,
  backend_name,
  document_sequence,
  updateRequiredDocuments,
  selectedProduct,
  userProductId,
  iterate,
  index,
}) => {
  const [takePhoto, setTakePhoto] = useState(false);
  const [arrow, setArrow] = useState(arrowRight);
  const [statusIcon, setStatusIcon] = useState(camera);
  const [classColor, setClassColor] = useState("pink");
  const [dataUrl, setDataUrl] = useState("");
  const [bankStatementForward, setBankStatementForward] = useState(false);
  const [imagePreviewAfterUpload, setImagePreviewAfterUpload] = useState(false);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [docReject, setDocReject] = useState("");
  const intervalRef = useRef(null);
  const timeOutRef = useRef(null);
  const clearTimer = useRef(null);
  const [isBankStatementUploaded, setIsBankStatementUploaded] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const counterIntervalRef = useRef();
  const [counter15, setCounter15] = useState(15);
  const [showCounter15, setShowCounter15] = useState(false);
  const counter15Interval = useRef();
  const clearCounter15Interval = useRef();
  const notify = useNotification();

  const toggle = () => {
    if (dataUrl) {
      toggleImagePreviewAfterUpload();
    } else {
      toggleCamera();
    }
  };
  const movePdfForward = () => {
    setShowNext(true);
    setShowCounter15(false);
    setCounter15(15);
    getUploadedDocuments({ val: true, setVerified: true });
  };
  const uploaded = () => {
    if (isDocumentUploaded) {
      notify({
        message: "You have already uploaded this document",
        type: "error",
      });
    }
  };
  const toggleCamera = () => {
    if (takePhoto) {
      setTakePhoto(false);
      setArrow(arrowRight);
    } else {
      setTakePhoto(true);
      setArrow(arrowDown);
    }
  };
  const toggleImagePreviewAfterUpload = () => {
    if (imagePreviewAfterUpload) {
      setImagePreviewAfterUpload(false);
      setArrow(arrowRight);
      setTakePhoto(false);
    } else {
      setImagePreviewAfterUpload(true);
      setArrow(arrowDown);
      setTakePhoto(false);
    }
  };
  const closeUpload = (documentStatus) => {
    setArrow(arrowRight);
    setTakePhoto(false);
    setIsBankStatementUploaded(true);
    if (documentStatus == "VERIFIED" || documentStatus == "APPROVED") {
      setStatusIcon(iosCheckmark);
      setClassColor("green");
      setCounter15(15);
      setShowCounter15(false);
      setArrow(arrowRight);
      setTakePhoto(false);
      setImagePreviewAfterUpload(false);
      setIsDocumentUploaded(true);
      updateRequiredDocuments();
      notify({ message: "Document Uploaded Successfully", type: "success" });
    } else if (documentStatus == "PENDING") {
      setStatusIcon(alertCircle);
      setClassColor("yellow");
      updateRequiredDocuments();
    } else {
      setStatusIcon(xCircle);
      setClassColor("red");
      setCounter15(15);
      setShowCounter15(false);
      toggleCamera();
      notify({ message: "Please Upload this Document Again.", type: "error" });
    }
  };
  const closeCamera = (documentStatus, dataUri) => {
    if (dataUrl != "") {
      setTakePhoto(false);
    } else {
      setTakePhoto(false);
      setImagePreviewAfterUpload(false);
    }
    setArrow(arrowRight);
    if (documentStatus == "APPROVED") {
      setStatusIcon(iosCheckmark);
      setClassColor("green");
      setCounter15(15);
      setShowCounter15(false);
      clearTimeoutAndInterval();
      setArrow(arrowRight);
      setTakePhoto(false);
      setImagePreviewAfterUpload(false);
      setIsDocumentUploaded(true);
      setShowNext(true);
      updateRequiredDocuments();
    } else if (documentStatus == "PENDING") {
      setStatusIcon(alertCircle);
      setClassColor("yellow");
      setDataUrl(dataUri);
      updateRequiredDocuments();
      if (backend_name === "KYC Video") {
        clearTimeoutAndInterval();
        setArrow(arrowRight);
        setStatusIcon(iosCheckmark);
        setClassColor("green");
        setCounter15(15);
        setShowCounter15(false);
        setImagePreviewAfterUpload(false);
        setTakePhoto(false);
        setIsDocumentUploaded(true);
        setShowNext(true);
      }
    } else {
      clearTimeoutAndInterval();
      setStatusIcon(xCircle);
      setClassColor("red");
      setCounter15(15);
      setShowCounter15(false);
      toggleCamera();
      notify({ message: "Please Upload this Document Again.", type: "error" });
    }
  };

  const clearTimeoutAndInterval = () => {
    clearInterval(counter15Interval.current);
    clearTimeout(clearCounter15Interval.current);
    clearTimeout(clearTimer.current);
    clearInterval(intervalRef.current);
    clearTimeout(timeOutRef.current);
    clearInterval(counterIntervalRef.current);
  };
  const getUploadedDocuments = async ({
    val,
    setVerified,
    firstCall,
    checkPending,
  }) => {
    try {
      let response = await callApi(
        "/get_user_documents",
        "GET",
        {
          user_product_id: userProductId,
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        const targetDocument = response.documents.find(
          (document) =>
            document.document_type == backend_name &&
            document_sequence == document.sequence &&
            document.user_product_id &&
            document.user_product_id === userProductId
        );
        if (targetDocument) {
          if (
            targetDocument.document_type === "Bank Statement" &&
            targetDocument.verification_status === "PENDING" &&
            val
          ) {
            if (setVerified) {
              setStatusIcon(iosCheckmark);
              setClassColor("green");
            } else {
              setStatusIcon(alertCircle);
              setClassColor("yellow");
            }
            setShowNext(true);
            setCounter15(15);
            setShowCounter15(false);
            clearTimeoutAndInterval();
            setArrow(arrowRight);
            setImagePreviewAfterUpload(false);
            setTakePhoto(false);
            setIsBankStatementUploaded(false);
            setBankStatementForward(false);
            setIsDocumentUploaded(true);
          } else if (
            targetDocument.document_type === "KYC Video" &&
            (targetDocument.verification_status === "PENDING" ||
              targetDocument.verification_status === "REJECTED")
          ) {
            clearTimeoutAndInterval();
            setIsDocumentUploaded(true);
            setArrow(arrowRight);
            setImagePreviewAfterUpload(false);
            setTakePhoto(false);
            setStatusIcon(iosCheckmark);
            setClassColor("green");
            setCounter15(15);
            setShowCounter15(false);
            setShowNext(true);
          } else if (
            targetDocument.verification_status === "PENDING" &&
            !firstCall &&
            !checkPending
          ) {
            setStatusIcon(alertCircle);
            setClassColor("yellow");
          } else if (
            targetDocument.verification_status === "PENDING" &&
            firstCall
          ) {
            setCounter15(15);
            clearTimeoutAndInterval();
            setShowNext(false);
            setClassColor("red");
            setShowCounter15(false);
            setIsBankStatementUploaded(false);
            setStatusIcon(xCircle);
            setDataUrl("");
            setDocReject(targetDocument.reject_reason);
            setIsDocumentUploaded(false);
          } else if (
            targetDocument.verification_status === "PENDING" &&
            checkPending
          ) {
            setCounter15(15);
            clearTimeoutAndInterval();
            setShowNext(false);
            setClassColor("red");
            setShowCounter15(false);
            setIsBankStatementUploaded(false);
            setStatusIcon(xCircle);
            setDataUrl("");
            setDocReject(targetDocument.reject_reason);
            setIsDocumentUploaded(false);
          } else if (targetDocument.verification_status === "APPROVED") {
            clearTimeoutAndInterval();
            setCounter15(15);
            setShowCounter15(false);
            setArrow(arrowRight);
            setTakePhoto(false);
            setImagePreviewAfterUpload(false);
            setIsDocumentUploaded(true);
            setStatusIcon(iosCheckmark);
            setClassColor("green");
            setShowNext(true);
          } else if (targetDocument.verification_status === "REJECTED") {
            setCounter15(15);
            setShowCounter15(false);
            clearTimeoutAndInterval();
            setShowNext(false);
            setClassColor("red");
            setIsBankStatementUploaded(false);
            setStatusIcon(xCircle);
            setDataUrl("");
            setDocReject(targetDocument.reject_reason);
            setIsDocumentUploaded(false);
          }
        } else {
          clearTimeoutAndInterval();
          setIsDocumentUploaded(false);
          setStatusIcon(camera);
          setArrow(arrowRight);
          setImagePreviewAfterUpload(false);
          setClassColor("pink");
          setDataUrl("");
          setTakePhoto(false);
          setShowNext(false);
          setCounter15(15);
          setShowCounter15(false);
        }
      }
    } catch (error) {
      notify({
        message: "Unable to fetch Documents. Try Again Later.",
        type: "error",
      });
    }
  };
  const refresh = (backendName) => {
    if (["PAN", "Aadhar", "Selfie"].includes(backendName)) {
      setShowCounter15(true);
      setShowNext(true);
      counter15Interval.current = setInterval(() => {
        setCounter15((e) => e - 1);
      }, 1000);
      clearCounter15Interval.current = setTimeout(() => {
        clearInterval(counter15Interval.current);
        setShowCounter15(false);
        setCounter15(15);
        getUploadedDocuments({ checkPending: true });
        clearInterval(intervalRef.current);
      }, 15000);
    }
    intervalRef.current = setInterval(() => {
      getUploadedDocuments({});
    }, 2000);
  };
  useEffect(() => {
    getUploadedDocuments({ val: true, firstCall: true });
  }, [index]);

  const moveToNext = () => {
    clearTimeoutAndInterval();
    setShowNext(false);
    setShowCounter15(false);
    setCounter15(15);
    iterate();
  };
  return (
    <Fragment>
      <DocumentListWrapper>
        <div
          className={"card"}
          style={{ cursor: "pointer" }}
          onClick={
            !isBankStatementUploaded && (isDocumentUploaded ? uploaded : toggle)
          }
        >
          <div className="row">
            <p className="col50-left tooltip">
              <Icon icon={statusIcon} className={classColor} size={40} />
              <p>{name}</p>
              {classColor == "yellow" ? (
                <h6 style={{ margin: "0%" }}>Pending</h6>
              ) : classColor == "red" ? (
                <h6 style={{ margin: "0%" }}>
                  Your document has been rejected
                  {docReject ? ` ${docReject}. ` : `. `}Click here to upload it
                  again.
                </h6>
              ) : classColor == "green" ? (
                <h6 style={{ margin: "0%" }}>Approved</h6>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
        {imagePreviewAfterUpload ? (
          <ImagePreviewAfterUpload
            dataUri={dataUrl}
            isFullscreen={false}
            refresh={refresh}
          />
        ) : takePhoto ? (
          backend_name == "Bank Statement" ? (
            <UploadPdf
              phone={phone}
              accessToken={accessToken}
              name={name}
              backend_name={backend_name}
              closeUpload={closeUpload}
              selectedProduct={selectedProduct}
              userProductId={userProductId}
              movePdfForward={movePdfForward}
            />
          ) : backend_name === "PAN" ||
            backend_name === "Aadhar" ||
            backend_name === "Selfie" ? (
            <TakePhoto
              phone={phone}
              accessToken={accessToken}
              document_sequence={document_sequence}
              name={name}
              backend_name={backend_name}
              closeCamera={closeCamera}
              selectedProduct={selectedProduct}
              userProductId={userProductId}
              refresh={refresh}
            />
          ) : (
            <WebcamStreamCapture
              phone={phone}
              closeCamera={closeCamera}
              accessToken={accessToken}
              backend_name={backend_name}
              document_sequence={document_sequence}
              name={name}
              updateRequiredDocuments={updateRequiredDocuments}
              selectedProduct={selectedProduct}
              userProductId={userProductId}
              refresh={refresh}
            />
          )
        ) : (
          ""
        )}
        {showNext && (
          <Button
            className={showCounter15 ? "btn-loading" : "btn"}
            title={showCounter15 ? `Next ${counter15}` : "Next"}
            onClick={moveToNext}
          />
        )}
      </DocumentListWrapper>
    </Fragment>
  );
};

export default DocumentList;
