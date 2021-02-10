import React, { useState, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import StateManager from '../../lib/stateManager';
import { events } from '../../lib/constants';

const stateManager = StateManager.getInstance();

type Instruction = {
  text: string;
};

type ChecklistProps = {
  content: string;
};

type IngredientsListProps = {
  ingredients: string[]
};

type InstructionsListProps = {
  instructions: Instruction[]
};

type ResultsProps = {
  data: Result
};

type Result = {
  instructions: Instruction[];
  ingredients: string[];
};

function ChecklistItem(props: ChecklistProps) {
  const [ disabled, setDisabled ] = useState(false);

  return (
    <ListGroup.Item
      className={disabled ? "result-item checked" : "result-item"}
    >
      <Row>
        <Col
          className="d-flex justify-content-start align-items-center"
          lg={10}
          md={10}
          sm={10}
          xs={10}
        >
          <span className="recipe-text">{ disabled ? <s> { props.content } </s> : props.content }</span>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <div
            className="search-icon-parent result-icon-parent"
            onClick={_ => setDisabled(!disabled)}
          >
            {
              disabled ? <AiOutlineClose size={24}/> : <AiOutlineCheck size={24} />
            }
          </div>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

function IngredientsList(props: IngredientsListProps) {
  return (
    <ListGroup variant={"flush"}>
      {
        props.ingredients.map(ingredient => {
          return (
            <ChecklistItem
              content={ingredient}
              key={ingredient}
            />
          )
        })
      }
    </ListGroup>
  )
}

function InstructionsList(props: InstructionsListProps) {
  return (
    <ListGroup variant={"flush"}>
      {
        props.instructions.map(instruction => {
          return (
            <ChecklistItem
              content={instruction.text}
              key={instruction.text}
            />
          )
        })
      }
    </ListGroup>
  )
}

function MobileLayout(data: Result) {
  const swipeVelocityThreshold = .4;

  const [ activeTab, setActiveTab ] = useState("ingredients");

  const handlers = useSwipeable({
    onSwipedRight: data => {
      if (data.velocity >= swipeVelocityThreshold) {
        setActiveTab(activeTab  === "ingredients" ? "instructions" : "ingredients");
      }
    },
    onSwipedLeft: data => {
      if (data.velocity >= swipeVelocityThreshold) {
        setActiveTab(activeTab  === "ingredients" ? "instructions" : "ingredients");
      }
    }
  })

  const listRef = useRef(null);

  useEffect(() => {
    window.onscroll = () => {
      stateManager.push(events.dimSearchBar, { 
        atBottom: (window.innerHeight + window.scrollY) >= document.body.scrollHeight,
        percentage: (window.innerHeight + window.scrollY) / document.body.scrollHeight
      })
    }
  }, [])

  return (
    <Row className="mobile-results-page" {...handlers}>
      <Col ref={listRef} style={{ padding: "0px" }}>
        <Tabs activeKey={activeTab} onSelect={setActiveTab as any}>
          <Tab eventKey="ingredients" title="Ingredients" tabClassName="mobile-tab">
            <Row className="mobile-result">
              {
                data.ingredients &&
                <IngredientsList ingredients={data.ingredients} />
              }
            </Row>
          </Tab>
          <Tab eventKey="instructions" title="Instructions" tabClassName="mobile-tab">
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

function DesktopLayout(data: Result) {
  return (
    <Row className="desktop-results-page">
      {
        data.ingredients &&
        <Col className="important" style={{ marginTop: "20px" }}>
          <h2> Ingredients: </h2>
          <IngredientsList ingredients={data.ingredients} />
        </Col>
      }
      {
        data.instructions &&
        <Col className="important" style={{ marginTop: "20px" }}>
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

export default function ResultsPage(props: ResultsProps) {
  const { data } = props;

  return (
    <Container fluid style={{ margin: "0px" }}>
      {
        MobileLayout(data)
      }
      {
        DesktopLayout(data)
      }
    </Container>
  )
}