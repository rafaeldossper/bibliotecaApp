/* importando o express */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3100;

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});

import { Livro } from "./models/livro";
import { Service } from "./models/services";

app.use(bodyParser.json())

/* Inicializando a fonte de dados: */
var service = new Service();
service.start();

app.listen(port, listenHandler);

/* Função de adição de um Livro*/
app.post("/adicionarLivro", async function (req, res) {
  const { titulo, autor, dataPublicacao, genero } = req.body;
  const novoLivro = new Livro();
  novoLivro.titulo = titulo;
  novoLivro.autor = autor;
  novoLivro.dataPublicacao = dataPublicacao;
  novoLivro.genero = genero;

  await service.insert(novoLivro);

  res.json({ livro: novoLivro });
}
)




// Rota para busca e listagem de livros
app.post("/buscarLivros", async (req, res) => {
  const { termoBusca } = req.body;
  console.log("termoBusca:", termoBusca);

  let livros = await service.listAll();
  const termoLowerCase = termoBusca.toLowerCase();

  const livrosEncontrados = livros.filter(
    (livro) =>
      livro.titulo.toLowerCase().includes(termoLowerCase) ||
      livro.autor.toLowerCase().includes(termoLowerCase)
  );

  console.log("livros encontrados:", livrosEncontrados);

  res.json({
    termoBusca: termoBusca,
    livrosEncontrados: livrosEncontrados,
  });
});

app.get("/listarLivros", async function (req, res) {
  /* dados vindos diretamente do banco de dados */
  let livros = await service.listAll();

  // console.log(livros); //para debug somente

  res.send(livros)
}
)




app.delete("/livros", async function (req, res) {
  const idLivro = req.body.idLivro;
  
  try {
    await service.deletarLivro(idLivro);
    res.json({ message: "Livro excluído com sucesso." });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
)


function listenHandler() {
  console.log(`Escutando na porta ${port}!`);
}
