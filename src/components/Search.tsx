import { Form, Row, Col, Button } from "react-bootstrap"
import * as Icon from 'react-bootstrap-icons';

export default function Search( ) {
    return (
        <Form>
            <Row className="bg-dark py-2" >
                <Col className="ms-auto" xs="auto">
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        className=" mr-sm-2"
                    />
                </Col>
                <Col xs="auto">
                    <Button variant='dark' className="btn btn-dark" type="submit">
                        <Icon.Search color="#ad7552"/>
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}