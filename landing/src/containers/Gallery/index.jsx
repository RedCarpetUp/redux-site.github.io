import GlideCarousel from "common/components/GlideCarousel";
import GlideSlide from "common/components/GlideCarousel/glideSlide";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";
import { galleryData } from "common/data/gallery";
import { SectionHeader } from "public/styles/appClassic.style";
import GalleryWrapper, { Button, GalleryCard } from "./gallery.style";

const Gallery = () => {
  const glideOptions = {
    type: "carousel",
    perView: 5,
    gap: 0,
    breakpoints: {
      1200: {
        perView: 4,
      },
      991: {
        perView: 3,
      },
      480: {
        perView: 2,
      },
    },
  };
  return (
    <>
      <SectionHeader>
        <Fade up>
          <h5>
            #com<span style={{ color: "red" }}>reds</span>4life
          </h5>
          <Heading content={galleryData.title} />
        </Fade>
      </SectionHeader>
      <br />
      <Fade up>
        <GalleryWrapper id="gallery">
          <GlideCarousel
            carouselSelector="gallery_carousel"
            options={glideOptions}
            nextButton={<i className="flaticon-next" />}
            prevButton={<i className="flaticon-left-arrow" />}
          >
            <Fragment>
              {galleryData.images.map((item) => (
                <GlideSlide key={`gallery_key${item.id}`}>
                  <GalleryCard>
                    <a>
                      <Image src={item.thumb_url} alt={item.name} />
                      <Button className="read_more__btn">
                        <span className="arrow"></span>
                        {item.name}
                      </Button>
                    </a>
                  </GalleryCard>
                </GlideSlide>
              ))}
            </Fragment>
          </GlideCarousel>
        </GalleryWrapper>
      </Fade>
    </>
  );
};

export default Gallery;
