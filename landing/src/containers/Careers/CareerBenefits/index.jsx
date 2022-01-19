import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import React from "react";
import Icon from "react-icons-kit";
import { benefit } from "common/data/career";
import CareerSection from "../careers.style";
//import { featureData } from 'common/data/Charity';

const CareerBenefits = ({ row, col }) => {
  return (
    <CareerSection>
      <Box>
        <Container>
          <header className={"cultureHeader"}>
            <small>Benefits</small>
            <h2>{benefit[0].title}</h2>
            <hr
              style={{
                borderColor: "rgba(117, 117, 117, 0.09)",
              }}
            />
            <p className="lead" style={{ paddingTop: "2rem" }}>
              {benefit[0].description}
            </p>
          </header>

          <Box
            className={"row benefitsPerks"}
            {...row}
            style={{ paddingTop: "2rem" }}
          >
            {benefit.slice(1).map((b, key) => (
              <Box className="col" {...col} key={key}>
                <p>
                  <Icon
                    icon={b.icon}
                    size={64}
                    style={{
                      color: "#bfc5ca",
                    }}
                  ></Icon>
                </p>
                <Heading as="h3" content={b.title} />
                {key == 3 ? <br /> : ""}
                <p>{b.description}</p>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </CareerSection>
  );
};

CareerBenefits.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    alignItems: "center",
  },
  col: {
    padding: "1rem 15px",
    width: [1, "50%", "50%", "50%"],
  },
};

export default CareerBenefits;
