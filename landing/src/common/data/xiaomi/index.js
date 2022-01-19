export const header = {
  title_static: "MI’s Quick and Easy Buy!",
  image: "/images/reset/Hero_image_original.jpg",
  description: (
    <>
      Get any MI product you love in simple steps!
      <br />
      Buy Now and Pay Later.
    </>
  ),
  link_text: "Apply now!",
};

import featureIcon1 from "public/images/rebel/1.svg";
import featureIcon2 from "public/images/rebel/2.svg";
import featureIcon3 from "public/images/rebel/3.svg";
import featureIcon4 from "public/images/rebel/4.svg";

export const features = {
  slogan: "Quick and Easy Process",
  title: "How to join the waitlist",
  items: [
    {
      id: 1,
      color: "#F55767",
      icon: featureIcon1,
      description: "Verify your mobile number and join the waitlist.",
    },
    {
      id: 2,
      color: "#ff4742",
      icon: featureIcon2,
      description: "Enter your basic details, verify your Aadhaar and PAN.",
    },
    {
      id: 3,
      color: "#fb5781",
      icon: featureIcon3,
      description:
        "Choose Rebel Card from product selection page and complete your onboarding process by uploading the required documents.",
    },
    {
      id: 4,
      color: "#f18e47",
      icon: featureIcon4,
      description:
        "Ta-da!! You are now on the list. You have unlocked the priority access to your rebel card.",
    },
  ],
};

export const benefits = [
  {
    type: "Support",
    title: "We are always listening",
    description: `Get our support 24*7. Get your queries resolved. Scroll down to know how to reach us.`,
    image: "/images/gimbook/support.svg",
    link: "/blogs/post1",
  },
];

export const testimonials = [
  {
    name: `Yadav Krishan`,
    review: `I finally got my MI! The process is very simple. We can easily convert our bill into EMI using this Card. The process is very instant and approvals are also instant.I finally got my MI! The process is very simple. We can easily convert our bill into EMI using this Card. The process is very instant and approvals are also instant.`,
  },
  {
    name: `Vaibhav`,
    review: `It took such little time to purchase the product. When we are not  having enough cash this is the best way to convert into EMIs. I got my MI very easily.`,
  },
  {
    name: `Dev Prakash`,
    review: `When I visited the store just to check the prices as I didn’t have a huge amount of money in hand as it was month end. The seller showed me how I could easily convert my bill into small EMIs and get my MI immediately. Thanks to MI and Redcarpet for making purchase much easy`,
  },
];

export const investors = {
  type: "Virtual Card",
  title: "Partners & Investors",
  description: "",
  image: "/images/gimbook/partners.svg",
  link: "/blogs/post1",
};

export const faqlist = [
  { q: "", a: "" },
  {
    q: "How to apply?",
    a: <>
      <b>Registration</b>
      <br />
      Register using the link provided by the seller.
      <ul style={{ marginLeft: 20, marginBottom: 10 }}>
        <li style={{ listStyleType: "circle" }}>Complete Your KYC</li>
        <li style={{ listStyleType: "circle" }}>Upload Docs - PAN and Aadhar</li>
      </ul>
      Check your status. A real time Approval and limit assignment will be done.
      <br /><br />
      <b>Downpayment</b>
      <br />
      A few tenure options will be shown after selecting which, a very small% of the price of the product should be made as a downpayment. This amount will be shown to the user immediately.
      <br /><br /><b>Confirmation</b><br />
      The invoice along with other details will be shared to the user. Once the user accepts the loan agreement, the purchase will be confirmed. And now you can take your MI home!
    </>,
  },
  {
    q: "Interest rates and other charges",
    a: <>
      No hidden charges
      <br />
      Interest rates are variable as per tenure starting from 18% only
      <br />
      Processing fee : @2% only
    </>,
  },
  {
    q: "How to reach us?",
    a: (
      <>
        You can reach out to us at -:{" "}
        <a href="mailto:support@redcarpetup.com">support@redcarpetup.com</a>
      </>
    ),
  },
  // {
  //   q: "How to get a physical card?",
  //   a: `
  //       Click on Add address in Physical Card section , enter the address and acquire 
  //       your Physical Rebel Card.
  //       `,
  // },
];
