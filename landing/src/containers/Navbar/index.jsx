import Button from "common/components/Button";
import Container from "common/components/UI/Container";
import Logo from "common/components/UIElements/Logo";
import useOnClickOutside from "common/hooks/useOnClickOutside";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import Fade from "react-reveal/Fade";
import Scrollspy from "react-scrollspy";
import { navbar } from "common/data/navbar";
import ScrollSpyMenu from "../ScrollSpyMenu";
import NavbarWrapper, { MenuArea, MobileMenu } from "./navbar.style";
import { useCookies } from "react-cookie";
import { useNavBar } from "common/hooks/useNavBar";

const Navbar = () => {
  const { white_logo, logo, navMenu, miLogo } = navbar;
  const { asPath, push } = useRouter();
  const isGimBookPage = asPath.includes("gimbooks");
  const isMINavBar =
    asPath.includes("mi-store") || asPath.includes("mi-credit");
  const isRatingsPage = asPath.includes("rating");
  const filteredMenu = navMenu.filter(
    (menu) => !(isGimBookPage && menu.label == "LOGIN")
  );
  const [cookies, setCookies, removeCookies] = useCookies();
  const { isLoggedIn, setIsLoggedIn } = useNavBar();
  const [state, setState] = useState({
    search: "",
    searchToggle: false,
    mobileMenu: false,
  });

  const searchRef = useRef(null);
  useOnClickOutside(searchRef, () =>
    setState({ ...state, searchToggle: false })
  );

  const toggleHandler = (type) => {
    if (type === "search") {
      setState({
        ...state,
        search: "",
        searchToggle: !state.searchToggle,
        mobileMenu: false,
      });
    }

    if (type === "menu") {
      setState({
        ...state,
        mobileMenu: !state.mobileMenu,
      });
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    removeCookies("phone", { path: "/" });
    removeCookies("accessToken", { path: "/" });
    removeCookies("selectedProduct", { path: "/" });
    setIsLoggedIn(false);
    window.location.reload();
    push("/login");
  };

  const scrollItems = [];

  filteredMenu.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });
  const download = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.redcarpetup.rewardpay",
      "_blank"
    );
  };
  const handleRemoveMenu = () => {
    setState({
      ...state,
      mobileMenu: false,
    });
  };
  return (
    <NavbarWrapper
      isGimBookPage={isGimBookPage || isRatingsPage}
      // reduxFinance={true}
      isMICredit={isMINavBar}
      className="navbar"
    >
      <Container>
        <Logo
          logoStyle={
            isMINavBar ? { style: { width: "150px", height: "41.44px" } } : {}
          }
          withAnchor={isMINavBar}
          href={"/"}
          logoSrc={{
            src: "/images/rclogo.png",
          }}
          title={"Redux Finance"}
          className="main-logo"
        />
        {/* end of logo */}
      </Container>
      {/* end of mobile menu */}
    </NavbarWrapper>
  );
};

export default Navbar;
