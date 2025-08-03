import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adicionarAutor, removerAutor, editarAutor } from "./controleAutores";
import type { TipoEstadoGeral } from "../../estadoGeral";

function CadastroAutor() {
  const [nome, setNome] = useState("");
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  const despachar = useDispatch();
  const autores = useSelector(
    (estado: TipoEstadoGeral) => estado.autores.lista
  );

  const cadastrarOuEditar = () => {
    if (!nome.trim()) return;

    if (idEdicao === null) {
      // Criar novo
      despachar(adicionarAutor({ id: Date.now(), nome }));
    } else {
      // Editar existente
      despachar(editarAutor({ id: idEdicao, nome }));
    }

    setNome("");
    setIdEdicao(null);
  };

  const excluir = (id: number) => {
    if (idEdicao === id) {
      setIdEdicao(null);
      setNome("");
    }
    despachar(removerAutor(id));
  };

  const iniciarEdicao = (id: number) => {
    const autor = autores.find((a) => a.id === id);
    if (!autor) return;
    setNome(autor.nome);
    setIdEdicao(autor.id);
  };

  const cancelarEdicao = () => {
    setNome("");
    setIdEdicao(null);
  };

  return (
    <div>
      <h2> Cadastro de Autor</h2>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do autor"
      />
      <button onClick={cadastrarOuEditar}>
        {idEdicao === null ? "Cadastrar" : "Salvar"}
      </button>
      {idEdicao !== null && <button onClick={cancelarEdicao}>Cancelar</button>}

      <h3>Autores Cadastrados</h3>
      <ul>
        {autores.map((autor) => (
          <li key={autor.id}>
            {autor.nome}{" "}
            <button onClick={() => iniciarEdicao(autor.id)}>Editar</button>{" "}
            <button onClick={() => excluir(autor.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CadastroAutor;
