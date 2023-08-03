import { useState } from 'react';

import config from '@/config';

import './styles/ArtworkImage.css';

export default function ArtworkImage({ image, imageTemplateClassName="", imageClassName="", style={}, onClick, forceSmaller, forceSmallerDimension="width" }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {
        !forceSmaller ?
          <img
            src={`${config.app.imageServiceDomain}/${image}/w=2000`}
            srcSet={
              `${config.app.imageServiceDomain}/${image}/w=200 200w,
                            ${config.app.imageServiceDomain}/${image}/w=400 400w,
                            ${config.app.imageServiceDomain}/${image}/w=600 600w,
                            ${config.app.imageServiceDomain}/${image}/w=800 800w,
                            ${config.app.imageServiceDomain}/${image}/w=1000 1000w,
                            ${config.app.imageServiceDomain}/${image}/w=1200 1200w,
                            ${config.app.imageServiceDomain}/${image}/w=1400 1400w,
                            ${config.app.imageServiceDomain}/${image}/w=1600 1600w,
                            ${config.app.imageServiceDomain}/${image}/w=1800 1800w,
                            ${config.app.imageServiceDomain}/${image}/w=2000 2000w,
                            ${config.app.imageServiceDomain}/${image}/w=2200 2200w`
            }
            alt="artwork main preview"
            className={!imageLoaded ? "artwork-image-loading" : imageClassName}
            onLoad={()=>setImageLoaded(true)}
            onClick={onClick}
            style={style}
          />
          :
          <img
            src={
              forceSmallerDimension === "width" ?
                `${config.app.imageServiceDomain}/${image}/w=${forceSmaller}`
                :
                `${config.app.imageServiceDomain}/${image}/h=${forceSmaller}`
            }
            alt="artwork main preview"
            className={!imageLoaded ? "artwork-image-loading" : imageClassName}
            onLoad={()=>setImageLoaded(true)}
            onClick={onClick}
            style={style}
          />
      }

      {!imageLoaded && (
        <div className={`artwork-image-template ${imageTemplateClassName}`} style={style}/>
      )}
    </>
  );
}
