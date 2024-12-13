<template>
  <div class="book-item">
    <!-- Roteamento para página de detalhes do livro -->
    <router-link :to="`/books/${book._id}`">
      <img :src="`http://localhost:5000/uploads/${book.cover}`" alt="Capa do Livro" class="book-image" />
      <h3>{{ book.title }}</h3>
    </router-link>

    <!-- Botão para alternar entre "Emprestar" e "Devolver" -->
    <button class="emprestar" @click="toggleLending">
      {{ book.isLending ? 'Devolver' : 'Emprestar' }}
    </button>
  </div>
</template>


<script>
export default {
  name: 'BookItem', // Nome do componente
  props: {
    book: {
      type: Object, // Define que a propriedade 'book' é um objeto
      required: true, // A propriedade 'book' é obrigatória
    },
  },
  methods: {
    toggleLending() {
      // Emite o evento 'toggle-lending' para o componente pai, passando o livro
      this.$emit('toggle-lending', this.book);
    },
  },
};
</script>


<style scoped>
.book-item {
  display: flex; /* Organiza os itens em uma coluna */
  flex-direction: column;
  align-items: center; /* Centraliza os itens horizontalmente */
  justify-content: space-between; /* Espaça os itens verticalmente */
  width: 150px; /* Largura fixa do contêiner */
  padding: 10px; /* Espaçamento interno */
  border: 1px solid #ddd; /* Borda cinza */
  border-radius: 8px; /* Arredonda os cantos */
  background-color: #ffffff; /* Fundo branco */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra leve para dar profundidade */
}

.book-image {
  width: 100%; /* Largura total do contêiner */
  height: 200px; /* Altura fixa */
  object-fit: cover; /* Ajusta a imagem sem distorção */
  border-radius: 5px; /* Arredonda os cantos */
}

h3 {
  margin-top: 10px; /* Espaçamento superior */
  font-size: 16px; /* Tamanho da fonte */
  color: #333; /* Cor do texto */
  text-align: center; /* Alinha o texto ao centro */
}

.emprestar {
  background-color: #007bff; /* Cor de fundo azul */
  color: white; /* Texto branco */
  padding: 8px 12px; /* Espaçamento interno */
  border-radius: 5px; /* Arredonda os cantos */
  border: none; /* Remove a borda padrão */
  font-size: 1em; /* Tamanho da fonte */
  cursor: pointer; /* Muda o cursor para indicar clicável */
  margin-top: 10px; /* Espaçamento superior */
}

.emprestar:hover {
  background-color: #0056b3; /* Altera a cor ao passar o mouse */
}
</style>
