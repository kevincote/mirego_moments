import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#606060',
        secondary: '#DEE8F2',
        accent: '#494949'
      }
    }
  }
});
