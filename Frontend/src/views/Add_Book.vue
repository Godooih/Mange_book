<template>
  <!-- Contêiner principal, centralizando o conteúdo -->
  <div class="container" style="max-width: 600px; margin: auto; text-align: center;">
    
    <!-- Link para a página inicial -->
    <router-link to="/home">
      <!-- Título do site -->
      <h1 style="font-family: 'Arial', sans-serif; font-size: 24px; font-weight: bold;">
        <span style="font-size: 30px;">MANGE Book 📖</span>
      </h1>
    </router-link>

    <!-- Subtítulo informando o objetivo da página -->
    <h2 style="font-family: 'Arial', sans-serif; font-size: 22px; color: #2d3748;">
      Adicione o livro aqui!!
    </h2>

    <!-- Formulário para adicionar livro -->
    <form @submit.prevent="adicionarLivro" enctype="multipart/form-data">
      
      <!-- Campo de entrada para o título do livro -->
      <div style="margin-bottom: 15px;">
        <input
          type="text"
          v-model="livro.title"  
          placeholder="Título do livro" 
          style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"  
        />
      </div>

      <!-- Campo de entrada para o autor do livro -->
      <div style="margin-bottom: 15px;">
        <input
          type="text"
          v-model="livro.author"  
          placeholder="Autor do livro"
          style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"
        />
      </div>

      <!-- Campo de entrada para o ano de publicação -->
      <div style="margin-bottom: 15px;">
        <input
          type="number"
          v-model="livro.year"  
          placeholder="Ano de publicação"
          style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"
        />
      </div>

      <!-- Campo de seleção de arquivo para a capa do livro -->
      <div style="margin-bottom: 15px;">
        <input
          type="file"
          @change="onFileSelected"  
          accept="image/*" 
          style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"
        />
        
        <!-- Exibe a imagem da capa selecionada -->
        <div v-if="cover">
          <img :src="coverPreview" alt="Capa do Livro" style="max-width: 100px; margin-top: 10px;" />
        </div>
      </div>

      <!-- Botão para submeter o formulário -->
      <button type="submit" style="background-color: #2b6cb0; color: white; padding: 10px 20px;">
        Adicionar Livro
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      livro: {
        title: "",  // Título do livro
        author: "", // Autor do livro
        year: "",   // Ano de publicação
      },
      cover: null, // Armazena o arquivo da capa do livro
      coverPreview: "", // Exibe a prévia da capa
    };
  },
  methods: {
    // Método que é chamado quando um arquivo é selecionado
    onFileSelected(event) {
      this.cover = event.target.files[0];  // Armazena o arquivo da capa
      this.coverPreview = URL.createObjectURL(this.cover);  // Cria uma URL temporária para visualização
    },

    // Método para adicionar o livro
    async adicionarLivro() {
      const formData = new FormData();
      formData.append("title", this.livro.title);  // Adiciona o título ao FormData
      formData.append("author", this.livro.author); // Adiciona o autor ao FormData
      formData.append("year", this.livro.year);     // Adiciona o ano de publicação ao FormData
      
      // Se uma capa foi selecionada, adiciona ao FormData
      if (this.cover) {
        formData.append("cover", this.cover); // 'cover' é o nome do campo de upload
      }

      try {
        // Envia a requisição para a API para adicionar o livro
        const response = await fetch("http://localhost:5000/api/books", {
          method: "POST",      // Método POST para enviar os dados
          body: formData,      // O corpo da requisição é o FormData
        });

        if (!response.ok) {
          throw new Error("Erro ao adicionar o livro"); // Lança erro caso a resposta não seja bem-sucedida
        }

        alert("Livro adicionado com sucesso!"); // Alerta em caso de sucesso
        this.$router.push("/home"); // Redireciona para a página inicial
      } catch (error) {
        console.error(error);  // Exibe o erro no console
        alert("Erro ao adicionar o livro"); // Alerta em caso de falha
      }
    },
  },
};
</script>

<style scoped>
/* Adicione aqui estilos adicionais, se necessário */
</style>
