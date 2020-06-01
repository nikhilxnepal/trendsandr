import React, { useState, useEffect, useContext, Fragment } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Theme } from "./style";
import Axios from "axios";
import EmptyState from "../shared/empty";
import { GlobalContext } from "../../contexts/GlobalContext";
import ReactPaginate from "react-paginate";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import ReactPlayer from "react-player";

export default function Videos(props) {
  const search = props.location.state?.search
    ? props.location.state.search
    : "";
  const category = props.match.params?.id ? props.match.params.id : "";

  const [latestVideos, setlatestVideos] = useState([]);
  const [page, setPage] = useState({
    perPage: 15,
    currentPage: 0,
  });
  const [pageCount, setPageCount] = useState(0);

  const { loading, toggleLoading } = useContext(GlobalContext);
  const fetchData = async () => {
    toggleLoading(true);
    const res = await Axios.get(
      `https://ent-api-dev.herokuapp.com/api/v1/youtubevideos?search=${search}&category=${category}&page=${
        page.currentPage + 1
      }&limit=${page.perPage}`
    );
    setlatestVideos(res.data.data);
    setPageCount(res.data.count / 15);
    toggleLoading(false);
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
  };

  return (
    <Theme>
      <Fragment>
        {!loading ? (
          <Container fluid>
            <div className="clearfix mt-5 mb-5">
              <h4 className="float-left" className="title">
                Videos
              </h4>
            </div>
            <Row>
              {latestVideos.length > 0 ? (
                latestVideos.map(function (video) {
                  return (
                    <Col md={4} key={video.id} className="list-item">
                      <Link to={`/youtubevideos/${video.id}`}>
                        <Card>
                          <ReactPlayer
                            width={"100%"}
                            height={"100%"}
                            url={video.watchlink}
                          />
                          <Card.Body className="ellipsis">
                            <span>{video.name}</span>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  );
                })
              ) : (
                <EmptyState />
              )}
            </Row>
            <Row className="justify-content-center">
              {latestVideos.length > 0 ? (
                <ReactPaginate
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
                  activeClassName={"active"}
                />
              ) : null}
            </Row>
          </Container>
        ) : null}
      </Fragment>
    </Theme>
  );
}
