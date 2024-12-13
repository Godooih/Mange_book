import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';  // Importe o componente da página Home
import Login from '../views/Login.vue';
import Cadastro from '../views/Cadastro_conta.vue';
import Edit from '../views/Edit_Book.vue';
import Add_Book from '../views/Add_Book.vue';
import BooksForLending from '../views/Books-for-lending.vue';
import BookList from '../components/Home/BookList.vue';  // Certifique-se de importar o componente BookList


const routes = [
  {
    path: '/edit',  // Rota para editar livro
    name: 'edit',
    component: Edit,
  },
  {
    path: '/Cadastro',  // Rota para cadastro
    name: 'cadastro',
    component: Cadastro,
  },
  {
    path: '/home',  // Rota para a página inicial
    name: 'home',
    component: Home,
  },
  {
    path: '/login',  // Rota para login
    name: 'login',
    component: Login,
  },
  {
    path: '/add_book',  // Rota para adicionar livro
    name: 'add_book',
    component: Add_Book,
  },
  {
    path: '/books',  // Rota para lista de livros
    name: 'BookList',
    component: BookList,
  },
  {
    path: '/books/:id',
    name: 'BookEdit',
    component: Edit,  // Assumindo que Edit é o componente de edição
    props: true,
  },
  {
    path: '/books-for-lending',
    name: 'BooksForLending',
    component: BooksForLending,
  },
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,  // Usa o array de rotas definido acima
});

export default router;
