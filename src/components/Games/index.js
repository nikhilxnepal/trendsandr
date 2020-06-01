import React, { useState, useEffect, useContext, Fragment } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Theme } from "./style";
import Axios from "axios";
import EmptyState from "../shared/empty";
import { GlobalContext } from '../../contexts/GlobalContext';
import ReactPaginate from 'react-paginate';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function Games(props) {
  const search = props.location.state?.search
    ? props.location.state.search
    : "";
  const category = props.match.params?.id ? props.match.params.id : "";

  const [latestGames, setlatestGames] = useState([]);
  const [page, setPage] = useState({
    perPage: 15,
    currentPage: 0
  });
  const [pageCount, setPageCount] = useState(0);

  const { loading, toggleLoading } = useContext(GlobalContext);
  const fetchData = async () => {
    toggleLoading(true)
    const res = await Axios.get(
      `https://ent-api-dev.herokuapp.com/api/v1/games?search=${search}&category=${category}&page=${page.currentPage + 1}&limit=${page.perPage}`
    );
    setlatestGames(res.data.data);
    setPageCount(res.data.count / 15)
    toggleLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [search, category]);

  useEffect(() => {
    fetchData();
  }, [search, category, page]);

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
        <h4 className="float-left" className="title">Games</h4>
      </div>
      <Row>
        {latestGames.length > 0 ? latestGames.map(function (game) {
          return (
            <Col md={2} key={game.id} className="list-item">
              <Link to={`/games/${game.id}`}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={game.imagepath}
                  />
                  <Card.Body className="ellipsis">
                    <span>{game.name}</span>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        }) : <EmptyState />}
      </Row>
      <Row className="justify-content-center">
      {latestGames.length > 0 ? <ReactPaginate
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
