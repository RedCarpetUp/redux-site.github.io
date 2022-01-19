import Webcam from "react-webcam";
import React, { Fragment, useState } from "react";

import { callApi } from "common/utils/loginMiddleware";
import TakeVideoWrapper from "./style";
import Button from "../../../../common/components/Button";
import axios from "axios";
import { PermissionWrapper } from "../TakePhoto/style";
import { useNotification } from "common/hooks/useNotification";

const WebcamStreamCapture = ({
  phone,
  accessToken,
  name,
  backend_name,
  document_sequence,
  selectedProduct,
  userProductId,
  closeCamera,
  refresh,
}) => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [recordingCount, setRecordingCount] = useState(0);
  const [blob, setBlob] = useState([]);
  const [permissionError, setPermissionError] = useState(false);
  const [videoPreview, setVideoPreview] = useState(false);
  const [url, setUrl] = useState([]);
  const [showRecordingButton, setShowRecordingButton] = useState(true);
  const [counter, setCounter] = useState(0);
  const notify = useNotification();
  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: "user",
  };
  let timer; //timer =  setTimeout
  let interval;
  const handleStartCaptureClick = React.useCallback(() => {
    try {
      setRecordingCount(recordingCount + 1);
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
      interval = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);
      timer = setTimeout(() => {
        if (mediaRecorderRef.current.state === "recording") {
          handleStopCaptureClick();
        }
      }, 10000);
    } catch (e) {
      notify({
        message: "Please Give Proper Access To Your Webcam",
        type: "error",
      });
    }
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  const handleStopCaptureClick = React.useCallback(() => {
    try {
      mediaRecorderRef.current.stop();
      setCapturing(false);
      // clear setTimeout and interval from stack memory
      clearTimeout(timer);
      clearInterval(interval);
      setCounter(0);
      setShowRecordingButton(false);
    } catch (e) {
      console.error(e);
    }
  }, [mediaRecorderRef, webcamRef, setCapturing]);
  const streamVideo = React.useCallback(async () => {
    if (mediaRecorderRef.current.state === "inactive") {
      setUrl([]);
      setBlob([]);
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/mp4",
        });
        setBlob(blob);
        setRecordedChunks([]);
        setUrl(URL.createObjectURL(blob));
        setVideoPreview(true);
        setShowRecordingButton(true);
      }
    } else {
      notify({
        message: "Please Stop The Ongoing Recording First",
        type: "error",
      });
    }
  }, [recordedChunks]);
  const createBlob = React.useCallback(async () => {
    uploadVideo(blob);
  });
  const uploadVideo = async (BreathFirstSearch) => {
    try {
      setIsLoading(true);
      let response1 = await callApi(
        "/photoupload?type=mp4",
        "GET",
        {},
        phone,
        accessToken
      );
      const image_url = response1.image_url;
      const url = response1.post_params.action;
      const fields = response1.post_params.fields;
      let fd = new FormData();
      var vd = new File([BreathFirstSearch], name + ".mp4", {
        type: "application/video",
      });
      for (const field of fields) {
        fd.append(field.name, field.value);
      }
      fd.append("file", vd);
      //uploading the video file
      let response2 = await axios.post(url, fd);
      if (image_url && (response2.status === 204 || response2.status === 200)) {
        try {
          let product;
          if (selectedProduct == "rebel") product = "rebel";
          else if (selectedProduct == "redcarpet_gimbooks")
            product = "redcarpet_gimbooks";
          await callApi(
            `/set_user_profile_ids_${product}`,
            "POST",
            {
              type: backend_name,
              deviceId: "",
              imeiNo: "",
              document_sequence: document_sequence,
              product_type: selectedProduct,
              confirm_upload: false,
              url: image_url,
              user_product_id: userProductId,
            },
            phone,
            accessToken
          );
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
              if (document.document_type == backend_name) {
                closeCamera(document.verification_status);
                refresh();
              }
            });
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        notify({
          message: "Unable To Upload The Video.Please Try Again",
          type: "error",
        });
      }
      setUrl([]);
      setVideoPreview(false);
      setIsLoading(false);
    } catch (err) {
      notify({
        message: "Something Went Wrong.Please Try Again",
        type: "error",
      });
      setIsLoading(false);
      console.error(err);
    }
  };
  const givePermission = async () => {
    var promise = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    if (promise.id) {
      setPermissionError(false);
    }
  };
  const handleError = () => {
    setPermissionError(true);
  };
  const webCamRecordingHandle = () => {
    return (
      <>
        <div className="video-container">
          <Webcam
            className="video"
            audio={true}
            videoConstraints={videoConstraints}
            onUserMediaError={handleError}
            ref={webcamRef}
          />
          <div className="child-container">
            {capturing ? (
              <Button
                className="btn"
                title="Stop Recording"
                onClick={handleStopCaptureClick}
              />
            ) : (
              showRecordingButton && (
                <Button
                  className="btn"
                  title={
                    recordingCount > 0 ? "Record Again" : "Start Recording"
                  }
                  onClick={handleStartCaptureClick}
                />
              )
            )}
            {recordedChunks.length > 0 && (
              <Button
                className="btn"
                title="Watch Preview"
                onClick={streamVideo}
              />
            )}
          </div>
          <h5 style={{ fontSize: "16px" }}>
            Blink your eyes multiple times and please say
            <span style={{ color: "#EF5350", fontWeight: "bold" }}>
              "My name is xxxx-yyyy and I'm applying for a Redcarpet's card"
            </span>
            To get the approval
          </h5>
        </div>
      </>
    );
  };
  return permissionError ? (
    <PermissionWrapper>
      <Fragment>
        <div className="row">
          <div className="col90">
            <h1>
              You have blocked camera permissions, Please give camera access in
              order to continue.
            </h1>
            <p>
              Try clicking on the button below, if that dosen't works follow the
              steps given in the image below.
            </p>
          </div>
        </div>
        <div className="row">
          <img src="/images/login/permission_steps.png" />
          <Button
            title="Give Permission"
            className="btn"
            onClick={givePermission}
          />
        </div>
      </Fragment>
    </PermissionWrapper>
  ) : (
    <TakeVideoWrapper>
      {isLoading ? (
        <div className="lds-dual-ring"></div>
      ) : videoPreview ? (
        <div style={{ marginTop: "10px" }}>
          <video
            width="650"
            style={{ borderRadius: "15px" }}
            src={url}
            loop
            controls
            className="video-player"
            autoPlay={true}
          />
          <Button title="Upload" className="btn" onClick={createBlob} />
          <Button
            title="Cancel"
            className="btn"
            onClick={() => {
              setUrl([]);
              setVideoPreview(false);
            }}
          />
        </div>
      ) : (
        <div>
          {counter > 0 && <div className="counter">{counter}</div>}
          <div style={{ margin: "10px" }}>{webCamRecordingHandle()}</div>
        </div>
      )}
    </TakeVideoWrapper>
  );
};

export default WebcamStreamCapture;
