const flickrAPI = `https://api.flickr.com/services/rest/`;
const apiKey = "15b67c2a8b4288ff1fddf5eb56655cfb";

export type Photo = {
  farm: number;
  id: string;
  server: string;
  owner: string;
  secret: string;
  title: string;
};

export type PhotoResponse = {
  photos: {
    page: number,
    pages: number,
    perPage: number,
    photo: Photo[],
    total: string | number
  }
  stat: string
}

export function fetchImages(searchText: string, page: number = 1): Promise<PhotoResponse> {
  const queryString = `text=${searchText}&page=${page}&method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=${apiKey}&content_type=1&is_getty=1`;
  return fetch(`${flickrAPI}?${queryString}`, {
    method: "GET",
  })
    .then((r) => r.json())
    .catch((error) => {
      console.error(error);
      return [];
    });
}
