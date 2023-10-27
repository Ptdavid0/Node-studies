import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DatabaseMemory();

server.get("/", () => {
  return "Hello World";
});

server.post("/videos", (request, reply) => {
  const { title, description, duration } = request.body;

  database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", () => {
  const videos = database.list();
  console.log(videos);
  return videos;
});

server.put("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: 3333,
});

// Route Parameter => Parametro que é enviado pela rota
// banco de dados em memoria => Quando eu armazeno os dados na memoria da aplicacao ( variavel ), o problema principal é que os dados sao perdidos uma vez que a aplicacao é reiniciada.
// 201 => Algo foi criado
// 204 => Sucesso, mas sem conteudo para retornar
