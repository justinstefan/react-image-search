//@ts-nocheck

import { fetchImages } from "../ImageService";

const mockedData = { photos: [{id: 1}, {id: 2}] }

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockedData),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("should fetch images correctly", async () => {
  const data = await fetchImages('cat', 1);
  
  expect(data).toEqual(mockedData)
  expect(fetch).toHaveBeenCalledTimes(1)
});
