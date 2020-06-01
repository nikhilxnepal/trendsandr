import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Theme } from "./style";
import { GlobalContext } from '../../../contexts/GlobalContext';
import ReactPlayer from "react-player"

export default function Video(props) {
  const videoId = props.match.params.id;
  const [video, setVideo] = useState({ category: [] });
  const { loading, toggleLoading } = useContext(GlobalContext);
  useEffect(() => {
    toggleLoading(true)
    Axios.get(`https://ent-api-dev.herokuapp.com/api/v1/youtubevideos/${videoId}`)
      .then((res) => {
        setVideo(res.data)
        toggleLoading(false)
      })
      .catch((err) => console.error(err));
  }, [videoId, props.match.params.id]);

  return (
    <Theme>
      {!loading ? <Container className="mt-5" fluid>
        <Row>
          <Col md="6">
            <ReactPlayer width={'100%'} height={'100%'}
              url={video.watchlink} />
          </Col>
          <Col md="6">
            <h2>{video.name}</h2>
            <p align="justify">{video.description}</p>
            <ul className="item-description">
              <li><span>Uploaded by: </span> <a
                target="_blank"
                href={video.uploadedchannel}
              >
                {video.uploadedby}
              </a></li>
              <li>
                <span>Category: </span>
                {video.category.map((category) => {
                  return <ins key={category.id}>{category.name}</ins>;
                })}
              </li>
            </ul>
            <a
              target="_blank"
              className="btn btn-success mr-3"
              href={video.watchlink}
            >
              {video.watchtext}
            </a>
          </Col>
        </Row>
      </Container> : null}
    </Theme>
  );
}
