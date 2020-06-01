import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Theme } from "./style";
import { GlobalContext } from '../../../contexts/GlobalContext';

export default function Movie(props) {
  const movieId = props.match.params.id;
  const [movie, setMovie] = useState({ genre: [] });
  const { loading, toggleLoading } = useContext(GlobalContext);
  useEffect(() => {
    toggleLoading(true)
    Axios.get(`https://ent-api-dev.herokuapp.com/api/v1/movies/${movieId}`)
      .then((res) => {
        setMovie(res.data)
        toggleLoading(false)
      })
      .catch((err) => console.error(err));
  }, [movieId, props.match.params.id]);

  return (
    <Theme>
      { !loading ? <Container className="mt-5" fluid>
        <Row>
          <Col md="4">
            <img className="item-image mb-3" src={movie.imagepath} alt="" />
          </Col>
          <Col md="8">
            <h2>{movie.name}</h2>
            <p align="justify">{movie.description}</p>
            <ul className="item-description">
              <li><span>Rating: </span> {movie.rating}</li>
              <li><span>Released date: </span>{movie.releasedate}</li>
              <li><span>Country: </span>{movie.country}</li>
              <li>
              <span>Genre: </span>
                {movie.genre.map((genre) => {
                  return <ins key={genre.id}>{genre.name}</ins>;
                })}
              </li>
            </ul>
            <a
              target="_blank"
              className="btn btn-success mr-3"
              href={movie.downloadlink}
            >
              {movie.downloadtext}
            </a>
            <a
              target="_blank"
              className="btn btn-warning"
              href={movie.watchlink}
            >
              {movie.watchtext}
            </a>
          </Col>
        </Row>
      </Container> : null }
    </Theme>
  );
}
