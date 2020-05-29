import React from "react";
import { render } from "@testing-library/react";
import List from "../List";
import { Photo } from "../../api/ImageService";

const mockData: Photo[] = [
  {
    id: "1",
    farm: 1,
    server: "s3",
    owner: "123",
    secret: "321",
    title: "cat photo",
  },
  {
    id: "2",
    farm: 1,
    server: "s3",
    owner: "123",
    secret: "321",
    title: "cat photo",
  },
];

it("should render images", () => {
  const { getAllByTestId } = render(<List data={mockData} />);
  const images = getAllByTestId("flickr-img");
  expect(images.length).toBe(2);
});
