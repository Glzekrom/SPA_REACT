import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adicionarLivro, removerLivro, editarLivro } from "./controleLivros";
import type { TipoEstadoGeral } from "../../estadoGeral";

function CadastroLivro() {
  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState(0);
  const [editoraId, setEditoraId] = useState(0);
  const [generoId, setGeneroId] = useState(0);
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  const autores = useSelector(
    (estado: TipoEstadoGeral) => estado.autores.lista
  );
  const editoras = useSelector(
    (estado: TipoEstadoGeral) => estado.editoras.lista
  );
  const generos = useSelector(
    (estado: TipoEstadoGeral) => estado.generos.lista
  );
  const livros = useSelector((estado: TipoEstadoGeral) => estado.livros.lista);

  const despachar = useDispatch();

  const cadastrarOuEditar = () => {
    if (!titulo.trim() || autorId === 0 || editoraId === 0 || generoId === 0)
      return;

    if (idEdicao === null) {
      despachar(
        adicionarLivro({ id: Date.now(), titulo, autorId, editoraId, generoId })
      );
    } else {
      despachar(
        editarLivro({ id: idEdicao, titulo, autorId, editoraId, generoId })
      );
    }

    setTitulo("");
    setAutorId(0);
    setEditoraId(0);
    setGeneroId(0);
    setIdEdicao(null);
  };

  const excluir = (id: number) => {
    if (idEdicao === id) {
      setIdEdicao(null);
      setTitulo("");
      setAutorId(0);
      setEditoraId(0);
      setGeneroId(0);
    }
    despachar(removerLivro(id));
  };

  const iniciarEdicao = (id: number) => {
    const livro = livros.find((l) => l.id === id);
    if (!livro) return;
    setTitulo(livro.titulo);
    setAutorId(livro.autorId);
    setEditoraId(livro.editoraId);
    setGeneroId(livro.generoId);
    setIdEdicao(livro.id);
  };

  const cancelarEdicao = () => {
    setTitulo("");
    setAutorId(0);
    setEditoraId(0);
    setGeneroId(0);
    setIdEdicao(null);
  };

  return (
    <div>
      <h2> Cadastro de Livro</h2>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título do livro"
      />
      <select
        value={autorId}
        onChange={(e) => setAutorId(Number(e.target.value))}
      >
        <option value={0}>Selecione o autor</option>
        {autores.map((a) => (
          <option key={a.id} value={a.id}>
            {a.nome}
          </option>
        ))}
      </select>
      <select
        value={editoraId}
        onChange={(e) => setEditoraId(Number(e.target.value))}
      >
        <option value={0}>Selecione a editora</option>
        {editoras.map((e) => (
          <option key={e.id} value={e.id}>
            {e.nome}
          </option>
        ))}
      </select>
      <select
        value={generoId}
        onChange={(e) => setGeneroId(Number(e.target.value))}
      >
        <option value={0}>Selecione o gênero</option>
        {generos.map((g) => (
          <option key={g.id} value={g.id}>
            {g.nome}
          </option>
        ))}
      </select>
      <button onClick={cadastrarOuEditar}>
        {idEdicao === null ? "Cadastrar" : "Salvar"}
      </button>
      {idEdicao !== null && <button onClick={cancelarEdicao}>Cancelar</button>}

      <h3>Livros Cadastrados</h3>
      <ul>
        {livros.map((livro) => {
          const autor =
            autores.find((a) => a.id === livro.autorId)?.nome || "Desconhecido";
          const editora =
            editoras.find((e) => e.id === livro.editoraId)?.nome ||
            "Desconhecida";
          const genero =
            generos.find((g) => g.id === livro.generoId)?.nome ||
            "Desconhecido";
          return (
            <li key={livro.id}>
              {livro.titulo} - Autor: {autor}, Editora: {editora}, Gênero:{" "}
              {genero}{" "}
              <button onClick={() => iniciarEdicao(livro.id)}>Editar</button>{" "}
              <button onClick={() => excluir(livro.id)}>Excluir</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CadastroLivro;
