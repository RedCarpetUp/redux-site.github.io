import { Icon } from "react-icons-kit";
import { facebook } from "react-icons-kit/fa/facebook";
import { youtube } from "react-icons-kit/fa/youtube";
import { instagram } from "react-icons-kit/fa/instagram";
import { twitter } from "react-icons-kit/fa/twitter";

export const footerData = {
  logo: "/images/rclogo.png",
  description:
    "We lend to those that banks cannot see",
  socialLinks: [
    {
      id: 1,
      icon: <Icon icon={facebook} />,
      name: "facebook",
      link: "https://www.facebook.com/redcarpetup/",
    },
    {
      id: 2,
      icon: <Icon icon={instagram} />,
      name: "instagram",
      link: "https://www.instagram.com/redcarpetup/",
    },
    {
      id: 3,
      icon: <Icon icon={youtube} />,
      name: "youtube",
      link: "https://www.youtube.com/channel/UCnQDafd2nL0ziwJjO5O3Hsw/",
    },
    {
      id: 4,
      icon: <Icon icon={twitter} />,
      name: "twitter",
      link: "https://twitter.com/RedCarpetUp",
    },
  ],
  menuWidgets: [
    {
      id: 1,
      title: "Company",
      menu: [
        {
          id: 1,
          text: "About",
          link: "/about",
        },
        {
          id: 2,
          text: "Terms & Conditions",
          link: "/privacy",
        },
        {
          id: 3,
          text: "FAQ",
          link: "/faq",
        },
      ],
    },
    {
      id: 2,
      title: "Services",
      menu: [
        {
          id: 1,
          text: "Personal Loan",
          link: "/personal-loan",
        },
      ],
    },
    {
      id: 3,
      title: "Legal",
      menu: [
        {
          id: 1,
          text: "Fraud Advisory",
          link: "/advisory",
        },
        {
          id: 2,
          text: "Interest Rates",
          link: "/interest",
        },
        {
          id: 3,
          text: "Grievance Redressal",
          link: "/pdf/Grievance_Redressal_Policy%20(1).pdf"
        },
        {
          id: 4,
          text: "Fair Practice Code",
          link: "/pdf/Fair_Practice_Code.docx%20(1).pdf"
        },
        {
          id: 5,
          text: "KYC Policy",
          link: "/pdf/KYC_Policy.pdf"
        },
        {
          id: 6,
          text: "Moratorium Policy",
          link: "/pdf/Moratorium_Policy.pdf"
        },
      ],
    },
    {
      id: 4,
      title: "Support",
      menu: [
        {
          id: 1,
          text: "Contact",
          link: "/contact",
        }
      ],
    },
  ],
};
