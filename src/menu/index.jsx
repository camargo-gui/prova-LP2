import React from 'react';
import { Container, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Menu() {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <Link to="/user">
            <Button variant="primary" size="lg" className="mr-3" onClick={() => Link}>
              Cadastrar Usuário
            </Button>
          </Link>

          <Link to="/message">
            <Button variant="success" size="lg">
              Ver Mensagens
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
