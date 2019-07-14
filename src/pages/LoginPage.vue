<template>
  <div class="account">
    <div class="account__title">
      <h1 class="title__headline">Welcome back</h1>
      <span class="title__subheadline">Log in to your account</span>
    </div>
    <div class="account__box">
      <form action="/login" class="account__form" id="login-form">
        <div id="flash"></div>
        <div class="form__item">
          <label for="user-login" class="form__label">Login</label>
          <input
            type="text"
            id="user-login"
            class="form__input required"
            autofocus="autofocus"
            name="user[login]"
          />
        </div>
        <div class="form__item">
          <label for="user-password" class="form__label">Password</label>
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
          value="Log in"
          class="form__submit"
        />
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginPage"
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
