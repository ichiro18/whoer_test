<template>
  <div class="account">
    <div class="account__title">
      <h1 class="title__headline">{{ $t("title.headline") }}</h1>
      <span class="title__subheadline">{{ $t("title.subHeadline") }}</span>
    </div>
    <div class="account__box">
      <form
        action="/login"
        class="account__form"
        id="login-form"
        method="post"
        @submit="checkForm"
      >
        <div id="flash" v-if="errors.length">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <div class="form__item">
          <label for="user-login" class="form__label">
            {{ $t("form.loginField") }}
          </label>
          <input
            type="text"
            id="user-login"
            class="form__input required"
            autofocus="autofocus"
            name="user[login]"
          />
        </div>
        <div class="form__item">
          <label for="user-password" class="form__label">
            {{ $t("form.passwordField") }}
          </label>
          <input
            type="password"
            id="user-password"
            class="form__input required"
            autofocus="autofocus"
            name="user[password]"
          />
        </div>
        <input
          type="submit"
          name="commit"
          :value="$t('form.submit')"
          class="form__submit"
        />
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginPage",
  i18n: {
    messages: {
      en: {
        title: {
          headline: "Welcome back",
          subHeadline: "Log in to your account"
        },
        form: {
          loginField: "Login",
          passwordField: "Password",
          submit: "Log in"
        }
      },
      es: {
        title: {
          headline: "Dar una buena acogida",
          subHeadline: "Ingrese a su cuenta"
        },
        form: {
          loginField: "Iniciar sesión",
          passwordField: "Contraseña",
          submit: "Iniciar sesión"
        }
      },
      de: {
        title: {
          headline: "Willkommen zurück",
          subHeadline: "Ins Konto einloggen"
        },
        form: {
          loginField: "Anmeldung",
          passwordField: "Passwort",
          submit: "Einloggen"
        }
      },
      fr: {
        title: {
          headline: "Nous saluons le retour",
          subHeadline: "Connectez-vous à votre compte"
        },
        form: {
          loginField: "S'identifier",
          passwordField: "Mot de passe",
          submit: "S'identifier"
        }
      },
      "pt-br": {
        title: {
          headline: "Bem vindo de volta",
          subHeadline: "Faça login na sua conta"
        },
        form: {
          loginField: "Entrar",
          passwordField: "Senha",
          submit: "Entrar"
        }
      },
      it: {
        title: {
          headline: "Ben tornato",
          subHeadline: "Accedi al tuo account"
        },
        form: {
          loginField: "Accesso",
          passwordField: "Parola d'ordine",
          submit: "Accesso"
        }
      },
      ru: {
        title: {
          headline: "С возвращением",
          subHeadline: "Войдите в свою учетную запись"
        },
        form: {
          loginField: "Имя пользователя",
          passwordField: "Пароль",
          submit: "Войти"
        }
      },
      uk: {
        title: {
          headline: "З поверненням",
          subHeadline: "Увійдіть до свого облікового запису"
        },
        form: {
          loginField: "Ім'я користувача",
          passwordField: "Пароль",
          submit: "Увійти"
        }
      },
      tr: {
        title: {
          headline: "Tekrar hoşgeldiniz",
          subHeadline: "Hesabınıza giriş yapın"
        },
        form: {
          loginField: "Kullanıcı adı",
          passwordField: "Parola",
          submit: "Oturum aç"
        }
      },
      "zh-tw": {
        title: {
          headline: "歡迎回來",
          subHeadline: "登錄到您的帳戶"
        },
        form: {
          loginField: "用戶名",
          passwordField: "密碼",
          submit: "登錄"
        }
      },
      "zh-cn": {
        title: {
          headline: "欢迎回来",
          subHeadline: "登录到您的帐户"
        },
        form: {
          loginField: "用户名",
          passwordField: "密码",
          submit: "登录"
        }
      }
    }
  },
  data() {
    return {
      errors: [],
      fields: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      if (this.fields.username && this.fields.password) {
        return true;
      }

      this.errors = [];

      // TODO: i18n error messages
      if (!this.fields.username) {
        this.errors.push(this.$t("form.loginField") + " field is required");
      }
      if (!this.fields.password) {
        this.errors.push(this.$t("form.passwordField") + " field is required");
      }
    }
  }
};
</script>
<style lang="scss">
@import "../common/styles/config/variables";

.account {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .account__title {
    text-align: center;
    margin-bottom: 60px;
    .title__headline {
      font-size: 3rem; // 48sp
      line-height: 3rem;
      font-weight: map_get($typography-font-weight-values, regular);
      letter-spacing: normal;
      color: $dark-primary-text-color;
      margin-bottom: 10px;
    }
    .title__subheadline {
      font-size: 1rem; // 16 sp
      line-height: 1.75rem; //28 sp
      font-weight: map_get($typography-font-weight-values, regular);
      letter-spacing: typography-get-letter-spacing(0.15, 1);
      color: $dark-secondary-text-color;
    }
  }
  .account__box {
    display: block;
    position: relative;
    width: 50%;
    padding: 0 15px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08), inset 0 0 0 1px #dbe3e7;
    transition: 0.4s;
    .account__form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 40px 40px 30px;
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
        width: 100%;
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
