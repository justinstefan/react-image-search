import React, { useState, useEffect } from "react";
import useDebouncedValue from "./hooks/use-debounce";
import useInfiniteScroll from "./hooks/use-infinite-scroll";
import { fetchImages, Photo } from "./api/ImageService";

import List from "./components/List";
import Spinner from "./components/Spinner";

import "./App.scss";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  const [page, setPage] = useState(1);
  const [results, setResults] = useState<Photo[]>([]);

  function fetchMoreListItems() {
    if (debouncedSearchTerm) {
      const nextPage = page + 1;
      fetchImages(debouncedSearchTerm, nextPage).then((data) => {
        setResults([...results, ...data.photos.photo]);
        setPage(nextPage);
        //@ts-ignore
        setIsFetching(false);
      });
    }
  }

  // fetch images effect
  useEffect(() => {
    setPage(1);
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetchImages(debouncedSearchTerm).then((data) => {
        setIsSearching(false);
        setIsFocused(true);
        setResults(data.photos.photo);
      });
    } else {
      setResults([]);
      setIsSearching(false);
      setIsFocused(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="App">
      <div className={`row input-wrap ${isFocused ? "focused" : ""}`}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          name="searchText"
          placeholder="Type to search image gallery"
          data-testid="search-input"
        />
        {(isSearching || !!isFetching) && <Spinner />}
      </div>
      <List data={results} isFetching={isSearching || !!isFetching} />
    </div>
  );
}

export default App;
