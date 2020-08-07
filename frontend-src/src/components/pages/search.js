import React, { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { parse } from 'query-string';
import { 
  AiOutlineExperiment, 
  AiOutlineDown, 
  AiOutlineClose,
  AiOutlineEyeInvisible,
  AiOutlineEye
} from 'react-icons/ai';
import { getUrl } from '../../module/getData';
import ResultsPage from './results';
import { useHistory } from 'react-router-dom';
import StateManager from '../../lib/stateManager';
import { events } from '../../lib/constants';
import LandingPage from './landing';

const mainComponentStyle = { height: "100%", width: "100%" };

const toggleSearchBarState = () => {
  const buttonVariable = "--search-bar-animation"
  const barVariable = "--search-bar-animation-state"
  const base = document.documentElement.style
  const currentButtonState = base.getPropertyValue(buttonVariable)
  const currentBarState = base.getPropertyValue(barVariable);

  base.setProperty(
    buttonVariable,
    currentButtonState === "searchClosed" ? "searchOpen" : "searchClosed"
  )

  base.setProperty(
    barVariable,
    currentBarState === "searchBarOpen" ? "searchBarClosed" : "searchBarOpen"
  )
}

function SearchBar(props) {
  // Dimmed is used to make sure covered up ingredients / instructions are still visible
  const [searchBarOpacity, setSearchBarOpacity] = useState(100);
  const [url, setUrl] = useState("");
  const history = useHistory();
  const searchEntryRef = useRef(null);

  // useEffect(item => {
  //   console.log(searchEntryRef.current.offsetHeight)
  //   document.documentElement.style.setProperty("--move-bar-height", searchEntryRef.current.offsetHeight);
  // }, [ searchEntryRef.current ])

  useEffect(_ => {
    toggleSearchBarState()

    StateManager
      .getInstance()
      .subscribe(
        events.dimSearchBar,
        payload => {
          // TODO: Look into a better way to do this
          // if (payload.percentage >= .8) {
          //   setSearchBarOpacity(100 - (payload.percentage * 100))
          // } else {
          //   setSearchBarOpacity(100)
          // }
        }
      )
  }, [])

  return (
    <Container fluid className="search-bar" style={{ opacity: `${searchBarOpacity}%`, display: searchBarOpacity == 0 ? "none" : "inherit" }}>
      <Row className="search-icons" noGutters={true} style={{ marginBottom: "10px" }}>
        <Col>
          <div className="search-icon-parent" style={{ display: "inline-block" }}>
            <AiOutlineDown
              className="search-icon search-icon-toggle"
              size={24}
              onClick={_ => toggleSearchBarState()}
            />
          </div>
          <div className="search-icon-parent" style={{ display: "inline-block" }}>
            {
              searchBarOpacity < 100 ?
              <AiOutlineEye
                className="search-icon"
                size={24}
                onClick={_ => setSearchBarOpacity(100)}
              />
              :
              <AiOutlineEyeInvisible
                className="search-icon"
                size={24}
                onClick={_ => setSearchBarOpacity(30)}
              />
            }
          </div>
          <div className="search-icon-parent disabled-icon" style={{ display: "inline-block" }}>
            <AiOutlineExperiment
              className="search-icon"
              size={24}
            />
          </div>
          {
              props.results && props.results.title ?
              <div className="search-icon-divider" style={{ display: "inline-block", float: "right" }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="search-bar-info"
                  href={props.url}
                  style={{ color: "#55DDE0" }}
                >
                  <span
                    role="img"
                    aria-label="chain emoji"
                    aria-describedby="chain emoji representing nearby link text"
                  >
                    🔗
                </span>
                  {props.results.title}
                </a>
                <div className="search-icon-parent" style={{ display: "inline-block" }}>
                  <AiOutlineClose
                    className="search-icon"
                    size={24}
                    onClick={_ => history.push("/search")}
                  />
                </div>
              </div>
              :
              <div className="search-icon-divider" style={{ display: "inline-block", float: "right" }}>
                {props.searching && <span style={{ color: "white" }}> Searching... </span>}
                {props.searchError && <span style={{ color: "#cc0000" }}> Error while searching! </span>}
              </div>
          }
        </Col>
      </Row>
      <Row className="search-entry" ref={searchEntryRef}>
        <InputGroup className="search-entry-group">
          <FormControl
            style={{ transform: "translateY(-1px)" }}
            className="search-entry-input"
            placeholder="Paste a URL.."
            aria-label="URL search"
            value={url}
            onInput={e => setUrl(e.target.value)}
            onChange={e => setUrl(e.target.value)}
          />
          <Button
            style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", zIndex: "3" }}
            as={InputGroup.Append}
            variant="secondary"
            onClick={() => {
              if (url) {
                // TODO: this should stay open if there is an error, not disappear.
                toggleSearchBarState();

                history.push(`/search?url=${url}`);
              }
            }}
          >
            Go!
          </Button>
        </InputGroup>
      </Row>
    </Container>
  )
}

export default function SearchPage(props) {
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState({});
  const { search } = props.history.location;
  const { url } = parse(search)

  useEffect(_ => {
    if (url) {
      // Set searching to true again
      setSearching(true);
      // Reset any search errors
      setSearchError("");

      getUrl(url)
        .then(results => {
          if (results.error) {
            setSearchError("Error processing URL.")
          } else {
            setResults(results);
          }
        })
        .catch(err => {
          setSearchError("Error requesting URL.")
        })
        .finally(_ => {
          setSearching(false);
        })
    } else {
      setResults({})
    }
  }, [url])

  return (
    <Container fluid style={{ ...mainComponentStyle, padding: "0px" }}>
      <SearchBar
        results={results}
        url={url}
        searching={searching}
        searchError={searchError}
      />
      {
        Object.keys(results).length > 0 ?
        <ResultsPage data={results} /> :
        <LandingPage />
      }
    </Container>
  )
}