<template>
  <div class="main-layout">
    <!-- Sidebar com o menu -->
    <aside class="sidebar">
      <ul class="menu">
        <li 
          v-for="item in menuItems" 
          :key="item.name" 
          class="menu-item"
        >
          <!-- Verifica se o item tem um caminho específico para o router-link -->
          <router-link 
            v-if="item.link" 
            :to="item.link"
          >
            {{ item.name }}
          </router-link>
          <span v-else>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </aside>

    <!-- Lista de Livros -->
    
  </div>
</template>

<script>
import BookItem from './BookItem.vue';

export default {
  name: 'Home',
  components: { BookItem },
  data() {
    return {
      menuItems: [
        { name: 'Pagina Incial', link: '/home' },
        { name: 'Livros Emprestados', link: '/books-for-lending' }, // Adicionado com link
        { name: 'Administração', link: null },
        { name: 'Autoajuda', link: null },
        { name: 'Direito', link: null },
        { name: 'Educação', link: null},
        { name: 'Estrangeiro', link: null },
        { name: 'Mangá | HQ', link: null },
        { name: 'Infantil', link: null },
        { name: 'Ficção Científica', link: null },
        { name: 'Romance', link: null },
        { name: 'Jovens', link: null },
        { name: 'Informática', link: null },
        { name: 'Mais Vendidos', link: null },
        
      ],
    };
  },
};
</script>

<style scoped>
/* Mesma estilização */
.main-layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
}

.sidebar {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #eef1f5;
}
</style>
