import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Livro = {
  id: number;
  titulo: string;
  autorId: number;
  editoraId: number;
  generoId: number;
};

type EstadoLivros = {
  lista: Livro[];
};

const estadoInicial: EstadoLivros = {
  lista: [],
};

const livrosSlice = createSlice({
  name: "livros",
  initialState: estadoInicial,
  reducers: {
    adicionarLivro: (estado, acao: PayloadAction<Livro>) => {
      estado.lista.push(acao.payload);
    },
    removerLivro: (estado, acao: PayloadAction<number>) => {
      estado.lista = estado.lista.filter((l) => l.id !== acao.payload);
    },
    editarLivro: (estado, acao: PayloadAction<Livro>) => {
      const index = estado.lista.findIndex((l) => l.id === acao.payload.id);
      if (index !== -1) {
        estado.lista[index] = acao.payload;
      }
    },
  },
});

export const { adicionarLivro, removerLivro, editarLivro } =
  livrosSlice.actions;
export default livrosSlice.reducer;
