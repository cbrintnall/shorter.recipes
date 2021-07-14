import React, { useEffect, useRef, useState } from 'react';
import settings from '../settings';
import { isFavorite, markFavorite, removeFavorite } from '../lib/favorites';
import StateManager from '../lib/stateManager';
import { events } from '../lib/constants';
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Container
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export type Results = {
  title?: string
};

export function SearchBar() {
  const [url, setUrl] = useState("");
  const searchEntryRef = useRef(null);

  console.log(url)

  return (
    <Container fluid className="search-bar">
      <Row className="search-entry" ref={searchEntryRef}>
        <InputGroup className="search-entry-group">
          <FormControl
            style={{ transform: "translateY(-1px)" }}
            className="search-entry-input"
            placeholder="Paste a URL.."
            aria-label="URL search"
            value={url}
            onInput={(e: React.FormEvent<HTMLInputElement>)=> setUrl(e.currentTarget.innerText)}
            onChange={e => setUrl(e.target.value)}
          />
          <Button
            style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", zIndex: 3 }}
            as={InputGroup.Append}
            variant="secondary"
          >
            <a
              href={`/recipe?url=${url}`}
              style={{ color: 'whitesmoke' }}
            >
              Go!
            </a>
          </Button>
        </InputGroup>
      </Row>
    </Container>
  )
}