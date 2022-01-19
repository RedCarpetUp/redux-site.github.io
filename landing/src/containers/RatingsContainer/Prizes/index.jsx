import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import Button from "common/components/Button";
import Image from "common/components/Image";
import { SectionWrapper } from "./prizes.style";
import Icon from "react-icons-kit";
import { arrowRight } from "react-icons-kit/fa/arrowRight";
import { ModalFormContainer } from "../../Complaints/complaint.style";
import Modal from "../../Complaints/Modal";
import { useState } from "react";

export const StarRating = () => (
  <div className="star-rating-wrapper">
    <span className="star-rating">&#9733;</span>
    <span className="star-rating">&#9733;</span>
    <span className="star-rating">&#9733;</span>
    <span className="star-rating">&#9733;</span>
    <span className="star-rating">&#9733;</span>
  </div>
);

const PrizesComponent = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal isOpen={openModal} handleClose={() => setOpenModal(false)}>
        <ModalFormContainer>
          <h1 style={{ color: "#dd285d" }}>Terms and Conditioins</h1>
          <Text
            content={
              <>
                These terms and conditions will be applicable to the group of
                individuals or individuals who will submit there responses with
                required tasks completed. There are few more terms will be
                applicable for the selection of a Winner given below.
              </>
            }
          />
          <ol>
            <li style={{ listStyleType: "number" }}>
              <Text
                content={
                  <>
                    No-one can claim directly or indirectly for rewards offered
                    in contest. The winners will be announced randomly as per
                    the pick and choose method followed by the RedCarpet's
                    internal processes.
                  </>
                }
              />
            </li>
            <li style={{ listStyleType: "number" }}>
              <Text
                content={
                  <>
                    One person can submit one response in shared form with
                    requested screenshot of submitted rating on Play Store.
                  </>
                }
              />
            </li>
          </ol>
        </ModalFormContainer>
      </Modal>
      <SectionWrapper>
        <Container>
          <div className="flex-section">
            <div className="flex-content">
              <Heading content={`Stand a chance to win exciting prizes`} />
              <Text
                className="prize-text"
                content={`Are you also a happy customer of RedCarpet, you can get an excited prize or cashback`}
              />
              <StarRating />
              <Text
                className="prize-rate-text"
                content={
                  <>
                    Rate our app on Google Play Store and get a chance to win
                    exciting prizes and cashback{" "}
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenModal(true);
                      }}
                    >
                      (T&C Apply)
                    </a>
                  </>
                }
              />
              <a
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.redcarpetup.rewardpay"
                rel="noopener noreferrer"
              >
                <Button
                  className="prize-button"
                  title={`Goto Play Store`}
                  icon={<Icon icon={arrowRight} />}
                />
              </a>
            </div>
            <div className="flex-image">
              <Image src={`/images/ratings/rating.svg`} />
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default PrizesComponent;
