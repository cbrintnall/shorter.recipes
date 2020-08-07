import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { landingUrls } from '../../lib/constants';
import { useHistory } from 'react-router-dom';

function LandingPage(props) {
  const history = useHistory();

  return (
    <Container className="landing-page-body landing-page-container">
      <Row className="landing-page-container">
        <Col className="d-flex align-items-center">
          <div>
            <h1> Hello! <span role="img" aria-label="waving hand emoji">👋</span> </h1>
            <p> Please use the search bar below to enter a url, and simplify the recipe. </p>
            <hr />
            <div>
              {
                landingUrls.map((url, i) => {
                    return (
                      <span>
                        <a
                          key={url.url}
                          rel="noopener noreferrer"
                          target="_blank"
                          href={url.url}
                        >
                          {url.title}
                        </a>
                        {
                          // This is to ensure we don't put a bar at the very end of the list.
                          i !== landingUrls.length-1 && <span> | </span>
                        }
                      </span>
                    )
                })
              }
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default LandingPage;