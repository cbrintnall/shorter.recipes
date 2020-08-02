import React, { useState } from 'react';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import constants from '../../settings';
import { getUrl } from '../../module/getData';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function IngredientsList(props) {
  const isSmaller = window.innerWidth <= constants.breakpoints.smaller;
  return (
    <ListGroup variant={isSmaller ? "flush" : ""}>
      {
        props.ingredients.map(ingredient => {
          return (
            <ListGroup.Item
              className="result-item"
              key={ingredient}
            >
              {ingredient}
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
  )
}

function InstructionsList(props) {
  const isSmaller = window.innerWidth <= constants.breakpoints.smaller;

  return (
    <ListGroup variant={isSmaller ? "flush" : undefined}>
      {
        props.instructions.map(instruction => {
          return (
            <ListGroup.Item
              className="result-item"
              key={instruction.text}
            >
              {instruction.text}
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
  )
}

function MobileLayout(props, data) {
  return (
    <Row className="mobile-results-page">
      <Col>
        <Tabs defaultActiveKey="ingredients">
          <Tab eventKey="ingredients" title="Ingredients">
            <Row className="mobile-result">
              {
                data.ingredients &&
                <IngredientsList ingredients={data.ingredients} />
              }
            </Row>
          </Tab>
          <Tab eventKey="instructions" title="Instructions">
            <Row className="mobile-result">
              {
                data.instructions &&
                <InstructionsList instructions={data.instructions} />
              }
            </Row>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  )
}

function DesktopLayout(props, data) {
  return (
    <Row className="desktop-results-page">
      {
        data.ingredients &&
        <Col className="important">
          <h2> Ingredients: </h2>
          <IngredientsList ingredients={data.ingredients} />
        </Col>
      }
      {
        data.instructions &&
        <Col className="important">
          <h2> Instructions: </h2>
          <InstructionsList instructions={data.instructions} />
        </Col>
      }
      {
        Object.keys(data).length === 0 &&
        <Col style={{ textAlign: "center" }}>
          <h2> Fetching your recipe.. </h2>
        </Col>
      }
    </Row>
  )
}

export default function ResultsPage(props) {
  const params = parse(props.location.search)
  const [data, setData] = useState({})
  const [querying, setQuerying] = useState(false)

  const dataNeeded = () => !querying && !hasData()
  const hasData = () => Object.keys(data).length > 0

  if (!params.url) {
    return <Redirect to={'/search'} />
  }

  if (dataNeeded()) {
    setQuerying(true);

    getUrl(params.url)
      .then(setData)
      .catch(err => {
        // TODO: Handle error
        console.log(err)
      });
  }

  const isSmaller = window.innerWidth <= constants.breakpoints.smaller;

  return (
    <Container fluid style={{ margin: "0px" }}>
      {
        data.title &&
        <Row style={{ textAlign: "center" }}>
          <Col>
            {
              isSmaller ? <h2> {data.title} </h2> : <h1> {data.title} </h1>
            }
          </Col>
        </Row>
      }
      {
        hasData() &&
        <hr />
      }
      {
        MobileLayout(props, data)
      }
      {
        DesktopLayout(props, data)
      }
    </Container>
  )
}