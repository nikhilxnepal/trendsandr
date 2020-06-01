import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Theme } from "./style";
import { GlobalContext } from '../../../contexts/GlobalContext';

export default function Book(props) {
  const bookId = props.match.params.id;
  const [book, setBook] = useState({ genre: [] });
  const { loading, toggleLoading } = useContext(GlobalContext);
  useEffect(() => {
    toggleLoading(true)
    Axios.get(`https://ent-api-dev.herokuapp.com/api/v1/books/${bookId}`)
      .then((res) => {
        setBook(res.data)
        toggleLoading(false)
      })
      .catch((err) => console.error(err));
  }, [bookId, props.match.params.id]);

  return (
    <Theme>
      { !loading ? <Container className="mt-5" fluid>
        <Row>
          <Col md="4">
            <img className="item-image mb-3" src={book.imagepath} alt="" />
          </Col>
          <Col md="8">
            <h2>{book.name}</h2>
            <p align="justify" className="mt-3">{book.description}</p>
            <ul className="item-description">
              <li><span>Rating: </span>{book.rating}</li>
              <li><span>Released date: </span>{book.releasedate}</li>
              <li><span>Author: </span>{book.author}</li>
              <li><span>Publisher: </span>{book.publisher}</li>
            </ul>
            <a
              target="_blank"
              className="btn btn-success mr-3"
              href={book.downloadlink}
            >
              {book.downloadtext}
            </a>
            <a target="_blank" className="btn btn-warning" href={book.readlink}>
              {book.readtext}
            </a>
          </Col>
        </Row>
      </Container> : null }
    </Theme>
  );
}
