import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = ({slides}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: slides?.length>3?4:slides?.length,
    slidesToShow: slides?.length>3?4:slides?.length,
    swipeToSlide: true, // Cho phép chuyển slide bằng swipe
    arrows: true, // Hiển thị các nút chuyển slide
  };

  return (
    <div className="">
      {
        console.log(slides)
      }
      <Slider {...settings}>
        {slides?.map((slide,idx)=>
        <div key={idx}>
          <div className="px-1">
            <img
              className="rounded-md aspect-[3/4]"
              src={slide}
            />
          </div>
        </div>
        )}
      </Slider>
    </div>
  );
};
export default Gallery;
