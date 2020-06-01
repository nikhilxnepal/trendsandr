import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function EmptyState() {

    const classes = {
        image:{
            width: '30%'
        }
    }
    
    return (
        <Container className="mt-5 mb-5" fluid>
            <Row>
                <Col md="12" className="flex justify-content-center">
                <img className="img" style={classes.image} src="/images/empty.svg" />
                </Col>
            </Row>  
        </Container>
    );
}
