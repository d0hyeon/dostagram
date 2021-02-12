<script type="typescript">
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import Intro from '~components/Intro.svelte';
  import { accessState } from 'src/stores/access';

  let isProceedSession: boolean = false;
  onMount(() => {
    const cookie = Cookies.get('access');

    if(cookie) {
      $accessState = cookie;
    }
    isProceedSession = true;
  });
</script>

{#if isProceedSession}
  {#if $accessState}
    로그인 완료
  {:else}
    <Intro />
  {/if}
{/if}

<style lang="scss">

</style>