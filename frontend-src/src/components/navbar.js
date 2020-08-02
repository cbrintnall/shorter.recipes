import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from 'react-router-dom';

const navLinks = [
  {
    text: "Search",
    path: "/search"
  }
]

export default function BaseNavbar(props) {
  const history = useHistory();

  return (
    <Nav className="justify-content-center">
      {
        navLinks.map(link =>
          <Nav.Item
            key={link.text}
          >
            <Nav.Link
              onClick={() => history.push(link.path)}
            >
              {link.text}
            </Nav.Link>
          </Nav.Item>
        )
      }
    </Nav>
  )
}