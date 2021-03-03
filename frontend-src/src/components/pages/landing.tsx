import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { landingUrls } from "../../lib/constants";
import { getHistory, clearHistory } from "../../lib/history";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { SignInButtons } from "../login-button";
import _ from "lodash";
import { UserContext } from "../../lib/auth";
import * as firebase from "firebase";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const adjustHistorySizeBreakpoint = 425;
const truncateLength = 25;

// TODO: move this
type RecipeContent = {
  title: string;
};

type UserHistory = {
  url: string;
  content: RecipeContent;
};

function LoggedInHeader() {
  return (
    <div className="d-flex align-items-center">
      <Button
        className="login-button"
        onClick={() => firebase.auth().signOut()}
      >
        Sign out
      </Button>
      <div className="ml-auto">
        {/* <UserContext.Consumer>
          { value => <span> Hey, { value?.displayName?.split(' ')[0] } </span> }
        </UserContext.Consumer> */}
        <AiFillHeart size={24} />
      </div>
    </div>
  );
}

function LandingPage() {
  const history = useHistory();
  const [userHistory, setUserHistory] = useState<UserHistory[]>([]);
  const [smallMobile, setSmallMobile] = useState(false);

  useEffect(() => {
    window.onresize = () =>
      setSmallMobile(window.outerWidth < adjustHistorySizeBreakpoint);

    getHistory().then((val) => {
      const potentialHistory = val as UserHistory[];

      if (potentialHistory) {
        setUserHistory(potentialHistory);
      }
    });

    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <Container className="landing-page-body landing-page-container">
      <Row className="landing-page-container">
        <Col
          className={
            smallMobile
              ? "d-flex align-items-center flex-column"
              : "d-flex align-items-center"
          }
        >
          <div className={"shadow p-3 " + (smallMobile ? "m-2" : "")}>
            <UserContext.Consumer>
              {(value) => {
                if (!value) {
                  return <SignInButtons />;
                } else {
                  return <LoggedInHeader />;
                }
              }}
            </UserContext.Consumer>
            <hr />
            <h1>
              <UserContext.Consumer>
                {(value) => (
                  <div>
                    {" "}
                    Hello{(value?.displayName && ', ' + value?.displayName?.split(' ')[0]) ?? ""}{" "}
                    <span role="img" aria-label="waving hand emoji">
                      👋
                    </span>{" "}
                  </div>
                )}
              </UserContext.Consumer>
            </h1>
            <p>
              {" "}
              Thanks for using "<b>shorter.recipes</b>"{" "}
            </p>
            <p>
              {" "}
              Please use the search bar below to enter a url, simplify the
              recipe, and get cookin.
            </p>
            <hr />
            <div>
              {landingUrls.map((url, i) => {
                return (
                  <span key={url.url}>
                    <a rel="noopener noreferrer" target="_blank" href={url.url}>
                      {url.title}
                    </a>
                    {
                      // This is to ensure we don't put a bar at the very end of the list.
                      i !== landingUrls.length - 1 && <span> | </span>
                    }
                  </span>
                );
              })}
            </div>
          </div>
          {userHistory && userHistory.length > 0 && (
            <div
              className={
                "shadow p-3 d-flex justify-content-start align-items-center flex-column m-3"
              }
            >
              <div>History:</div>
              <hr
                style={{ width: "100%" }}
                className={smallMobile ? "m-2" : undefined}
              />
              <div className={smallMobile ? "d-flex flex-column" : undefined}>
                {userHistory.map((hist, i) => (
                  <div
                    key={i}
                    className="history-icon-parent"
                    onClick={(_) => history.push(`/search?url=${hist.url}`)}
                  >
                    <span> {i + 1}. </span>
                    <span className="history-icon">
                      {_.truncate(`${hist.content.title}`, {
                        length: truncateLength,
                      })}
                    </span>
                  </div>
                ))}
              </div>
              <div className={smallMobile ? "d-none" : undefined}>
                <hr style={{ width: "100%" }} />
                <div>
                  <Button
                    className="recipe-button"
                    onClick={(_) =>
                      clearHistory().then((_) => setUserHistory([]))
                    }
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
