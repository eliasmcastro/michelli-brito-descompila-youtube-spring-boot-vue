<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
      <p class="navbar-brand mx-auto m-0 p-1">CRUD</p>
    </nav>

    <div class="container">
      <ul class="list-group my-2">
        <li
          class="list-group-item"
          v-for="(erro, index) of errors"
          :key="index"
        >
          O campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
        </li>
      </ul>

      <div class="card mt-3">
        <div class="card-header text-white bg-info">Cadastro</div>
        <div class="card-body">
          <form @submit.prevent="cadastrar">
            <div class="form-group">
              <label for="nome_field">Nome</label>
              <input
                type="text"
                class="form-control"
                id="nome_field"
                placeholder="Nome do Produto"
                v-model="produto.nome"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="quantidade_field">Quantidade</label>
                <input
                  type="number"
                  class="form-control"
                  id="quantidade_field"
                  placeholder="Quantidade"
                  v-model="produto.quantidade"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="valor_field">Valor</label>
                <input
                  type="text"
                  class="form-control"
                  id="valor_field"
                  placeholder="Valor"
                  v-model="produto.valor"
                />
              </div>
            </div>
            <div class="text-right">
              <button type="submit" class="btn btn-primary">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>

      <div class="card mt-3">
        <div class="card-header text-white bg-success">
          Produtos Cadastrados
        </div>
        <div class="card-body">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th class="text-center">Quantidade</th>
                <th class="text-center">Valor</th>
                <th class="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="produto of produtos" :key="produto.id">
                <td>{{ produto.nome }}</td>
                <td class="text-center">{{ produto.quantidade }}</td>
                <td class="text-center">{{ produto.valor }}</td>
                <td class="text-center">
                  <button @click="remover(produto)" class="btn btn-danger">
                    Excluir
                  </button>
                  <button @click="editar(produto)" class="btn btn-warning ml-2">
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Produto from "./services/produtos";

export default {
  name: "app",
  data() {
    return {
      produto: {
        id: "",
        nome: "",
        quantidade: "",
        valor: "",
      },
      produtos: [],
      errors: [],
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      Produto.listar()
        .then((resposta) => {
          this.produtos = resposta.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    cadastrar() {
      if (!this.produto.id) {
        Produto.cadastrar(this.produto)
          .then((resposta) => {
            this.produto = {};
            alert("Cadastrado com sucesso!");
            this.listar();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      } else {
        Produto.atualizar(this.produto)
          .then((resposta) => {
            this.produto = {};
            this.errors = {};
            alert("Atualizado com sucesso!");
            this.listar();
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },

    editar(produto) {
      this.produto = produto;
    },

    remover(produto) {
      if (confirm("Deseja excluir o produto?")) {
        Produto.excluir(produto.id)
          .then((resposta) => {
            this.listar();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },
  },
};
</script>

<style>
</style>