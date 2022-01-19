export const header = {
  title_static: "Grow your Business with Credit at your fingertips!",
  image: "/images/reset/Hero_image_original.jpg",
  description: (
    <>
      Run your business at ease,
      <br />
      With our new <b>RC GimBooks Card</b>
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
    type: "Collaborate",
    title: "Shop and keep your pockets full!",
    description: "",
    image: "/images/rebel/Access to Free Virtual Card.svg",
    link: "/blogs/post1",
  },
  {
    type: "Virtual Card",
    title: "Get Exciting Offers",
    description: "From 100+ partners and brands and plenty of Cashbacks too!",
    image: "/images/gimbook/offers.svg",
    link: "/blogs/post1",
  },
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
    name: `ABHISHEK KHANNA`,
    review: `I really loved this card. It really helped me to make easy purchases when i needed to make full payments and thanks to GimBooks for offering this card. Now i use this card at all places and i am happy that the interest rates are very low too!`,
  },
  {
    name: `ARUN RATI`,
    review: `I am so glad to have known thihs card! It makes business much more smooth. It helped me convert many heavy payments into EMIs and hence I was able to solve cash crunch. Thanks to Redcarpet and GimBooks. Any business man would love it!`,
  },
  {
    name: `DIVYA SHANKAR`,
    review: `I am running a small botique, it was difficult to get credit from various sources. I needed to have strong securities to show which i didn't have. This card makes it easier giving me credit at the time I need and allowing me to pay over time. I love the idea. Now I need not wait for getting huge loans from banks. Thanks a lot team`,
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
    a: `Click on "Apply now" on the home screen. Complete the KYC process. Upload required documents (Aadhaar card + PAN card + Video KYC + Address proof (for card delivery) + Income proof (Salary slip / Bank statement / GST details)). Get you card with instant approval!`,
  },
  {
    q: "How does it work?",
    a: `Use our card for any purchase anywhere in India. 
        A bill will be raised on 1st of the next month, get an 
        interest free period up to 15th of that month.
        Or, Convert this bill into an EMI. Choose a Tenure : 3,6 and 12 months 
        Make monthly payments before the 15th of every month.`,
  },
  {
    q: "Interest rates and other charges",
    a: `A fee at 3%(up to Rs 2000 only) is charged on limit assigned. Interest rates starting at 3 % only.`,
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
  {
    q: "How to get a physical card?",
    a: `
        Click on Add address in the Physical Card section, enter the address and acquire 
        your Physical Rebel Card.
        `,
  },
];
