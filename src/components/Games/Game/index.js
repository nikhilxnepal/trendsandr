import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Theme } from "./style";
import { GlobalContext } from '../../../contexts/GlobalContext';

export default function Game(props) {
  const gameId = props.match.params.id;
  const [game, setGame] = useState({ category: [] });
  const { loading, toggleLoading } = useContext(GlobalContext);
  useEffect(() => {
    toggleLoading(true)
    Axios.get(`https://ent-api-dev.herokuapp.com/api/v1/games/${gameId}`)
      .then((res) => {
        setGame(res.data)
        toggleLoading(false)
      })
      .catch((err) => console.error(err));
  }, [gameId, props.match.params.id]);

  return (
    <Theme>
      { !loading ? <Container className="mt-5" fluid>
        <Row>
          <Col md="4">
            <img className="item-image mb-3" src={game.imagepath} alt="" />
          </Col>
          <Col md="8">
            <h2>{game.name}</h2>
            <p align="justify">{game.description}</p>
            <ul className="item-description">
              <li><span>Rating: </span> {game.rating}</li>
              <li><span>Released date: </span>{game.releasedate}</li>
              <li>
              <span>Category: </span>
                {game.category.map((category) => {
                  return <ins key={category.id}>{category.name}</ins>;
                })}
              </li>
            </ul>
            <a
              target="_blank"
              className="btn btn-success mr-3"
              href={game.downloadlink}
            >
              {game.downloadtext}
            </a>
          </Col>
        </Row>
      </Container> : null }
    </Theme>
  );
}
