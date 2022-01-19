//import Container from 'common/components/UI/Container';
import {
  Accordion,
  AccordionBody,
  AccordionItem,
  AccordionTitle,
  CloseIcon,
  IconWrapper,
  OpenIcon,
} from "common/components/Accordion";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import React, { Fragment } from "react";
import { Icon } from "react-icons-kit";
import { minusCircled } from "react-icons-kit/ionicons/minusCircled";
import { plusCircled } from "react-icons-kit/ionicons/plusCircled";
import { faq } from "common/data/faq";
import { SectionHeader } from "public/styles/appClassic.style";
import FaqSection from "./faq.style";

const Faq = () => {
  const { slogan, title, faqs } = faq;
  return (
    <FaqSection id="faq">
      <SectionHeader>
        <Heading as="h5" content={slogan} />
        <Heading content={title} />
      </SectionHeader>
      <Accordion>
        <Fragment>
          {faqs.map((item) => (
            <AccordionItem key={`accordion-key--${item.id}`}>
              <Fragment>
                <AccordionTitle>
                  <Fragment>
                    <Heading as="h3" content={item.question} />
                    <IconWrapper className="icon-wrapper">
                      <OpenIcon>
                        <Icon icon={minusCircled} size={18} />
                      </OpenIcon>
                      <CloseIcon>
                        <Icon icon={plusCircled} size={18} />
                      </CloseIcon>
                    </IconWrapper>
                  </Fragment>
                </AccordionTitle>
                <AccordionBody>
                  <Text content={item.answer} />
                </AccordionBody>
              </Fragment>
            </AccordionItem>
          ))}
        </Fragment>
      </Accordion>
    </FaqSection>
  );
};

export default Faq;
