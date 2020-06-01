import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Theme } from "./style";
import Axios from "axios";
import EmptyState from '../../shared/empty/index';
import ReactPaginate from 'react-paginate';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function PopularBooks() {
  const [popularBooks, setpopularBooks] = useState([]);
  const [page, setPage] = useState({
    perPage: 15,
    currentPage: 0
  });
  const [pageCount, setPageCount] = useState(0);
  const { loading, toggleLoading } = useContext(GlobalContext);
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    toggleLoading(true)
    const res = await Axios.get(
      `https://ent-api-dev.herokuapp.com/api/v1/books/popular`
    );
    setpopularBooks(res.data.data);
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
    <Theme>
      { !loading ? <Container fluid>
        <div className="clearfix mt-5 mb-5">
          <h4 className="float-left" className="title">Popular Books</h4>
        </div>
        <Row>
          {popularBooks.length > 0 ? popularBooks.map(function (book) {
            return (
              <Col md={2} key={book.id} className="list-item">
                <Link to={`/books/${book.id}`}>
                  <Card>
                    <Card.Img variant="top" src={book.imagepath} />
                    <Card.Body className="ellipsis">
                      <span className="linker">{book.name}</span>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          }) : <EmptyState />}
        </Row>
        <Row className="justify-content-center">
        {popularBooks.length > 0 ? <ReactPaginate
          previousLabel={<FaAngleLeft />}
          nextLabel={<FaAngleRight />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          forcePage={page.currentPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} /> : null }
      </Row>
      </Container> : null }
    </Theme>
  );
}
