import CadastroAutor from "./funcionalidades/autores/CadastroAutor";
import CadastroEditora from "./funcionalidades/editoras/CadastroEditora";
import CadastroGenero from "./funcionalidades/generos/CadastroGenero";
import CadastroLivro from "./funcionalidades/livros/CadastroLivro";

function App() {
  return (
    <div>
      <h1>Biblioteca</h1>
      <CadastroAutor />
      <CadastroEditora />
      <CadastroGenero />
      <CadastroLivro />
    </div>
  );
}

export default App;
