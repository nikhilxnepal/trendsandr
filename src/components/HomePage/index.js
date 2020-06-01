/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, Fragment } from "react";
import styled from "styled-components";
import Axios from "axios";
import { HomeWrapper } from "./style";
import LatestMovies from "./LatestMovies";
import LatestBooks from "./LatestBooks";
import { GlobalContext } from '../../contexts/GlobalContext';

export default function HomePage() {
  const [latestMovies, setlatestMovies] = useState([]);
  const [latestBooks, setlatestBooks] = useState([]);
  const { loading, toggleLoading } = useContext(GlobalContext);

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = async () => {
    toggleLoading(true)
    const allMovies = await Axios.all([
      Axios.get(`https://ent-api-dev.herokuapp.com/api/v1/movies`),
      Axios.get(`https://ent-api-dev.herokuapp.com/api/v1/books`),
    ]);
    setlatestMovies(allMovies[0].data.data);
    setlatestBooks(allMovies[1].data.data);
    toggleLoading(false)
  };

  return (
    <HomeWrapper>
      {!loading ?
        <Fragment>
          <LatestMovies movie={latestMovies} />
          <LatestBooks book={latestBooks} />
        </Fragment>
        : null}
    </HomeWrapper>
  );
}
