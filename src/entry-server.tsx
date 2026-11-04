/* Usado só no build: gera o HTML da home para o Google ler sem precisar rodar JavaScript. */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
