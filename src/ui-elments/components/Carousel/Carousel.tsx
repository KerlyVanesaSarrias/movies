import { memo, ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Dots from './Dots';

export interface CarouselImage {
    id: number | string;
    url: string;
    redirectUrl?: string;
}

export interface CarouselProps extends Settings {
    images?: CarouselImage[];
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    enableAutoplay?: boolean;
    autoplaySpeed?: number;
    children?: ReactNode;
    id?: string;
}

const Carousel = ({
    images,
    speed = 500,
    slidesToShow = 1,
    slidesToScroll = 1,
    enableAutoplay = false,
    autoplaySpeed = 3000,
    children,
    id,
    ...restOfProps
}: CarouselProps) => {
    const settings: Settings = {
        dots: true,
        infinite: true,
        speed,
        slidesToShow,
        slidesToScroll,
        autoplay: enableAutoplay,
        autoplaySpeed,
        appendDots: (dots) => <Dots dots={dots as JSX.Element[]} />,
        ...restOfProps,
    };

    return (
        <div className="w-full px-8 " id={id}>
            <Slider {...settings} className="px-1">
                {children
                    ? children
                    : images &&
                      images.map((image) => (
                          <a
                              key={image.id}
                              data-testid={`link-redirect-${image.id}`}
                              href={image.redirectUrl}
                              id={`link-redirect-${image.id}`}
                              rel="noreferrer"
                              target="_blank"
                          >
                              <div key={image.id} className="h-auto w-full">
                                  <img
                                      alt="carousel item"
                                      className="h-auto w-full"
                                      src={image.url}
                                  />
                              </div>
                          </a>
                      ))}
            </Slider>
        </div>
    );
};

export default memo(Carousel);
