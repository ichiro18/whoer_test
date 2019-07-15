<template>
  <div class="translation">
    <h3>{{ $t("form.head") }} {{ $route.params.id }}</h3>
    <table class="translation__data" v-if="translation">
      <tbody>
        <tr>
          <td>ID</td>
          <td>{{ translation.id }}</td>
        </tr>
        <tr>
          <td>{{ $t("form.name") }}</td>
          <td>{{ translation.name }}</td>
        </tr>
        <tr>
          <td>{{ $t("form.native") }}</td>
          <td>{{ translation.native }}</td>
        </tr>
        <tr>
          <td>{{ $t("form.lexicon") }}</td>
          <td>{{ translation.lexicon }}</td>
        </tr>
        <tr>
          <td>{{ $t("form.created") }}</td>
          <td>{{ parseDate(translation.created) }}</td>
        </tr>
        <tr>
          <td>{{ $t("form.updated") }}</td>
          <td>{{ parseDate(translation.updated) }}</td>
        </tr>
      </tbody>
    </table>
    <div id="flash" v-else>{{ $t("form.notAvailable") }}</div>
    <div class="actions">
      <router-link to="/" class="button">
        <i class="fas fa-backward action__back"></i>
        {{ $t("form.back") }}
      </router-link>
      <router-link
        :to="{ name: 'update', params: { id: $route.params.id } }"
        class="button"
      >
        <i class="far fa-edit action__edit"></i>
        {{ $t("form.action") }}
      </router-link>
      <router-link
        :to="{ name: 'native', params: { id: $route.params.id } }"
        class="button"
      >
        <i class="far fa-file-word action__native"></i>
        {{ $t("form.actionMore") }}
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ReadTranslationPage",
  i18n: {
    messages: {
      en: {
        form: {
          head: "Translation",
          action: "Edit",
          name: "Name",
          native: "Native",
          lexicon: "Lexicon",
          created: "Created",
          updated: "Updated",
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
          native: "Nativo",
          lexicon: "Léxico",
          created: "Creado",
          updated: "Actualizado",
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
          native: "Eingeborener",
          lexicon: "Lexikon",
          created: "Erstellt",
          updated: "Aktualisierte",
          notAvailable: "Nicht verfügbar",
          back: "Zurück",
          actionMore: "Native bearbeiten"
        }
      },
      fr: {
        form: {
          head: "Traduction",
          action: "modifier",
          name: "prénom",
          native: "Originaire de",
          lexicon: "Lexique",
          created: "Créé",
          updated: "Mis à jour",
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
          native: "Nativo",
          lexicon: "Léxico",
          created: "Criado",
          updated: "Atualizada",
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
          native: "nativo",
          lexicon: "Lessico",
          created: "Creato",
          updated: "aggiornato",
          notAvailable: "Non disponibile",
          back: "Indietro",
          actionMore: "Modifica nativo"
        }
      },
      ru: {
        form: {
          head: "Перевод",
          action: "Редактировать",
          name: "Названия",
          native: "Нативно",
          lexicon: "Лексикон",
          created: "Создан",
          updated: "Обновлен",
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
          native: "Рідний",
          lexicon: "Лексикон",
          created: "Створено",
          updated: "Оновлено",
          notAvailable: "Недоступний",
          back: "Назад",
          actionMore: "Редагувати рідний"
        }
      },
      tr: {
        form: {
          head: "Çeviri",
          action: "Düzenle",
          name: "isim",
          native: "yerli",
          lexicon: "sözlük",
          created: "düzenlendi",
          updated: "Güncellenmiş",
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
          native: "本地人",
          lexicon: "詞彙",
          created: "創建",
          updated: "更新",
          notAvailable: "無法使用",
          back: "背部",
          actionMore: "編輯原生"
        }
      },
      "zh-cn": {
        form: {
          head: "翻译",
          action: "编辑",
          name: "名称",
          native: "本地人",
          lexicon: "词汇",
          created: "创建",
          updated: "更新",
          notAvailable: "无法使用",
          back: "背部",
          actionMore: "编辑原生"
        }
      }
    }
  },
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
