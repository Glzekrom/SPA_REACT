import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Genero = {
  id: number;
  nome: string;
};

type EstadoGeneros = {
  lista: Genero[];
};

const estadoInicial: EstadoGeneros = {
  lista: [],
};

const generosSlice = createSlice({
  name: "generos",
  initialState: estadoInicial,
  reducers: {
    adicionarGenero: (estado, acao: PayloadAction<Genero>) => {
      estado.lista.push(acao.payload);
    },
    removerGenero: (estado, acao: PayloadAction<number>) => {
      estado.lista = estado.lista.filter((g) => g.id !== acao.payload);
    },
    editarGenero: (estado, acao: PayloadAction<Genero>) => {
      const index = estado.lista.findIndex((g) => g.id === acao.payload.id);
      if (index !== -1) {
        estado.lista[index] = acao.payload;
      }
    },
  },
});

export const { adicionarGenero, removerGenero, editarGenero } =
  generosSlice.actions;
export default generosSlice.reducer;
