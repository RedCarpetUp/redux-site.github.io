import Input from "common/components/Input";
import { RedButton } from "../complaint.style";

const VerifyOtp = ({ otp, resendOtp, handleOTPSubmit, handleChange, loading }) => {
    return (
        <>
            <h1 style={{ color: "#dd285d" }}>Verify your OTP</h1>
            <form onSubmit={handleOTPSubmit}>
                <Input
                    required
                    inputType="number"
                    label="OTP"
                    value={otp}
                    placeHolder={"Enter OTP sent to device"}
                    onChange={value => handleChange("otp", value)}
                />
                <p>
                    <a href="" onClick={resendOtp}>Resend Otp?</a>
                </p>
                <RedButton title="Verify OTP" type="submit" isLoading={loading} />
            </form>
        </>
    );
}

export default VerifyOtp;