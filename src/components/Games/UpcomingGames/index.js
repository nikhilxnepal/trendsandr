import React, { useState, useEffect, useContext, Fragment } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Theme } from "./style";
import Axios from "axios";
import { GlobalContext } from '../../../contexts/GlobalContext';
import EmptyState from '../../shared/empty/index';
import ReactPaginate from 'react-paginate';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function UpcomingGames() {

    const [upcomingGames, setupcomingGames] = useState([]);
    const { loading, toggleLoading } = useContext(GlobalContext);
    const [page, setPage] = useState({
        perPage: 15,
        currentPage: 0
      });
      const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        toggleLoading(true)
        const res = await Axios.get(`https://ent-api-dev.herokuapp.com/api/v1/games/upcoming?page=${page.currentPage + 1}&limit=${page.perPage}`)
        setupcomingGames(res.data.data);
        setPageCount(res.data.count / 15)
        toggleLoading(false)
    };

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
                <h4 className="float-left" className="title">Upcoming Games</h4>
            </div>
            <Row>
                {upcomingGames.length > 0 ? upcomingGames.map(function (game) {
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
                }): <EmptyState />}
            </Row>
            <Row className="justify-content-center">
            {upcomingGames.length > 0 ?  <ReactPaginate
          previousLabel={<FaAngleLeft />}
          nextLabel={<FaAngleRight />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          forcePage={page.currentPage}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} /> : null }
      </Row>
        </Container> : null }
    </Fragment>
    );
}