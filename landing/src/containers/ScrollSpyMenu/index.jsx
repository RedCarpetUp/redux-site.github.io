import { useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import Scrollspy from "react-scrollspy";
import { DrawerContext } from "common/contexts/DrawerContext";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useNavBar } from "common/hooks/useNavBar";

const ScrollSpyMenu = ({ className, menuItems, drawerClose, ...props }) => {
  const { dispatch } = useContext(DrawerContext);
  const { push, asPath } = useRouter();
  const [cookies, _, removeCookies] = useCookies();
  const { isLoggedIn, setIsLoggedIn } = useNavBar();
  // empty array for scrollspy items
  const scrollItems = [];

  // convert menu path to scrollspy items
  menuItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const getPath = () => {
    if (cookies.phone && cookies.accessToken) {
      return "/login";
    } else if (cookies.mi_phone && cookies.mi_accessToken) {
      return "/mi-credit/login";
    }
    if (cookies.store_phone && cookies.store_accessToken) {
      return "/mi-store";
    }
  };

  // Add all classs to an array
  const addAllClasses = ["scrollspy__menu"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  // Close drawer when click on menu item
  const toggleDrawer = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    removeCookies("phone", { path: "/" });
    removeCookies("accessToken", { path: "/" });
    removeCookies("selectedProduct", { path: "/" });
    removeCookies("mi_phone", { path: "/" });
    removeCookies("mi_accessToken", { path: "/" });
    removeCookies("store_phone", { path: "/" });
    removeCookies("store_accessToken", { path: "/" });
    removeCookies("customer_id", { path: "/" });
    removeCookies("customer_phone", { path: "/" });
    removeCookies("mi_selectedProduct", { path: "/" });
    setIsLoggedIn(false);
    window.location.reload();
    push("/login");
  };

  return (
    <Scrollspy
      items={scrollItems}
      className={addAllClasses.join(" ")}
      drawerClose={drawerClose}
      {...props}
    >
      {menuItems.map((menu, index) =>
        menu.label === "LOGOUT" ? (
          isLoggedIn ? (
            <li style={{ cursor: "pointer" }} key={`menu-item-${index}`}>
              <a onClick={handleLogout}>{menu.label}</a>
            </li>
          ) : (
            <></>
          )
        ) : menu.label === "LOGIN" ? (
          asPath.includes("/login") ||
          asPath.includes("/mi-credit/login") ||
          asPath.includes("/mi-store") ? (
            <></>
          ) : (
            <li key={`menu-item-${index}`}>
              <a href={getPath()}>{isLoggedIn ? "DASHBOARD" : menu.label}</a>
            </li>
          )
        ) : (
          <li key={`menu-item-${index}`}>
            {menu.staticLink ? (
              <a href={menu.path}>{menu.label}</a>
            ) : (
              <>
                {drawerClose ? (
                  <Link href={menu.path}>
                    <a offset={menu.offset} onClick={toggleDrawer}>
                      {menu.label}
                    </a>
                  </Link>
                ) : (
                  <Link href={menu.path}>
                    <a offset={menu.offset}>{menu.label}</a>
                  </Link>
                )}
              </>
            )}
          </li>
        )
      )}
    </Scrollspy>
  );
};

ScrollSpyMenu.propTypes = {
  /** className of the ScrollSpyMenu. */
  className: PropTypes.string,

  /** menuItems is an array of object prop which contain your menu
   * data.
   */
  menuItems: PropTypes.array.isRequired,

  /** Class name that apply to the navigation element paired with the content element in viewport. */
  currentClassName: PropTypes.string,

  /** Class name that apply to the navigation elements that have been scrolled past [optional]. */
  scrolledPastClassName: PropTypes.string,

  /** HTML tag for Scrollspy component if you want to use other than <ul/> [optional]. */
  componentTag: PropTypes.string,

  /** Style attribute to be passed to the generated <ul/> element [optional]. */
  style: PropTypes.object,

  /** Offset value that adjusts to determine the elements are in the viewport [optional]. */
  offset: PropTypes.number,

  /** Name of the element of scrollable container that can be used with querySelector [optional]. */
  rootEl: PropTypes.string,

  /**
   * Function to be executed when the active item has been updated [optional].
   */
  onUpdate: PropTypes.func,
};

ScrollSpyMenu.defaultProps = {
  componentTag: "ul",
  currentClassName: "is-current",
};

export default ScrollSpyMenu;
