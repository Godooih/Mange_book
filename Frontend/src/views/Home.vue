<template>
  <Header></Header>

  <div class="main-layout">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Container do BookList -->
    <div class="book-list-container">
      <h2 class="section-title">Livros Disponíveis</h2>
      
      <!-- Link para a página de adicionar livro -->
      <router-link to="/add_book">
        <button class="add_livro">Adicionar livro</button>
      </router-link>

      <!-- Lista de livros -->
      <div class="book-list">
        <!-- Itera sobre os livros e exibe o componente BookItem para cada um -->
        <BookItem
          v-for="book in books"
          :key="book.title"
          :book="book"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Home/Header.vue';
import Sidebar from '../components/Home/Sidebar.vue';
import BookItem from '../components/Home/BookItem.vue';
import axios from 'axios';

export default {
  name: 'Home', // Nome do componente
  components: { Sidebar, BookItem, Header }, // Importação dos componentes usados no template
  data() {
    return {
      books: [], // Lista de livros, inicialmente vazia
    };
  },
  methods: {
    // Método para buscar os livros da API
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:5000/api/books'); // Requisição GET para a API
        console.log(response.data); // Verifica os dados da resposta
        this.books = response.data; // Atualiza a lista de livros com os dados recebidos
      } catch (error) {
        console.error('Erro ao buscar os livros:', error); // Exibe erro caso a requisição falhe
      }
    },
  },
  created() {
    this.fetchBooks(); // Chama o método para buscar os livros ao carregar o componente
  },
};
</script>

<style scoped>
/* Estilo para o botão de adicionar livro */
.add_livro{
  background-color: #007bff; /* Cor de fundo azul */
  color: white; /* Cor do texto branca */
  padding: 10px; /* Preenchimento interno do botão */
  border-radius: 5px; /* Bordas arredondadas */
  border: none; /* Remove a borda padrão */
  font-size: 1em; /* Tamanho da fonte */
  cursor: pointer; /* Muda o cursor para indicar que é clicável */
}

/* Estilo para o layout principal */
.main-layout {
  display: flex; /* Usa Flexbox para layout */
  flex-direction: row; /* Organiza os elementos em linha */
  gap: 20px; /* Espaçamento entre os elementos filhos */
  padding: 20px; /* Preenchimento interno */
  background-color: #f5f5f5; /* Cor de fundo cinza claro */
}

/* Estilo para o contêiner da lista de livros */
.book-list-container {
  flex: 1; /* Faz o contêiner ocupar o máximo de espaço disponível */
  display: flex; /* Usa Flexbox para layout */
  flex-direction: column; /* Organiza os itens em coluna */
  align-items: center; /* Centraliza os itens horizontalmente */
  background-color: #ffffff; /* Cor de fundo branca */
  border-radius: 8px; /* Bordas arredondadas */
  padding: 20px; /* Preenchimento interno */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para dar profundidade */
}

/* Estilo para o título da seção */
.section-title {
  margin-bottom: 20px; /* Espaçamento inferior */
  font-size: 24px; /* Tamanho da fonte */
  color: #333; /* Cor do texto cinza escuro */
  text-align: center; /* Alinha o texto ao centro */
}

/* Estilo para o contêiner da lista de livros */
.book-list {
  display: grid; /* Usa grid layout */
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Layout responsivo para colunas */
  gap: 15px; /* Espaçamento entre os itens da grid */
  width: 100%; /* Largura total do contêiner */
  max-width: 800px; /* Largura máxima de 800px */
}
</style>
