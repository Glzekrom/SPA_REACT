import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Editora = {
  id: number;
  nome: string;
};

type EstadoEditoras = {
  lista: Editora[];
};

const estadoInicial: EstadoEditoras = {
  lista: [],
};

const editorasSlice = createSlice({
  name: "editoras",
  initialState: estadoInicial,
  reducers: {
    adicionarEditora: (estado, acao: PayloadAction<Editora>) => {
      estado.lista.push(acao.payload);
    },
    removerEditora: (estado, acao: PayloadAction<number>) => {
      estado.lista = estado.lista.filter((e) => e.id !== acao.payload);
    },
    editarEditora: (estado, acao: PayloadAction<Editora>) => {
      const index = estado.lista.findIndex((e) => e.id === acao.payload.id);
      if (index !== -1) {
        estado.lista[index] = acao.payload;
      }
    },
  },
});

export const { adicionarEditora, removerEditora, editarEditora } =
  editorasSlice.actions;
export default editorasSlice.reducer;
