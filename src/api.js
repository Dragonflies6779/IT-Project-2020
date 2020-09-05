import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:3000";

function getAuthors() {
  const endpoint = BASE_URL + `/author-management`;
  console.log("getAuthors");
  return fetch(endpoint).then(res => res.json());
}

export function getAuthor(id) {
  const endpoint = BASE_URL + `/author-management/${id}`;
  console.log("getAuthor");
  return fetch(endpoint).then(res => {
    console.log(res);
  });
}

export function addAuthor(author) {
  const { id, first_name, last_name } = author;
  if (!id || !first_name || !last_name) {
    alert("must include all fields");
    return;
  }

  console.log({
    first_name,
    last_name
  });
  const endpoint = BASE_URL + `/author-management/`;
  console.log("addAuthor");
  // console.log(author);
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id,
      first_name,
      last_name
    })
  }).then(res => window.location.reload());
}

export function updateAuthor(author) {
  const { id, first_name, last_name } = author;
  if (!id) {
    alert("must include an id");
    return;
  }
  if (!first_name || !last_name) {
    alert("must include a first name or last name to update");
    return;
  }

  console.log({
    first_name,
    last_name
  });
  const endpoint = BASE_URL + `/author-management/${id}`;
  console.log("updateAuthor");
  // console.log(author);
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      first_name,
      last_name
    })
  })
    .then(res => {
      console.log(res);
    })
    .then(res => window.location.reload());
}

export function deleteAuthor(id) {
  const endpoint = BASE_URL + `/author-management/${id}`;
  console.log("deleteAuthor");
  return fetch(endpoint, {
    method: "DELETE"
  }).then(res => window.location.reload());
}

export function useAuthors() {
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAuthors()
      .then(authors => {
        setAuthors(authors);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    authors,
    error
  };
}
