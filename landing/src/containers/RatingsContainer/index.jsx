import PrizesComponent from "./Prizes";
import SubmitRating from "./SubmitRating";
import Winners from "./Winners";
import Reviews from "./reviews";

const RatingsContainer = () => {
  return (
    <>
        <Reviews />
        <PrizesComponent />
        <SubmitRating />
        <Winners />
    </>
  );
};

export default RatingsContainer;
