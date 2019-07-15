<template>
  <div class="translation-update">
    <h1>{{ $t("form.head") }} {{ $route.params.id }}</h1>
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
        @submit="updateTranslation"
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
        <div class="actions">
          <router-link to="/" class="button">
            <i class="fas fa-backward action__back"></i>
            {{ $t("form.back") }}
          </router-link>
          <input
            type="submit"
            name="commit"
            :value="$t('form.action')"
            class="button"
          />
          <router-link
            :to="{ name: 'native', params: { id: $route.params.id } }"
            class="button"
          >
            <i class="far fa-file-word action__more"></i>
            {{ $t("form.actionMore") }}
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "UpdateTranslationPage",
  i18n: {
    messages: {
      en: {
        form: {
          head: "Translation",
          action: "Edit",
          name: "Name",
          lexicon: "Lexicon",
          notAvailable: "Not Available",
          back: "Back",
          actionMore: "Edit native"
        }
      },
      es: {
        form: {
          head: "Traducción",
          action: "Editar",
          name: "Nombre",
          lexicon: "Léxico",
          notAvailable: "No disponible",
          back: "Espalda",
          actionMore: "Editar nativo"
        }
      },
      de: {
        form: {
          head: "Übersetzung",
          action: "Bearbeiten",
          name: "Name",
          lexicon: "Lexikon",
          notAvailable: "Nicht verfügbar",
          back: "Zurück",
          actionMore: "Native bearbeiten"
        }
      },
      fr: {
        form: {
          head: "Traduction",
          action: "modifier",
          name: "Prénom",
          lexicon: "Lexique",
          notAvailable: "Indisponible",
          back: "Retour",
          actionMore: "Modifier natif"
        }
      },
      "pt-br": {
        form: {
          head: "Tradução",
          action: "Editar",
          name: "Nome",
          lexicon: "Léxico",
          notAvailable: "Não disponível",
          back: "De volta",
          actionMore: "Editar nativo"
        }
      },
      it: {
        form: {
          head: "Traduzione",
          action: "modificare",
          name: "Nome",
          lexicon: "Lessico",
          notAvailable: "Non disponibile",
          back: "Indietro",
          actionMore: "Modifica nativo"
        }
      },
      ru: {
        form: {
          head: "Перевод",
          action: "Редактировать",
          name: "Название",
          lexicon: "Лексикон",
          notAvailable: "Не доступно",
          back: "Назад",
          actionMore: "Редактировать нативный"
        }
      },
      uk: {
        form: {
          head: "Переклад",
          action: "Редагувати",
          name: "Ім'я",
          lexicon: "Лексикон",
          notAvailable: "Недоступний",
          back: "Назад",
          actionMore: "Редагувати рідний"
        }
      },
      tr: {
        form: {
          head: "Çeviri",
          action: "Düzenle",
          name: "Isim",
          lexicon: "Sözlük",
          notAvailable: "Müsait değil",
          back: "Geri",
          actionMore: "Yerlileri düzenle"
        }
      },
      "zh-tw": {
        form: {
          head: "翻譯",
          action: "編輯",
          name: "名稱",
          lexicon: "詞彙",
          notAvailable: "無法使用",
          back: "背部",
          actionMore: "編輯原生"
        }
      },
      "zh-cn": {
        form: {
          head: "创建翻译",
          action: "创建",
          name: "名称",
          lexicon: "词汇",
          notAvailable: "无法使用",
          back: "背部",
          actionMore: "编辑原生"
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
  mounted() {
    axios
      .get("/v2/translation/" + this.$route.params.id)
      .then(response => {
        if (response.status === 200 && response.data) {
          this.fields.name = response.data.name;
          this.fields.lexicon = !!response.data.lexicon;
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  methods: {
    updateTranslation(e) {
      e.preventDefault();

      if (!this.fields.name) {
        this.notices.push("Name field is required");
      } else {
        axios({
          url: "/v2/translation/" + this.$route.params.id,
          method: "PUT",
          data: {
            name: this.fields.name,
            lexicon: this.fields.lexicon ? 1 : 0
          }
        })
          .then(response => {
            this.notices.push(
              "Success. Updated translation " + response.data.id
            );
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
