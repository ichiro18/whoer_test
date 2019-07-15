<template>
  <div class="translation-update">
    <h1>Update translation {{ $route.params.id }}</h1>
    <div class="translation__box">
      <div id="flash" v-if="notices.length">
        <ul>
          <li v-for="notice in notices" :key="notice">{{ notice }}</li>
        </ul>
      </div>
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
      <form
        action="/translation"
        class="translation__form"
        method="post"
        @submit="updateNative"
      >
        <div class="form__item">
          <label for="translation-native" class="form__label">
            Native
          </label>
          <input
            type="text"
            id="translation-native"
            class="form__input required"
            autofocus="autofocus"
            name="translation[name]"
            v-model="fields.native"
          />
        </div>
        <div class="actions">
          <router-link to="/" class="button">
            <i class="fas fa-backward action__back"></i>
            Back
          </router-link>
          <input type="submit" name="commit" value="Update" class="button" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "UpdateTranslationPage",
  data() {
    return {
      translation: null,
      fields: {
        native: null
      },
      notices: []
    };
  },
  mounted() {
    axios
      .get("/v2/translation/" + this.$route.params.id)
      .then(response => {
        if (response.status === 200 && response.data) {
          this.translation = response.data;
          this.fields.native = this.translation.native;
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
    },
    updateNative(e) {
      e.preventDefault();

      axios({
        url: "/v2/translation/" + this.$route.params.id + "/native",
        method: "PUT",
        data: {
          native: this.fields.native
        }
      })
        .then(response => {
          this.notices.push("Success. Updated native for " + response.data.id);
          setTimeout(() => {
            this.$router.push({
              name: "read",
              params: { id: response.data.id }
            });
          }, 500);
        })
        .catch(error => {
          this.notices.push(error);
          throw new Error(error);
        });
    }
  }
};
</script>

<style lang="scss">
@import "../../common/styles/config/variables";

.translation-update {
  .translation__box {
    display: block;
    position: relative;
    width: 50%;
    padding: 15px 0;
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
    .translation__form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 0 30px;
      .form__item {
        margin-bottom: 20px;
        position: relative;
        .form__label {
          color: $dark-primary-text-color;
          display: block;
          font-weight: map_get($typography-font-weight-values, regular);
          position: relative;
          height: 20px;
          margin-bottom: 10px;
        }
        .form__input {
          display: block;
          position: relative;
          width: 100%;
          height: 38px;
          padding: 0 10px;
          margin-bottom: 10px;
          background-color: $background-primary-color;
          border: 1px solid #dbe3e7;
          border-radius: 3px;
          color: $dark-primary-text-color;
          font-size: 1rem;
          transition: all ease-in-out 0.1s;
          outline: none;
          &:active,
          &:focus {
            background-color: #eef2f4;
            border-color: $primary-color;
          }
        }
      }
    }
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
  }
}
</style>
