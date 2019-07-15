<template>
  <div class="translation-create">
    <h1>{{ $t("form.head") }}</h1>
    <div class="translation__box">
      <div id="flash" v-if="notices.length">
        <ul>
          <li v-for="notice in notices" :key="notice">{{ notice }}</li>
        </ul>
      </div>
      <form
        action="/translation"
        class="translation__form"
        method="post"
        @submit="createTranslation"
      >
        <div class="form__item">
          <label for="translation-name" class="form__label">
            {{ $t("form.name") }}
          </label>
          <input
            type="text"
            id="translation-name"
            class="form__input required"
            autofocus="autofocus"
            name="translation[name]"
            v-model="fields.name"
          />
        </div>
        <div class="form__item">
          <label for="translation-lexicon" class="form__label">
            {{ $t("form.lexicon") }}
          </label>
          <input
            type="checkbox"
            id="translation-lexicon"
            class="form__input required"
            autofocus="autofocus"
            name="translation[lexicon]"
            v-model="fields.lexicon"
          />
        </div>
        <input
          type="submit"
          name="commit"
          :value="$t('form.action')"
          class="form__submit"
        />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CreateTranslationPage",
  i18n: {
    messages: {
      en: {
        form: {
          head: "Create translation",
          action: "Create",
          name: "Name",
          lexicon: "Lexicon"
        }
      },
      es: {
        form: {
          head: "Crear traducción",
          action: "Crear",
          name: "Nombre",
          lexicon: "Léxico"
        }
      },
      de: {
        form: {
          head: "Übersetzung erstellen",
          action: "Erstellen",
          name: "Name",
          lexicon: "Lexikon"
        }
      },
      fr: {
        form: {
          head: "Créer une traduction",
          action: "Créer",
          name: "Prénom",
          lexicon: "Lexique"
        }
      },
      "pt-br": {
        form: {
          head: "Criar tradução",
          action: "Crio",
          name: "Nome",
          lexicon: "Léxico"
        }
      },
      it: {
        form: {
          head: "Crea traduzione",
          action: "Creare",
          name: "Nome",
          lexicon: "Lessico"
        }
      },
      ru: {
        form: {
          head: "Создать перевод",
          action: "Создать",
          name: "Название",
          lexicon: "Лексикон"
        }
      },
      uk: {
        form: {
          head: "Створити переклад",
          action: "Створити",
          name: "Ім'я",
          lexicon: "Лексикон"
        }
      },
      tr: {
        form: {
          head: "Çeviri oluştur",
          action: "Yaratmak",
          name: "Isim",
          lexicon: "Sözlük"
        }
      },
      "zh-tw": {
        form: {
          head: "創建翻譯",
          action: "創建",
          name: "名稱",
          lexicon: "詞彙"
        }
      },
      "zh-cn": {
        form: {
          head: "创建翻译",
          action: "创建",
          name: "名称",
          lexicon: "词汇"
        }
      }
    }
  },
  data() {
    return {
      fields: {
        name: null,
        lexicon: false
      },
      notices: []
    };
  },
  methods: {
    createTranslation(e) {
      e.preventDefault();

      if (!this.fields.name) {
        this.notices.push("Field Name if required!");
        return false;
      } else {
        axios({
          url: "/v2/translation",
          method: "post",
          data: {
            name: this.fields.name,
            lexicon: this.fields.lexicon ? 1 : 0
          }
        })
          .then(response => {
            if (response.status === 201 && response.data) {
              this.notices.push(
                "Success. Created translation " + response.data.id
              );
              setTimeout(() => {
                this.$router.push({
                  name: "read",
                  params: { id: response.data.id }
                });
              }, 500);
            }
          })
          .catch(error => {
            this.notices.push(error);
            throw new Error(error);
          });
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../common/styles/config/variables";

.translation-create {
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
      .form__submit {
        display: block;
        height: 38px;
        padding: 12px 18px;
        background-color: $primary-color;
        color: $white-primary-text-color;
        font-weight: map_get($typography-font-weight-values, medium);
        border: none;
        border-radius: 3px;
        cursor: pointer;
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
