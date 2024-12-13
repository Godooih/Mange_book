<template>
  <div class="container">
    <!-- Conteúdo Principal -->
    <header>
      <router-link to="/home">
        <h1>Cadastre-se na MANGE Book</h1>
      </router-link>
      <p>O catálogo da sua biblioteca está disponível em qualquer lugar, a qualquer hora.</p>
    </header>
        <form class="form-container" @submit.prevent="handleRegister">
      <div class="input-group">
        <label>Primeiro Nome</label>
        <input v-model="username" type="text" placeholder="Primeiro Nome" required />
      </div>
      <div class="input-group">
        <label>E-mail</label>
        <input v-model="email" type="email" placeholder="E-mail" required />
      </div>
      <div class="input-group">
        <label>Senha</label>
        <input v-model="password" type="password" placeholder="Senha" required />
      </div>
      <button type="submit">Criar conta</button>
    </form>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CadastroForm",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post("http://localhost:5000/api/user/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        alert(response.data.message); // Mostra mensagem de sucesso
        this.$router.push("/login"); // Redireciona ao Login em caso de sucesso
      } catch (error) {
        console.error(error);
        alert(error.response.data.message || "Erro ao criar conta");
      }
    },
  },
};
</script>


<style scoped>
/* Estilo da navegação */
.navbar {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.navbar-links {
  display: flex;
  gap: 15px;
}

.nav-button {
  width: 100%;
  padding: 13px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
}

.nav-button:hover {
  background-color: #2f2c2c;
  text-decoration: underline;
}

/* Conteúdo Principal */
.container {
  text-align: center;
  font-family: 'Inter', sans-serif;
  padding: 20px;
}

header h1 {
  font-size: 2rem;
  font-weight: bold;
}

header p {
  font-size: 1.2rem;
  color: gray;
}

.form-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 50px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  font-size: 0.9rem;
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
