import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Autor = {
  id: number;
  nome: string;
};

type EstadoAutores = {
  lista: Autor[];
};

const estadoInicial: EstadoAutores = {
  lista: [],
};

const autoresSlice = createSlice({
  name: "autores",
  initialState: estadoInicial,
  reducers: {
    adicionarAutor: (estado, acao: PayloadAction<Autor>) => {
      estado.lista.push(acao.payload);
    },
    removerAutor: (estado, acao: PayloadAction<number>) => {
      estado.lista = estado.lista.filter((autor) => autor.id !== acao.payload);
    },
    editarAutor: (estado, acao: PayloadAction<Autor>) => {
      const index = estado.lista.findIndex(
        (autor) => autor.id === acao.payload.id
      );
      if (index !== -1) {
        estado.lista[index] = acao.payload;
      }
    },
  },
});

export const { adicionarAutor, removerAutor, editarAutor } =
  autoresSlice.actions;
export default autoresSlice.reducer;
