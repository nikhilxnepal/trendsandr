import React, { useState, useEffect, useContext, Fragment } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Theme } from "./style";
import Axios from "axios";
import EmptyState from "../shared/empty";
import { GlobalContext } from '../../contexts/GlobalContext';
import ReactPaginate from 'react-paginate';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function Movies(props) {
  const search = props.location.state?.search
    ? props.location.state.search
    : "";
  const genre = props.match.params?.id ? props.match.params.id : "";
  const country = props.match.params?.countryname
    ? props.match.params.countryname
    : "";

  const [latestMovies, setlatestMovies] = useState([]);
  const [page, setPage] = useState({
    perPage: 15,
    currentPage: 0
  });
  const [pageCount, setPageCount] = useState(0);

  const { loading, toggleLoading } = useContext(GlobalContext);
  const fetchData = async () => {
    toggleLoading(true)
    const res = await Axios.get(
      `https://ent-api-dev.herokuapp.com/api/v1/movies?search=${search}&genre=${genre}&country=${country}&page=${page.currentPage + 1}&limit=${page.perPage}`
    );
    setlatestMovies(res.data.data);
    setPageCount(res.data.count / 15)
    toggleLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [search, genre, country]);

  useEffect(() => {
    fetchData();
  }, [search, genre, page]);

  const handlePageChange = (e) => {
    const selectedPage = e.selected;
    setPage({
      ...page,
      currentPage: selectedPage,
    });
  }

  return (
    <Fragment>
    {!loading ? <Container fluid>
      <div className="clearfix mt-5 mb-5">
        <h4 className="float-left" className="title">Movies</h4>
      </div>
      <Row>
        {latestMovies.length > 0 ? latestMovies.map(function (movie) {
          return (
            <Col md={2} key={movie.id} className="list-item">
              <Link to={`/movies/${movie.id}`}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={movie.imagepath}
                  />
                  <Card.Body className="ellipsis">
                    <span>{movie.name}</span>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        }) : <EmptyState />}
      </Row>
      <Row className="justify-content-center">
      {latestMovies.length > 0 ? <ReactPaginate
          previousLabel={<FaAngleLeft />}
          nextLabel={<FaAngleRight />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          forcePage={page.currentPage}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} /> : null }
      </Row>
    </Container> : null }
    </Fragment>
    )
}
