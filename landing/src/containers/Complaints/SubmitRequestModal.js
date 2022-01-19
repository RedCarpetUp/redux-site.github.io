import { useReducer } from "react";
import { callApi } from "common/utils/loginMiddleware";
import Modal from "./Modal";
import CryptoJS from 'crypto-js';
import { ModalFormContainer } from "./complaint.style";
import VerifyOtp from "./forms/VerifyOtp";
import CreateRequest from "./forms/CreateRequest";
import { useNotification } from "common/hooks/useNotification";

const initialState = {
    ticket: "",
    email: "",
    file: null,
    phone: "",
    message: "",
    feature: "",
    subject: "",
    loading: false,
    renderOtpForm: false,
    general: ["App Issue", "No Query", "Call request", "NOC Request", "Number change /Mail Id change Request", "Card statement", "Card Activation Issue", "Card block/Unblock", "Card delivery", "Card Lost/chip issue", "Card renew", "Card Reset pin issue", "Bill issue", "Card uses", "CIBIL update issue", "EMI conversion", "EMI extension", "EMI in progress", "Interest related Issue", "Less than 1000 limit", "Limit related issue", "Link expired", "Min & Max amount", "Payment link required", "Payment up", "Other Issue"],
    recovery: ["Rude behaviour of Recovery Agent", "Abusive behaviour of Recovery Agent", "Paid Amount to your Recovery Agent but not updated to my Profile", "Miscommittment for settlement made by Recovery Agent", "Personal Documents Leaked", "Settlement already made on my account but still getting calls", "Other Issue"],
    otp: ""
};

const reducer = (state, action) => {
    switch (action.action) {
        case "write":
            return {
                ...state,
                [action.key]: action.value,
            };
        case "loading":
            return {
                ...state,
                loading: true
            }
        case "loading_completed":
            return {
                ...state,
                loading: false
            };
        case "renderOtpForm":
            return {
                ...state,
                renderOtpForm: true
            };
        case "renderGrievanceForm":
            return {
                ...state,
                renderOtpForm: false
            };
        case "reset":
            return initialState;
        default:
            return state;
    }
};

const SubmitRequestModal = ({ handleClose, isOpen, featureKey }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const notify = useNotification();

    const verifyOtp = async (phone, otp) => {
        const response = await callApi(
            "/user_mobile_verify",
            "GET",
            {
                mobile: phone,
                code: otp,
                resource_id: process.env.RESOURCE_ID,
            },
            phone
        );
        if (response.result === "success")
            notify({ message: "OTP verified!", type: "success" });
        else
            notify({ message: response.message, type: "error" });

        return response;
    };

    const submitRequest = async (accessToken) => {
        const { email, message, subject, file, phone, feature, ticket } = state;
        const isEscalate = featureKey === "escalate";
        const hashes = [];
        if (file)
            for (let _file of file)
                hashes.push(await ComputeMD5Hash(_file));

        const formData = new FormData();
        formData.append("hash", hashes.length ? hashes[0] : "");
        for (let i = 0; i < hashes.length; i++) {
            formData.append("file", file[i]);
        }
        formData.append("phone", phone);
        formData.append("message", message);
        formData.append("level", featureKey);

        if (isEscalate) {
            formData.append("ticket_id", ticket);
        } else {
            formData.append("email", email);
            formData.append("subject", subject);
            formData.append("feature", feature);
        }

        const response = await callApi(
            "/send_complaint_email",
            "POST",
            formData,
            phone,
            accessToken,
            "multipart/form-data"
        );
        if (response.result === "success")
            notify({ message: isEscalate ? "Your request has been escalated!" : "Your request has been created!", type: "success" });
        else
            notify({ message: `${response.message}, Please try again`, type: "error" });

        handleReset();
        handleClose();
    };

    const handleOTPSubmit = async event => {
        event.preventDefault();
        dispatch({ action: "loading" });
        try {
            const response = await verifyOtp(state.phone, state.otp);
            await submitRequest(response.access_token);
        } catch (error) {
            dispatch({ action: "loading_completed" });
            console.log(error);
            notify({ message: error.message, type: "error" });
        }
    };

    const ComputeMD5Hash = (file) => new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(reader.result)).toString(CryptoJS.enc.Hex);
                resolve(hash);
            });
            reader.readAsBinaryString(file);
        } catch (error) {
            reject(error);
        }
    });

    const resendOtp = async e => {
        e.preventDefault();
        dispatch({ action: "loading" });
        try {
            await signUpUser(state.phone);
            dispatch({ action: "loading_completed" });
        } catch (error) {
            dispatch({ action: "loading_completed" });
            console.log(error);
            notify({ message: error.message, type: "error" });
        }
    };

    const signUpUser = async (phone) => {
        try {
            const response = await callApi(
                "/user_mobile_signup",
                "GET",
                {
                    mobile: phone,
                    resource_id: process.env.RESOURCE_ID,
                },
                phone
            );
            if (response.result === "success") {
                dispatch({ action: "renderOtpForm" });
                notify({ message: "OTP sent sucessfully!", type: "success" });
            }
            else
                notify({ message: response.message, type: "error" });
        } catch (error) {
            console.log(error);
            dispatch({ action: "loading_completed" });
            notify({ message: error.message, type: "error" });
        }
    };

    const handleRequestSubmit = async () => {
        dispatch({ action: "loading" });
        try {
            await signUpUser(state.phone);
            dispatch({ action: "loading_completed" });
        } catch (error) {
            console.log(error);
            dispatch({ action: "loading_completed" });
            notify({ message: error.message, type: "error" });
        }
    };

    const handleChange = (key, value) => {
        dispatch({
            action: "write",
            key: key,
            value: value,
        });
    };

    const handleReset = () => {
        dispatch({ action: "reset" });
    };

    const closeModal = () => {
        handleReset();
        handleClose();
    };

    return (
        <Modal isOpen={isOpen} handleClose={closeModal}>
            <ModalFormContainer>
                {state.renderOtpForm ?
                    <VerifyOtp
                        otp={state.otp}
                        handleChange={handleChange}
                        loading={state.loading}
                        handleOTPSubmit={handleOTPSubmit}
                        resendOtp={resendOtp}
                    /> :
                    <CreateRequest
                        handleChange={handleChange}
                        handleRequestSubmit={handleRequestSubmit}
                        state={state}
                        isEscalate={featureKey === "escalate"}
                        dropDownItems={state[featureKey]}
                    />}
            </ModalFormContainer>
        </Modal>
    );
};

export default SubmitRequestModal;