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
      axios.defaults.headers.common["Accept-Language"] = this.locale;
      this.$i18n.locale = this.locale;
      localStorage.setItem("locale", this.locale);
      this.$store.dispatch("changeLocale", { locale: this.locale });
    }
  },
  mounted() {
    axios
      .get("/v2/languages")
      .then(response => {
        if (response.status === 200 && response.data) {
          this.languages = response.data;
          const currentLang = this.languages.find(
            item => item.code === this.$i18n.locale
          );
          if (currentLang) {
            this.locale = currentLang.code;
          }
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  beforeDestroy() {
    localStorage.removeItem("locale");
  }
};
</script>
