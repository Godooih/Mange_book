import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // Certifique-se de que o caminho está correto

// Cria a aplicação com o componente principal App.vue
const app = createApp(App);

// Usa o Vue Router na aplicação
app.use(router);

// Monta a aplicação na div com ID "app" no index.html
app.mount('#app');

