import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import Logo from "common/components/UIElements/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { footerData } from "common/data/footer";
import FooterArea, {
  CopyrightText,
  List,
  ListItem,
  MenuArea,
  SocialList,
} from "./footer.style";

const Footer = ({ row, col, colOne, colTwo }) => {
  const { logo, description, socialLinks, menuWidgets } = footerData;
  const date = new Date();
  const year = date.getFullYear();
  const { asPath } = useRouter();
  const isMIFooter =
    asPath.includes("mi-credit") || asPath.includes("mi-store");

  return (
    <FooterArea isMIFooter={isMIFooter}>
      <Container>
        {/* <WidgetArea>
          {menuWidgets.map((item) => (
            <Box className="col" key={`footer-widget--key${item.id}`}>
              <Image src={item.icon} alt={item.title} />
              <Heading as="h3" content={item.title} />
              <Text content={item.description} />
            </Box>
          ))}
        </WidgetArea> */}
        {/* End of footer widgets area */}
        <MenuArea isMIFooter={isMIFooter}>
          {isMIFooter ? (
            <>
              <CopyrightText>
                Powered By RedCarpet.AI{" "}
                <img
                  style={{ position: "relative", top: 10, left: 5 }}
                  src={"/images/favicon.png"}
                  alt="Redcarpet Logo"
                />
              </CopyrightText>
            </>
          ) : (
            <>
              <Box className="row" {...row}>
                <Box className="col-one" {...colOne}>
                  <Logo
                    className="logo"
                    href="/"
                    logoSrc={{ src: logo }}
                    title="Home"
                    withAnchor="false"
                  />
                  <Text
                    className="text"
                    content={description}
                    style={{ color: "#7E7E7E" }}
                  />
                  <SocialList>
                    {socialLinks.map((item) => (
                      <li className={item.name} key={`link-key${item.id}`}>
                        <a
                          aria-label={item.name}
                          href={item.link}
                          target="_blank"
                        >
                          {item.icon}
                        </a>
                      </li>
                    ))}
                  </SocialList>
                </Box>
                {/* End of logo column */}

                <Box className="col-two" {...colTwo}>
                  {menuWidgets.map((widget) => (
                    <Box
                      className="col"
                      {...col}
                      key={`footer__widget-key${widget.id}`}
                    >
                      <Heading
                        className="widget_title"
                        as="h3"
                        content={widget.title}
                        style={{ color: "#7E7E7E" }}
                      />
                      <List>
                        {widget.menu.map((item) => (
                          <ListItem key={`list__item-${item.id}`}>
                            <Link href={item.link}>
                              <a>{item.text}</a>
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                </Box>
                {/* End of List column */}
              </Box>
              {/* End of widgets row */}
              {/* <Logo className="logo" href="/" logoSrc={logo} title="RedCarpet" />
          <Menu>
            {menuWidgets.map((item) => (
              <MenuItem key={`footer-link${item.id}`}>
                <Link href={item.link}>
                  <a>{item.text}</a>
                </Link>
              </MenuItem>
            ))}
          </Menu> */}
              <CopyrightText>Copyright {year} By RedCarpetUp</CopyrightText>
            </>
          )}
        </MenuArea>
        {/* End of footer menu area */}
      </Container>
    </FooterArea>
  );
};

Footer.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  colOne: PropTypes.object,
  colTwo: PropTypes.object,
};

// Footer default style
Footer.defaultProps = {
  // Footer row default style
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
  },
  // Footer col one style
  colOne: {
    width: ["100%", "30%", "35%", "28%"],
    mt: [0, "13px", "0"],
    mb: ["30px", 0],
    pl: ["15px", 0],
    pr: ["15px", "15px", 0],
  },
  // Footer col two style
  colTwo: {
    width: ["100%", "70%", "65%", "72%"],
    flexBox: true,
    flexWrap: "wrap",
  },
  // Footer col default style
  col: {
    width: ["100%", "50%", "50%", "25%"],
    pl: "15px",
    pr: "15px",
    mb: "30px",
  },
};

export default Footer;
