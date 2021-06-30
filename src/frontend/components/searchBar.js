import settings from '../settings';
import React, { useRef, useState, useEffect } from 'react';
import { isFavorite, markFavorite, removeFavorite } from '../lib/favorites';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {
  AiOutlineExperiment,
  AiOutlineDown,
  AiOutlineClose,
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineHeart,
  AiFillHeart
} from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import { useHistory, generatePath } from 'react-router-dom';
import StateManager from '../lib/stateManager';
import { events } from '../lib/constants';

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

export default function SearchBar(props) {
  // Dimmed is used to make sure covered up ingredients / instructions are still visible
  const [searchBarOpacity, setSearchBarOpacity] = useState(100);
  const [url, setUrl] = useState(props.url || "");
  const [resultIsFavorited, setResultIsFavorited] = useState(false);
  const history = useHistory();
  const searchEntryRef = useRef(null);

  const hasValidResult = () => !!(props.results && props.results.title)

  useEffect(_ => {
    if (url) {
      isFavorite(url)
        .then(setResultIsFavorited);
    }
  }, [url])

  useEffect(_ => {
    toggleSearchBarState()

    StateManager
      .getInstance()
      .subscribe(
        events.dimSearchBar,
        payload => {
          const { hidden, visible } = settings.searchBar.opacity;
          setSearchBarOpacity(payload.percentage >= .9 ? hidden : visible);
        }
      )
  }, [])

  return (
    <Container fluid className="search-bar" style={{ opacity: `${searchBarOpacity}%`, display: searchBarOpacity === 0 ? "none" : "inherit" }}>
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
                  onClick={_ => setSearchBarOpacity(settings.searchBar.opacity.visible)}
                />
                :
                <AiOutlineEyeInvisible
                  className="search-icon"
                  size={24}
                  onClick={_ => setSearchBarOpacity(settings.searchBar.opacity.hidden)}
                />
            }
          </div>
          {
            hasValidResult() &&
            <div className="search-icon-parent" style={{ display: "inline-block" }}>
              {
                resultIsFavorited ?
                  <AiFillHeart
                    className="search-icon"
                    size={24}
                    onClick={_ =>
                      removeFavorite(props.url)
                        .then(_ => setResultIsFavorited(false))
                    }
                  />
                  :
                  <AiOutlineHeart
                    className="search-icon"
                    size={24}
                    onClick={_ =>
                      markFavorite(props.url, props.results)
                        .then(_ => setResultIsFavorited(true))
                    }
                  />
              }
            </div>
          }
          {
            hasValidResult() &&
            <div className="search-icon-parent" style={{ display: "inline-block" }}>
              {
                <FiShare
                  className="search-icon"
                  size={24}
                />
              }
            </div>
          }
          <div className="search-icon-parent disabled-icon" style={{ display: "inline-block" }}>
            <AiOutlineExperiment
              className="search-icon"
              size={24}
            />
          </div>
          {
            hasValidResult() ?
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
                    onClick={_ => history.push(generatePath("/search"))}
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