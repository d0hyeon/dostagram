<script type="typescript">
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  
  import Intro from '~components/Intro.svelte';
  import Main from '~components/Main.svelte';

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
    <Main />
  {:else}
    <Intro />
  {/if}
{/if}

<style lang="scss">

</style>