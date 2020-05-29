import React from "react";
import { Photo } from "../api/ImageService";

import "./List.scss";

const groupByColumns = (arr: any[], nrOfCols: number) => {
  return arr.reduce((acc, val, index) => {
    const colIndex = index % nrOfCols;

    if (!acc[colIndex]) {
      acc[colIndex] = [];
    }

    acc[colIndex].push(val);
    return acc;
  }, []);
};

type Props = {
  data: Photo[];
  isFetching?: boolean;
};

const getImgUrl = (farm: number, server: string, id: string, secret: string) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`

export default function List({ data }: Props) {
  const list = groupByColumns(data, 4).map((col: any, index: number) => {
    return (
      <div key={index} className="column">
        {col.map((photo: Photo, idx: number) => {
          const { farm, server, id, secret, title } = photo;
          const imgUrl = getImgUrl(farm, server, id, secret);
          const imageEl = <img key={`${id}-${idx}`} src={imgUrl} alt={title} data-testid="flickr-img"/>;

          return imageEl;
        })}
      </div>
    );
  });

  return <div className="row list">{list}</div>;
}
