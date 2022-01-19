import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import "rc-tabs/assets/index.css";
import Box from "common/components/Box";
import Text from "common/components/Text";
import Heading from "common/components/Heading";
import Card from "common/components/Card";
import Container from "common/components/UI/Container";
import TiltShape from "../TiltShape";

import SectionWrapper from "./updateScreen.style";

const MenuBaseLogin = ({
  secTitleWrapper,
  secText,
  secHeading,
  options,
  heading,
  subHeading,
}) => {
  return (
    <SectionWrapper id="scroll-up">
      <Container>
        <Box {...secTitleWrapper}>
          {heading ? <Heading {...secHeading} content={heading} /> : ""}
          <>{subHeading ? <Text {...secText} content={subHeading} /> : ""}</>
        </Box>
        <Tabs
          renderTabBar={() => <ScrollableInkTabBar />}
          renderTabContent={() => <TabContent animated={false} />}
          className="update-screen-tab"
        >
          {options.map((item, index) => (
            <TabPane
              forceRender={true}
              tab={
                <>
                  {item.icon ? <Icon icon={item.icon} size={24} /> : ""}
                  {item.title}
                </>
              }
              key={index + 1}
            >
              <Card className={item.class ? item.class : "card"}>
                {item.component()}
              </Card>
            </TabPane>
          ))}
        </Tabs>
      </Container>
    </SectionWrapper>
  );
};

MenuBaseLogin.propTypes = {
  secTitleWrapper: PropTypes.object,
  secText: PropTypes.object,
  secHeading: PropTypes.object,
};

MenuBaseLogin.defaultProps = {
  secTitleWrapper: {
    mb: ["20px", "20px"],
  },
  secText: {
    as: "span",
    display: "block",
    textAlign: "center",
    fontSize: "14px",
    letterSpacing: "0.15em",
    fontWeight: "700",
    color: "#fff",
    mb: "5px",
  },
  secHeading: {
    textAlign: "center",
    fontSize: ["20px", "24px"],
    fontWeight: "500",
    color: "#fff",
    letterSpacing: "-0.025em",
    mb: "0",
    lineHeight: "1.67",
  },
};

export default MenuBaseLogin;
