import React from "react";
import "@/styles/image.css";

interface ImageProps {
    src: string;
    onImgClick: (src: string) => void;
}

const ImagePrivew = (src: string, onClick?: () => void) => {
    return <div className="image-preview" onClick={onClick}>
        <img src={src} />
    </div>
}

const Image = ({ src, onImgClick }: ImageProps) => {
    return <>
    <div
    className="gallery-item"
    onClick={() => {onImgClick(src)}}
    style={{
      backgroundImage: `url("${src}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
  </div>
  </>
}

export {
    Image,
    ImagePrivew,
}