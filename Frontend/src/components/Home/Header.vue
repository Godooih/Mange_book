<template>
  <header class="header">
    <h1 class="mange_book">MANGE Book</h1>
    <img class="book" src="../../assets/images/book_icon.png" alt="Book Icon">
    <!-- Atualizado para usar o método redirectToLogin -->
    <button class="login-button" @click="redirectToLogin">Login</button>
    <input type="text" placeholder="Procure seu livro aqui" class="search-input" />
  </header>
</template>

<script>
export default {
  name: 'HeaDer',
  methods: {
    redirectToLogin() {
      this.$router.push('/login'); // Certifique-se de que a rota "login" existe no Vue Router
    }
  }
};
</script>

<style src="../../assets/style.css"></style>
