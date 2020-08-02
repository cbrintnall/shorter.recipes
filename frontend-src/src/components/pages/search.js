import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { AiFillExperiment, AiOutlineDown } from 'react-icons/ai';

import constants from '../../settings';
import { useHistory } from 'react-router-dom';

const mainComponentStyle = { height: "100%", width: "100%" };

function SearchBar ({ props }) {
  return (
    <Container fluid className="search-bar">
      <Row className="search-icons">
        <AiOutlineDown className="search-icon" />
      </Row>
      <Row className="search-entry">
        <InputGroup class="search-entry-group">
          <FormControl
            className="search-entry-input"
            placeholder="Paste a URL.."
          />
        </InputGroup>
      </Row>
    </Container>
  )
}

export default function SearchPage({ props }) {
  const inputRef = React.useRef();
  const [url, setUrl] = useState("");
  const history = useHistory();
  const errors = [];

  // Suggest a sample URL if none are entered.
  if (url.length === 0) {
    errors.push(
      <a
        onClick={() => {
          setUrl(constants.urls.sampleUrl)
          inputRef.current.value = constants.urls.sampleUrl
        }}
        style={{ color: "#11111", cursor: "pointer" }}
      >
        {"No URL entered, try something like:"}
        <span
          style={{
            backgroundColor: constants.colors.primary,
            borderRadius: "10px",
            paddingLeft: "6px",
            paddingright: "6px"
          }}
        >
          {constants.urls.sampleUrl}
        </span>
      </a>
    )
  }

  const isSmaller = window.innerWidth <= constants.breakpoints.smaller;

  return (
    <Container fluid style={{ ...mainComponentStyle, padding: "0px" }}>
      <SearchBar />
      <Row style={{ ...mainComponentStyle, margin: "0px" }}>
        <Col style={{ ...mainComponentStyle, padding: "0px" }}>
          <div className="search-box">
            <h3 style={{ color: "white" }}> Paste {isSmaller ? "" : "your"} recipe's URL: </h3>
            <InputGroup size={isSmaller ? "sm" : "lg"}>
              <FormControl
                ref={inputRef}
                onInput={(e) => setUrl(e.target.value)}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  disabled={!url}
                  style={{
                    color: !url ? "white" : "#111111",
                    backgroundColor: url ? "white" : "#111111"
                  }}
                  onClick={() => history.push(`/recipe?url=${url}`)}
                >
                  Search
                                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div>
            {
              errors &&
              <ul className="errors">
                {
                  errors.map(error =>
                    <li key={error}> {error} </li>
                  )
                }
              </ul>
            }
          </div>
        </Col>
      </Row>
    </Container>
  )
}