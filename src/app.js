const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // DOING
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  if(!title || !url || !techs) {
    return response.status(400).json({ error: 'Something is missing. Please, fix it and try again!' });
  }

  const repository = { 
    id: uuid(), 
    title, 
    url, 
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // DOING
  const { id } = request.params;

  const { title, url, techs } = request.body;
  const { likes } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  if(likes) {
    return response.status(400).json({ likes: repositories[repositoryIndex].likes })
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // DOING
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found!' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  // DOING
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found!' });
  }

  repositories[repositoryIndex].likes++;
  
  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
