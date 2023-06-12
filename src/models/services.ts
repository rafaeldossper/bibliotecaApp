import { MariaDBDataSource, dataStart } from "./data";
import { Livro } from "./livro";

export class Service {
  start() {
    dataStart();
  }
  insert(livro: Livro) {
    MariaDBDataSource.manager.save(livro);
    return livro;
  }


  async deletarLivro(idLivro: number) {
    const livroRemovido = await MariaDBDataSource.manager.delete(Livro, idLivro);
    if (livroRemovido.affected === 0) {
      throw new Error("Livro não encontrado.");
    }
  }

  

  async listAll() {
    const list = await MariaDBDataSource.manager
      .createQueryBuilder(Livro, "livro")
      .getMany();

    // console.log("List de livros:");
    // console.log(list);

    return list;
  }

  
}
