<template>
  <div>
    <Header />

    <div class="main-layout">
      <Sidebar />

      <div class="book-list-container">
        <h2 class="section-title">Livros Disponíveis</h2>

        <div class="book-list">
          <BookItem
            v-for="book in availableBooks"
            :key="book._id"
            :book="book"
            @toggle-lending="handleToggleLending"
          />
        </div>

        <h2 class="section-title">Livros Emprestados</h2>

        <div class="book-list">
          <BookItem
            v-for="book in lendingBooks"
            :key="book._id"
            :book="book"
            @toggle-lending="handleToggleLending"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Home/Header.vue';
import Sidebar from '@/components/Home/Sidebar.vue';
import BookItem from '@/components/Home/BookItem.vue';

export default {
  name: 'BooksForLending',
  components: { Sidebar, BookItem, Header },
  data() {
    return {
      books: [
        { _id: '1', title: 'Livro A', cover: 'cover-a.jpg', isLending: false },
        { _id: '2', title: 'Livro B', cover: 'cover-b.jpg', isLending: false },
        { _id: '3', title: 'Livro C', cover: 'cover-c.jpg', isLending: false },
      ],
    };
  },
  computed: {
    availableBooks() {
      return this.books.filter((book) => !book.isLending); // Livros disponíveis
    },
    lendingBooks() {
      return this.books.filter((book) => book.isLending); // Livros emprestados
    },
  },
  methods: {
    /**
     * Atualiza o status de empréstimo do livro e move ele para a lista correspondente
     * @param {Object} book - O livro que será atualizado
     */
    handleToggleLending(book) {
      // Encontrar o índice do livro na lista de livros
      const index = this.books.findIndex((b) => b._id === book._id);
      if (index !== -1) {
        // Alternar o status de "isLending"
        this.$set(this.books, index, { ...book, isLending: !book.isLending });
      }
    },
  },
};
</script>

<style scoped>
.book-list-container {
  padding: 20px;
}

.section-title {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
}

.book-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
