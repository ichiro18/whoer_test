<template>
  <div class="translation">
    <h3>Translation {{ $route.params.id }}</h3>
    <table class="translation__data" v-if="translation">
      <tbody>
        <tr>
          <td>ID</td>
          <td>{{ translation.id }}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{{ translation.name }}</td>
        </tr>
        <tr>
          <td>Native</td>
          <td>{{ translation.native }}</td>
        </tr>
        <tr>
          <td>lexicon</td>
          <td>{{ translation.lexicon }}</td>
        </tr>
        <tr>
          <td>created</td>
          <td>{{ parseDate(translation.created) }}</td>
        </tr>
        <tr>
          <td>updated</td>
          <td>{{ parseDate(translation.updated) }}</td>
        </tr>
      </tbody>
    </table>
    <div id="flash" v-else>Not Available</div>
    <div class="actions">
      <router-link to="/" class="button">
        <i class="fas fa-backward action__back"></i>
        Back
      </router-link>
      <router-link
        :to="{ name: 'update', params: { id: $route.params.id } }"
        class="button"
      >
        <i class="far fa-edit action__edit"></i>
        Edit
      </router-link>
      <router-link
        :to="{ name: 'native', params: { id: $route.params.id } }"
        class="button"
      >
        <i class="far fa-file-word action__native"></i>
        Edit native
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ReadTranslationPage",
  data() {
    return {
      translation: null
    };
  },
  mounted() {
    axios
      .get("/v2/translation/" + this.$route.params.id)
      .then(response => {
        if (response.status === 200 && response.data) {
          this.translation = response.data;
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  methods: {
    parseDate(unixDate) {
      const theDate = new Date(unixDate * 1000);
      return theDate.toLocaleDateString() + " " + theDate.toLocaleTimeString();
    }
  }
};
</script>
<style lang="scss">
@import "../../common/styles/config/variables";

.actions {
  display: flex;
  .button {
    display: block;
    height: 38px;
    padding: 12px 18px;
    background-color: $primary-color;
    color: $white-primary-text-color;
    font-weight: map_get($typography-font-weight-values, medium);
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 15px;
    text-decoration: none;
    i {
      margin-right: 10px;
    }
    &:hover {
      background-color: darken($primary-color, 10%);
    }
    &:active {
      transform: translateY(1px);
    }
  }
}

#flash {
  display: block;
  width: 100%;
  margin-bottom: 30px;
  background-color: #fcf8e3;
  border: 1px solid #faebcc;
  border-radius: 3px;
  color: #76674e;
  font-size: 1rem;
  line-height: 1.2rem;
  padding: 8px 10px;
}
</style>
