import Dropzone from "react-dropzone";
import Input from "common/components/Input";
import Text from "common/components/Text";
import {
    SelectField,
    Label,
    FileUploadSection,
    RedButton
} from "../complaint.style";

const CreateRequest = ({ handleChange, state, handleRequestSubmit, dropDownItems, isEscalate }) => {

    const handleSubmit = async e => {
        e.preventDefault();
        await handleRequestSubmit();
    };

    return (
        <>
            <h1 style={{ color: "#dd285d" }}>{isEscalate ? "Grievance Redressal Form" : "Submit a Request"}</h1>
            <form onSubmit={handleSubmit}>
                {isEscalate && <>
                    <Input
                        required
                        inputType="number"
                        label="Ticket"
                        value={state.ticket}
                        placeHolder={"Enter your ticket number"}
                        onChange={(e) => handleChange("ticket", e)}
                    />
                    <Text style={{ fontSize: 12, marginTop: 10 }} content={`Enter the ticket number you received 
                            when you created this ticket`} />
                    <br />
                </>}
                <Input
                    required
                    inputType="number"
                    label="Phone"
                    value={state.phone}
                    placeHolder={"Enter Your Registered Phone Number"}
                    onChange={(e) => handleChange("phone", e)}
                />
                <br />
                {!isEscalate && <>
                    <Input
                        required
                        inputType="email"
                        label="Email"
                        value={state.email}
                        placeHolder={"Enter Your Registered email"}
                        onChange={(e) => handleChange("email", e)}
                    />
                    <br />
                    <SelectField>
                        <Label htmlFor={"feature"}>Feature</Label>
                        <select
                            required
                            name="feature"
                            placeHolder="Select your problem"
                            value={state.feature}
                            onChange={(e) => handleChange("feature", e.target.value)}
                        >
                            <option selected>-</option>
                            {dropDownItems && dropDownItems.map((e, i) => (
                                <option value={e} key={i}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </SelectField>
                    <br />
                    <Input
                        required
                        label="Subject"
                        value={state.subject}
                        placeHolder={"Mention the Issue"}
                        onChange={(e) => handleChange("subject", e)}
                        maxLength={49}
                    />
                    <br />
                </>}
                <Input
                    required
                    label="Message"
                    value={state.message}
                    placeHolder={"Elaborate your Issue"}
                    onChange={(e) => handleChange("message", e)}
                    inputType="textarea"
                    style={{ resize: "none" }}
                    maxLength="249"
                />
                <br />
                <div>
                    <Label htmlFor="file-upload">File Upload (optional)</Label>
                    <Dropzone
                        name="file-upload"
                        onDrop={(acceptedFiles) => handleChange("file", acceptedFiles)}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FileUploadSection>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {
                                        state.file ?
                                            state.file.map((e, i) => <p key={i}>{e.name}</p>) :
                                            <p>Drag & drop some files here, or click to select files</p>
                                    }
                                </div>
                            </FileUploadSection>
                        )}
                    </Dropzone>
                </div>
                <br />
                <RedButton title={isEscalate ? "Escalate" : "Submit Request"} type="submit" isLoading={state.loading} />
            </form>
        </>
    );
}

export default CreateRequest;