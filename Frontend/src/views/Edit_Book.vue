<template>
  <!-- Contêiner principal com uma largura máxima de 600px, centralizado e com texto alinhado ao centro -->
  <div class="container" style="max-width: 600px; margin: auto; text-align: center;">
    
    <!-- Título para a página de modificação do livro -->
    <h1>Modificar Livro</h1>

    <!-- Formulário para modificar os dados do livro -->
    <form @submit.prevent="modificarLivro" style="margin-top: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      
      <!-- Subtítulo com a seção de informações do livro -->
      <h3 style="font-family: 'Arial', sans-serif; text-align: left; color: #4a5568;">Informações do livro</h3>

      <!-- Campo para modificar o nome do livro -->
      <div style="margin-bottom: 15px;">
        <input
          type="text"
          v-model="livro.nome"  
          placeholder="Nome do livro"  
          style="width: 90%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"  
        /><!-- Vínculo de dados bidirecional para o nome do livro -->
        <!-- Texto de sugestão -->
         <!-- Estilo do input -->
      </div>

      <!-- Campo para modificar o autor do livro -->
      <div style="margin-bottom: 15px;">
        <input
          type="text"
          v-model="livro.autor"  
          placeholder="Autor"
          style="width: 90%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"
        /><!-- Vínculo de dados bidirecional para o autor do livro -->
      </div>

      <!-- Campo para modificar a capa do livro -->
      <div style="margin-bottom: 15px;">
        <!-- Exibe a capa atual, caso seja uma string -->
        <img v-if="livro.cover && typeof livro.cover === 'string'" :src="`http://localhost:5000/uploads/${livro.cover}`" alt="Capa do livro" style="width: 100px; height: 100px;" />
        
        <!-- Campo para modificar a capa do livro -->
        <input
          type="file"
          @change="handleImageChange"  
          placeholder="Imagem da capa"
          style="width: 90%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"
        /><!-- Chama a função para lidar com a alteração da imagem -->
      </div>

      <!-- Campo para modificar o ano de publicação do livro -->
      <div style="margin-bottom: 15px;">
        <input
          type="number"
          v-model="livro.anoPublicacao"  
          placeholder="Ano de publicação"
          style="width: 90%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"
        /><!-- Vínculo de dados bidirecional para o ano de publicação -->
      </div>

      <!-- Botões de ação -->
      <div>
        <!-- Botão para submeter as modificações -->
        <button
          type="submit"
          style="background-color: #2b6cb0; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin-right: 10px; cursor: pointer;"
        >
          Modificar Livro
        </button>
        
        <!-- Botão para cancelar a modificação e voltar à página inicial -->
        <button
          type="button"
          @click="cancelar" 
          style="background-color: #e53e3e; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;"
        > <!-- Chama a função cancelar -->
          Cancelar Modificação
        </button>

        <!-- Botão para excluir o livro -->
        <button
          type="button"
          @click="Excluir(livro._id)"  
          style="background-color: red; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;"
        ><!-- Chama a função Excluir com o ID do livro -->
          Excluir Livro
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // Dados do livro sendo modificado, o ID é recuperado da URL
      livro: {
        _id: this.$route.params.id, // ID do livro vindo da URL
        nome: "",
        autor: "",
        anoPublicacao: "",
        cover: "",
      },
    };
  },
  methods: {
    // Função que lida com a seleção de uma nova capa de livro
    handleImageChange(event) {
      const file = event.target.files[0]; // Obtém o arquivo selecionado
      if (file) {
        this.livro.cover = file; // Armazena o arquivo da capa
      }
    },

    // Função para modificar as informações do livro
    async modificarLivro() {
      try {
        const formData = new FormData();
        formData.append("title", this.livro.nome); // Adiciona o título ao FormData
        formData.append("author", this.livro.autor); // Adiciona o autor ao FormData
        formData.append("year", this.livro.anoPublicacao); // Adiciona o ano de publicação ao FormData

        // Adiciona a capa ao FormData se for um arquivo
        if (typeof this.livro.cover === "object") {
          formData.append("cover", this.livro.cover);
        }

        // Envia a requisição PUT para modificar os dados do livro
        const response = await axios.put(`http://localhost:5000/api/books/${this.livro._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Cabeçalho indicando que é um formulário com arquivos
          },
        });

        alert("Livro modificado com sucesso!"); // Exibe um alerta de sucesso
        this.$router.push("/home"); // Redireciona para a página inicial
      } catch (error) {
        console.error("Erro ao modificar o livro:", error); // Exibe o erro no console
        alert("Erro ao modificar o livro!"); // Exibe um alerta de erro
      }
    },

    // Função para excluir o livro
    async Excluir(bookId) {
      // Confirmação antes de excluir o livro
      if (!confirm("Você tem certeza que deseja excluir este livro?")) return;

      try {
        // Envia a requisição DELETE para excluir o livro
        await axios.delete(`http://localhost:5000/api/books/${bookId}`);
        alert("Livro excluído com sucesso!"); // Exibe um alerta de sucesso
        this.$router.push("/home"); // Redireciona para a página inicial
      } catch (error) {
        console.error("Erro ao excluir o livro:", error); // Exibe o erro no console
        alert("Erro ao excluir o livro!"); // Exibe um alerta de erro
      }
    },

    // Função para cancelar a modificação e redirecionar para a página inicial
    cancelar() {
      this.$router.push("/home");
    },
  },

  // Função chamada assim que o componente for montado
  mounted() {
    this.fetchLivro(); // Busca as informações do livro para preencher os campos (esta função deve ser implementada)
  },
};
</script>
