import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <Form.Group>
        <Form.Label>Search</Form.Label>
        <Form.Control placeholder="Search for music" className="mb-2" />
        <Button className="mb-2">Search</Button>
      </Form.Group>
    </>
  );
};
