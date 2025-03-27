import React, { useEffect, useState } from "react";
import { Image, ImagePrivew } from "./image";
import "@/styles/masonry.css";

interface MasonryProps {
    images: string[];
    randomPlay?: boolean;
    onStopPlay?: () => void;
}

const Masonry = ({
    images = [],
    randomPlay = false,
    onStopPlay
}: MasonryProps) => {
    const [showPreview, setShowPreview] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState('');
    const [imageList, setImageList] = React.useState(images);
    const [play, setPlay] = React.useState(randomPlay);

    useEffect(() => {
        setImageList(images);
    }, [images]);

    useEffect(() => {
        if (!play || imageList.length === 0) return;

        const randImg = (): string => {
            const randomIndex = Math.floor(Math.random() * imageList.length);
            return imageList[randomIndex]
        }

        if (imgSrc == "") {
            setImgSrc(randImg());
        }
        const interval = setInterval(() => {
          setImgSrc(randImg());
        }, 3000);

        setShowPreview(true);
        return () => clearInterval(interval);
      }, [play]);

      useEffect(() => {
        setPlay(randomPlay);
      }, [randomPlay])

    return <>
    {showPreview && imgSrc != "" && ImagePrivew(imgSrc, () => {
        setShowPreview(false);
        setPlay(false);
        if (onStopPlay !== undefined) {
            onStopPlay()
        }
        setImgSrc("");
    })}
    <div className='masonry' id="masonry-gallery">
        {images.map((image, idx) => (
          <Image
            key={idx}
            src={image}
            onImgClick={(src) => {
                setImgSrc(src);
                setShowPreview(true);
            }}
          />
        ))}
    </div>
  </>
}

export {
    Masonry,
}