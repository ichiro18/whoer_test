<template>
  <select v-if="hasLanguages" v-model="locale" v-on:change="handleSelectLang">
    <option v-for="item in languages" v-bind:key="item.code" :value="item.code">
      {{ item.native }}
    </option>
  </select>
</template>
<script>
import axios from "axios";

export default {
  name: "LanguageControl",
  data() {
    return {
      languages: [],
      locale: "en"
    };
  },
  computed: {
    hasLanguages() {
      return this.languages.length > 0;
    }
  },
  methods: {
    handleSelectLang() {
      axios.defaults.headers = {
        "Accept-Language": this.locale
      };
      this.$i18n.locale = this.locale;
    }
  },
  mounted() {
    axios
      .get("/v2/languages")
      .then(response => {
        if (response.status === 200 && response.data) {
          this.languages = response.data;
          const currentLang = this.languages.find(
            item => item.code === document.documentElement.getAttribute("lang")
          );
          if (currentLang) {
            this.locale = currentLang.code;
            this.handleSelectLang();
          }
          console.log(this.$i18n);
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};
</script>
