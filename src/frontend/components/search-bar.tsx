import React, { useState } from 'react';
import {
  Col,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

export type Results = {
  title?: string
};

export function SearchBar() {
  const [url, setUrl] = useState("");

  return (
    <>
      <a href="/" className="search-bar-header">
        <h1> 
          shorter.recipes 
        </h1>
      </a>
      <Col className="search-bar-input">
        <InputGroup className="search-entry-group">
          <FormControl
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
      </Col>
    </>
  )
}