import { configureStore } from "@reduxjs/toolkit";
import autoresReducer from "./funcionalidades/autores/controleAutores";
import editorasReducer from "./funcionalidades/editoras/controleEditoras";
import generosReducer from "./funcionalidades/generos/controleGeneros";
import livrosReducer from "./funcionalidades/livros/controleLivros";

export const store = configureStore({
  reducer: {
    autores: autoresReducer,
    editoras: editorasReducer,
    generos: generosReducer,
    livros: livrosReducer,
  },
});

export type TipoEstadoGeral = ReturnType<typeof store.getState>;
export type TipoDespacho = typeof store.dispatch;
