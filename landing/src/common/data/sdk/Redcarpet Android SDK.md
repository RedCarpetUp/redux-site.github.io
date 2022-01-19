# **QuickStart**

---

# **Redcarpet Card SDK**

Redcarpet Card sdk is devided in to four parts

1. Coustomer Onboarding SDK

2. Redcarpet Card Managemet SDK

3. Money Management SDK

4. Bill/Emi Payment SDK

---

# **Redcarpet Android Sample Application**

You can refer to the Redcarpet Android Sample App to learn how the SDK has been integrated.
&nbsp;  
&nbsp;  

[Sample App](https://github.com/RedCarpetUp/redcarpet-card-sdk-sample-app)

---

# **Redcarpet Android SDK Integration**

## Prerequisites

- You need redcarpet API Key to initilize redcarpet sdk. You can use the Test Keys for a sandbox experience. please user Production keys when going live with application
&nbsp;  
&nbsp;  

[GET API KEY](/sdk#demo)
&nbsp;  
&nbsp;  
## Integration Steps

### Step 1: Install Redcarpet Android Standard SDK

- Currently We distribute our SDK to the approved partenr. Download the latest versions of the SDK from shared url by redcarpet and place the aar file inside the libs folder.

- To add the SDK to your app, add the following dependency in your app's build.gradle file:

```sh
repositories {
    mavenCentral()
}
dependencies {
    implementation "com.redcpt:sdk:0.0.1"
    implementation "com.redcpt:sdk-expensemanager:0.0.1"
    implementation "com.redcpt:sdk-otp:0.0.1"
    implementation "com.redcpt:sdk-permissions:0.0.1"
    implementation "com.redcpt:sdk-utilitiessdk:0.0.1"
    implementation "com.redcpt:sdk-verification:0.0.1"
    implementation "com.redcpt:sdk-services:0.0.1"
    implementation "com.redcpt:sdk-appwisesdk:0.0.1"
}
```

### Step 2: Initialize Redcarpet Android SDK

- Initialize Redcarpet android SDK in app application class.

```sh

class SampleApplication : Application() {

    lateinit var sdk: RedCpt
        private set

    override fun onCreate() {
        super.onCreate()
        sdk = RedCpt.init(this, "<API KEY>")
    }
}

```

- Enable debug mode to see the debug logs

```sh
sdk.setDevMode(true)
```

- Now Redcarpet SDK initilize successfully.

### Step 3: Integrate OTP services

- Integrate otp services, verify otp to signup new user and login old user.

- Check OTP verified or Not

```sh
sdk = (application as SampleApplication).sdk
var isOtpVerified = sdk.isOtpVerified() // return boolean true/false
```

- Send OTP

```sh
otp = sdk.getOtpInstance()
otp.signup(phoneNumber, <otp_send_retry_count>, object : Otp.SignupCallback {
    override fun onError(response: SignUpResponse?, error: Throwable?) {
        when {
                error != null -> phoneNumberErrorState(error.message)
                response != null -> phoneNumberErrorState(response.message)
             }
        }
    override fun onSuccess(response: SignUpResponse) {
        }
})
```

- Verify OTP

```sh
 otp.verify(phoneNumber, password, object : Otp.VerifyCallback {
    override fun onError(response: VerifyResponse?, error: Throwable?) {
            when {
                 error != null -> otpErrorState(error.message)
                    response != null -> otpErrorState(response.message)
            }
        }

    override fun onSuccess(verifyResponse: VerifyResponse) {
        loginRoot.postDelayed(1000) {
             finish()
            }
        }
    })
```

### Step 4: Signup User

- After the successful otp verification, submit user personl info

```sh
verificationCallback.savePersonalDetails(
    "<User Name>",
    "<User Email>",
    "<User DOB>",
    "<Gender>",
    "<Referral code>",
    object :
        VerificationCallback.Callback<com.redcpt.onboardingsdk.models.GenericResponseModel> {
            override fun onFail(
                t: com.redcpt.onboardingsdk.models.GenericResponseModel?,
                    throwable: Throwable?
                ) {
                    Log.e("error response ", t.toString())
                    Log.e("error response ", throwable.toString())
                }
            override fun onSuccess(t: com.redcpt.onboardingsdk.models.GenericResponseModel) {
                if (t.result.equals("success")) {
                   Log.e("Funnel", t.message.toString())
                }
            }
        }
    )
```