import { http } from "./config";

export default {
  cadastrar: (produto) => {
    return http.post("produto", produto);
  },

  atualizar: (produto) => {
    return http.put("produto", produto);
  },

  listar: () => {
    return http.get("produtos");
  },

  excluir: (id) => {
    return http.delete("produto/" + id);
  },
};
