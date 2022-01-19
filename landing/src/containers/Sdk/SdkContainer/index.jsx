import SkillSection from "../Skill";
import { sections, Point, Point2 } from "common/data/sdk";
import DesignAndBuilt from "../../DesignAndBuilt";
import PromotionBlock from "../PromotionBlock";

const SdkContainer = () => {
  return (
    <>
      <SkillSection sections={sections.section2} />
      {Point.map((e, id) => (
        <DesignAndBuilt option={e} />
      ))}
      {Point2.map((e, id) => (
        <PromotionBlock option={e} />
      ))}
    </>
  );
};

export default SdkContainer;
