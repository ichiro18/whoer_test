<template>
  <div class="translations">
    <div class="translations__header">
      <h3 class="translations__title">{{ $t("table.head") }}</h3>
      <div class="translations__actions">
        <button class="button action__create" @click="createItem()">
          <i class="fas fa-plus"></i>
          {{ $t("table.actionCreate") }}
        </button>
      </div>
    </div>
    <table class="translations__list" v-if="translations.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>{{ $t("table.name") }}</th>
          <th>{{ $t("table.native") }}</th>
          <th>{{ $t("table.lexicon") }}</th>
          <th>{{ $t("table.created") }}</th>
          <th>{{ $t("table.updated") }}</th>
          <th>{{ $t("table.actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in translations" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.native }}</td>
          <td>{{ item.lexicon }}</td>
          <td>{{ parseDate(item.created) }}</td>
          <td>{{ parseDate(item.updated) }}</td>
          <td class="translation__action">
            <i class="far fa-eye action__read" @click="readItem(item.id)"></i>
            <i
              class="far fa-edit action__edit"
              @click="updateItem(item.id)"
            ></i>
            <i
              class="far fa-file-word action__native"
              @click="updateNative(item.id)"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "IndexPage",
  i18n: {
    messages: {
      en: {
        table: {
          head: "Translations",
          actionCreate: "Create",
          name: "Name",
          native: "Native",
          lexicon: "Lexicon",
          created: "Created",
          updated: "Updated",
          actions: "Actions"
        }
      },
      es: {
        table: {
          head: "Traducciones",
          actionCreate: "Crear",
          name: "Nombre",
          native: "Nativo",
          lexicon: "Léxico",
          created: "Creado",
          updated: "Actualizado",
          actions: "Comportamiento"
        }
      },
      de: {
        table: {
          head: "Übersetzungen",
          actionCreate: "Erstellen",
          name: "Name",
          native: "Eingeborener",
          lexicon: "Lexikon",
          created: "Erstellt",
          updated: "Aktualisierte",
          actions: "Aktionen"
        }
      },
      fr: {
        table: {
          head: "Traductions",
          actionCreate: "Créer",
          name: "prénom",
          native: "Originaire de",
          lexicon: "Lexique",
          created: "Créé",
          updated: "Mis à jour",
          actions: "actes"
        }
      },
      "pt-br": {
        table: {
          head: "Traduções",
          actionCreate: "Crio",
          name: "Nome",
          native: "Nativo",
          lexicon: "Léxico",
          created: "Criado",
          updated: "Atualizada",
          actions: "Ações"
        }
      },
      it: {
        table: {
          head: "Traduzioni",
          actionCreate: "Creare",
          name: "Nome",
          native: "nativo",
          lexicon: "Lessico",
          created: "Creato",
          updated: "aggiornato",
          actions: "Azioni"
        }
      },
      ru: {
        table: {
          head: "Переводы",
          actionCreate: "Создать",
          name: "Название",
          native: "Нативный",
          lexicon: "Лексикон",
          created: "Создан",
          updated: "Обновлен",
          actions: "Действия"
        }
      },
      uk: {
        table: {
          head: "Переклади",
          actionCreate: "Створити",
          name: "Ім'я",
          native: "Рідний",
          lexicon: "Лексикон",
          created: "Створено",
          updated: "Оновлено",
          actions: "Дії"
        }
      },
      tr: {
        table: {
          head: "Çeviriler",
          actionCreate: "yaratmak",
          name: "isim",
          native: "yerli",
          lexicon: "sözlük",
          created: "düzenlendi",
          updated: "Güncellenmiş",
          actions: "Eylemler"
        }
      },
      "zh-tw": {
        table: {
          head: "翻譯",
          actionCreate: "創建",
          name: "名稱",
          native: "本地人",
          lexicon: "詞彙",
          created: "創建",
          updated: "更新",
          actions: "操作"
        }
      },
      "zh-cn": {
        table: {
          head: "翻译",
          actionCreate: "创建",
          name: "名称",
          native: "本地人",
          lexicon: "词汇",
          created: "创建",
          updated: "更新",
          actions: "操作"
        }
      }
    }
  },
  data() {
    return {
      currentLocale: "en",
      translations: [],
      timer: null
    };
  },
  computed: {
    locale() {
      return this.$store.getters["getLocale"];
    }
  },
  mounted() {
    this.getTranslations();
    this.timer = setInterval(() => this.getTranslations(), 60000);
  },
  methods: {
    parseDate(unixDate) {
      const theDate = new Date(unixDate * 1000);
      return theDate.toLocaleDateString() + " " + theDate.toLocaleTimeString();
    },
    createItem() {
      this.$router.push({ name: "create" });
    },
    readItem(id) {
      this.$router.push({ name: "read", params: { id } });
    },
    updateItem(id) {
      this.$router.push({ name: "update", params: { id } });
    },
    updateNative(id) {
      this.$router.push({ name: "native", params: { id } });
    },
    getTranslations() {
      console.log("update list");
      axios
        .get("/v2/translations")
        .then(response => {
          if (response.status === 204) {
            return;
          }
          if (response.status === 200 && response.data) {
            this.translations = response.data;
            this.currentLocale = response.headers["content-language"];
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  },
  watch: {
    locale(newVal) {
      if (newVal !== this.currentLocale) {
        this.getTranslations();
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="scss">
@import "../common/styles/config/variables";

.translations__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .translations__actions {
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

table {
  width: 100%;
  color: $dark-primary-text-color;
  margin-bottom: 2rem;
  border-collapse: collapse;
  border-spacing: 0;

  thead {
    tr {
      height: 56px;

      th {
        padding: 0;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: rgba(0, 0, 0, 0.12);
        color: rgba(0, 0, 0, 0.54);
        font-size: 12px;
        font-weight: 500;
        text-align: left;

        &:first-child {
          padding-left: 24px;
        }
      }
    }
  }

  tbody {
    tr {
      transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s,
        font-weight;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
      padding: 0 15px;
      height: 48px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }

      td {
        padding: 0;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: rgba(0, 0, 0, 0.12);
        color: $dark-primary-text-color;
        font-size: 14px;
        text-align: left;

        &:first-child {
          padding-left: 24px;
        }
      }
    }
  }
}

.translation__action {
  i {
    cursor: pointer;
    font-size: 16px;
    color: $dark-icon-color;

    i + i {
      margin-left: 10px;
    }

    &:hover {
      color: $primary-color;
    }
  }
}
</style>
