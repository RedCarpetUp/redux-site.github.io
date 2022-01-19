import equifaxLogo from "public/images/reset/equifax.png";
export const header = {
  title_static: "Rebuild your Credit score with Reset",
  image: "/images/reset/Hero_image_original.jpg",
  icon: equifaxLogo,
  description: "Got Rejected? Low Credit Score?",
  description1: "No problem. Rebuild NOW",
  link_text: "Get Started",
};

import featureIcon1 from "public/images/reset/1.svg";
import featureIcon2 from "public/images/reset/2.svg";
import featureIcon3 from "public/images/reset/3.svg";

export const features = {
  slogan: "How it works",
  title: {
    actual: "Build credit with easy plans starting at ",
    span: "₹1500/month",
  },
  items: [
    {
      id: 1,
      color: "#F55767",
      icon: featureIcon1,
      title: "Choose a plan",
      description: "Available in 3, 6 and 9 months ",
    },
    {
      id: 2,
      color: "#ff4742",
      icon: featureIcon2,
      title: "Pay your EMI’s on time",
      description: "Your EMI amount will be refunded back to you in 24 hours",
    },
    {
      id: 3,
      color: "#fb5781",
      icon: featureIcon3,
      title: "Bureau increases your credit score",
      description: "Redcarpetup reports your EMI payments",
    },
  ],
};

import visa from "public/images/cards/visa.png";
export const keyFeatures = {
  title: "Features of Reset Card",
  features: [
    {
      id: 1,
      title: "+80",
      description: "Average increase in credit score",
    },
    {
      id: 2,
      title: "300-600",
      description: "For people with low credit score",
    },
    {
      id: 3,
      icon: visa,
      description1: "Use Reset card anywhere on the internet",
    },
  ],
};

export const option = {
  title: "Your Payment history makes up 35% of your credit score",
  description:
    "Reset card can help. By owning a Reset card and making your monthly repayments on time, you can build positive payment history which in turns increases your credit score.",
  image: "/images/reset/card.png",
};
export const newsletter = {
  title: "Learn how Reset Card works in one minute",
  description: "Easy Hai!",
  video: "https://www.youtube.com/embed/HPA_QQ1Ojlk",
};

import rbi from "public/images/reset/RBI.png";
export const benefits = {
  title: "Apply & start improving your Credit score",
  description1: "We’re approved by",
  description2: "Reserve Bank of India",
  icon: rbi,
};
