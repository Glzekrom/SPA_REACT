import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adicionarEditora,
  removerEditora,
  editarEditora,
} from "./controleEditoras";
import type { TipoEstadoGeral } from "../../estadoGeral";

function CadastroEditora() {
  const [nome, setNome] = useState("");
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  const despachar = useDispatch();
  const editoras = useSelector(
    (estado: TipoEstadoGeral) => estado.editoras.lista
  );

  const cadastrarOuEditar = () => {
    if (!nome.trim()) return;

    if (idEdicao === null) {
      despachar(adicionarEditora({ id: Date.now(), nome }));
    } else {
      despachar(editarEditora({ id: idEdicao, nome }));
    }

    setNome("");
    setIdEdicao(null);
  };

  const excluir = (id: number) => {
    if (idEdicao === id) {
      setIdEdicao(null);
      setNome("");
    }
    despachar(removerEditora(id));
  };

  const iniciarEdicao = (id: number) => {
    const editora = editoras.find((e) => e.id === id);
    if (!editora) return;
    setNome(editora.nome);
    setIdEdicao(editora.id);
  };

  const cancelarEdicao = () => {
    setNome("");
    setIdEdicao(null);
  };

  return (
    <div>
      <h2> Cadastro de Editora</h2>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome da editora"
      />
      <button onClick={cadastrarOuEditar}>
        {idEdicao === null ? "Cadastrar" : "Salvar"}
      </button>
      {idEdicao !== null && <button onClick={cancelarEdicao}>Cancelar</button>}

      <h3>Editoras Cadastradas</h3>
      <ul>
        {editoras.map((editora) => (
          <li key={editora.id}>
            {editora.nome}{" "}
            <button onClick={() => iniciarEdicao(editora.id)}>Editar</button>{" "}
            <button onClick={() => excluir(editora.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CadastroEditora;
