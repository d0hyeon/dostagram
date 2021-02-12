<script type="ts">
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  
  import { accessState } from '../../stores/access'
  import Input from '~components/inputs/Input.svelte';
  import firebase from 'src/utils/firebase';
  import { PASSWORD_RULES, EMAIL_RULES } from 'src/constants/rules';

  type OnSuccess = (session: any) => void;
  
  export const onSuccess:OnSuccess = () => {
    goto('/index');
  }

  let email: string = '';
  let password: string = '';
  let isShowPassword: boolean = false;  

  $: handleClickPwIcon = () => {
    isShowPassword = !isShowPassword;
  }
  $: handleFormSubmit = (event) => {
    event.preventDefault();
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({user: {uid}}) => {
        accessState.set(uid);
      })
      .catch(console.error)
  }

  
</script>

<div class="form">
  <div class="container">
    <h1>Dostagram</h1>
    <form on:submit={handleFormSubmit}>
      <ul class="fields">
        <li>
          <Input bind:value={email} placeholder="이메일" rules={EMAIL_RULES} />
        </li>
        <li>
          <Input bind:value={password} type={isShowPassword ? 'text' : 'password'} placeholder="비밀번호" rules={PASSWORD_RULES}>
            {#if password}
              <button type="button" class="input-icon" on:click={handleClickPwIcon}>비밀번호 {isShowPassword ? '숨기기' : '표시'}</button>
            {/if}
          </Input>
        </li>
        <li class="field-button">
          <button type="submit" disabled={!(email || password)}>로그인</button>
        </li>
      </ul>
      <div class="line">
        <p>또는</p>
      </div>
      <ul class="links">
        <li>
          <a href="/find">비밀번호를 잊으셨나요?</a>
        </li>
      </ul>
    </form>
  </div>
  <div class="container">
    <p class="text-join">
      <span>계정이 없으신가요?</span> 
      <em>
        <a href="/signup">가입하기</a>
      </em>
    </p>
  </div>
</div>


<style lang="scss">
  .container {
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #fff;
    text-align: center;

    & ~ & {
      margin-top: 10px;
    }
  }

  .form {
    h1 {
      width: 105px;
      height: 47px;
      background-repeat: no-repeat;
      background-image: url('/images/icon/logo105x47.png');
      margin: 22px auto 12px;
      font-size: 0;
    } 
    .fields {
      > li {
        margin: 0 40px 6px;

        &.field-button {
          padding-top: 8px;
        }
      }

      .input-icon {
        white-space: nowrap;
      }
    } 

    button[type=submit] {
      width: 100%;
      height: 30px;
      background-color: #0095f6;
      border-radius: 4px;
      color: #fff;

      &:disabled {
        opacity: 0.4;
      }
    }
   
    .line {
      display: flex;
      margin: auto 40px;
      padding: 10px 0;
      align-items: center;

      &::before, &::after {
        display: block;
        height: 1px;
        width: 100%;
        background-color: #ddd;
        content: '';
      }
      
      p {
        flex: 1 0 auto;
        margin: 0 18px;
      }
    }

    .links {
      padding-top: 8px;
    }
  }

  .text-join {
    margin: 15px;
    font-size: 14px;
    
    em {
      color: #0095f6;
      vertical-align: middle;
      font-weight: bold;
    }
  }
</style>