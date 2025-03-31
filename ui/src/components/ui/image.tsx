import React from "react";

interface ImageProps {
    src: string;
    onImgClick: (src: string) => void;
}

const ImagePrivew = (src: string, onClick?: () => void) => {
    return <div className="grid fixed left-0 top-0 justify-center items-center w-full h-full bg-[rgba(0,0,0,0.9)] overflow-auto z-[1000]" onClick={onClick}>
        <img className="max-w-[90vw] max-h-[90vh] object-contain" src={src} />
    </div>
}

const Image = ({ src, onImgClick }: ImageProps) => {
    return <>
    <div
    className="flex justify-center items-center overflow-hidden rounded-[5px] cursor-pointer transition-transform duration-300 ease-in-out aspect-square hover:scale-[1.03]"
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