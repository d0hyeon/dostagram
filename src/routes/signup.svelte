<script type="ts">
  import { goto } from '@sapper/app';
  import Input from '~components/inputs/Input.svelte';
  import firebase from 'src/utils/firebase';
  import { PASSWORD_RULES, EMAIL_RULES } from 'src/constants/rules';
  import { accessState } from 'src/stores/access';

  let email: string = '';
  let name: string = '';
  let username: string = '';
  let password: string = '';
  let isShowPassword: boolean = false;

  $: isCompleted = email && name && username && password;

  $: handleClickPwIcon = () => {
    isShowPassword = !isShowPassword;
  }
  $: handleFormSubmit = (event) => {
    event.preventDefault();
    
    if(isCompleted) {
      const db = firebase.firestore();
      db.collection('user').where('username', '==', username).get()
        .then(querySnapshot => {          
          if(!querySnapshot.empty) {
            alert('이미 사용중인 사용자 이름입니다.');
            return;
          }
          
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(({user: {uid}}) => {
              const db = firebase.firestore();
              db.collection('user').doc().set({
                uid,
                email,
                name,
                username
              }).then(() => {
                alert('회원가입이 완료 되었습니다.');
                $accessState = uid;
                goto('/', {replaceState: true});
              })
            }).catch(error => {
              alert(error.message);
            })
        })
    }
  }
</script>


<div class="form">
  <div class="container">
    <h1>Dostagram</h1>
    <h2>친구들의 사진과 동영상을 보려면 가입하세요.</h2>
    <form on:submit={handleFormSubmit}>
      <ul class="fields">
        <li>
          <Input bind:value={email} placeholder="이메일" rules={EMAIL_RULES} />
        </li>
        <li>
          <Input bind:value={name} placeholder="성명" rules={[{required: true, message: '성명을 입력해주세요.'}]} />
        </li>
        <li>
          <Input bind:value={username} placeholder="사용자 이름" rules={[{required: true, message: '사용자 이름을 입력해주세요.'}]} />
        </li>
        <li>
          <Input bind:value={password} type="password" placeholder="비밀번호" rules={PASSWORD_RULES}>
            {#if password}
              <button type="button" class="input-icon" on:click={handleClickPwIcon}>비밀번호 {isShowPassword ? '숨기기' : '표시'}</button>
            {/if}
          </Input>
        </li>
        <li class="field-button">
          <button type="submit" disabled={!(isCompleted)}>가입하기</button>
        </li>
      </ul>
    </form>
  </div>
  <div class="container">
    <p class="text-signin">
      <span>계정이 있으신가요?</span> 
      <em><a href="/">로그인</a></em>
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
    width: 350px;
    margin: 0 auto;
    padding: 20px 0;
    h1 {
      width: 105px;
      height: 47px;
      background-repeat: no-repeat;
      background-image: url('/images/icon/logo105x47.png');
      margin: 22px auto 12px;
      font-size: 0;
    } 
    h2 {
      color: #8e8e8e;
      font-size: 17px;
      font-weight: 600;
      line-height: 20px;
      margin: 0 40px 10px;
      text-align: center;
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
  }

  .text-signin {
    margin: 15px;
    font-size: 14px;
    
    em {
      color: #0095f6;
      vertical-align: middle;
      font-weight: bold;
    }
  }
</style>