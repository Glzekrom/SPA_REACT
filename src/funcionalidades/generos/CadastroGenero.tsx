import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adicionarGenero,
  removerGenero,
  editarGenero,
} from "./controleGeneros";
import type { TipoEstadoGeral } from "../../estadoGeral";

function CadastroGenero() {
  const [nome, setNome] = useState("");
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  const despachar = useDispatch();
  const generos = useSelector(
    (estado: TipoEstadoGeral) => estado.generos.lista
  );

  const cadastrarOuEditar = () => {
    if (!nome.trim()) return;

    if (idEdicao === null) {
      despachar(adicionarGenero({ id: Date.now(), nome }));
    } else {
      despachar(editarGenero({ id: idEdicao, nome }));
    }

    setNome("");
    setIdEdicao(null);
  };

  const excluir = (id: number) => {
    if (idEdicao === id) {
      setIdEdicao(null);
      setNome("");
    }
    despachar(removerGenero(id));
  };

  const iniciarEdicao = (id: number) => {
    const genero = generos.find((g) => g.id === id);
    if (!genero) return;
    setNome(genero.nome);
    setIdEdicao(genero.id);
  };

  const cancelarEdicao = () => {
    setNome("");
    setIdEdicao(null);
  };

  return (
    <div>
      <h2> Cadastro de Gênero</h2>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do gênero"
      />
      <button onClick={cadastrarOuEditar}>
        {idEdicao === null ? "Cadastrar" : "Salvar"}
      </button>
      {idEdicao !== null && <button onClick={cancelarEdicao}>Cancelar</button>}

      <h3>Gêneros Cadastrados</h3>
      <ul>
        {generos.map((genero) => (
          <li key={genero.id}>
            {genero.nome}{" "}
            <button onClick={() => iniciarEdicao(genero.id)}>Editar</button>{" "}
            <button onClick={() => excluir(genero.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CadastroGenero;
