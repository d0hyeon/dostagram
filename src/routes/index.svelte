<script type="typescript">
	import { session } from '~stores';
  import {onMount} from 'svelte';
  import Cookies from 'js-cookie';

  import Intro from '~components/Intro.svelte';

  let isProceedSession: boolean = false;

  onMount(() => {
    const cookie = JSON.parse(Cookies.get('session') || '{}');
    if(cookie.access) {
      $session = cookie;
    }
    isProceedSession = true;
  });
</script>

{#if isProceedSession}
  {#if $session}
    <div><p>안녕?</p></div>
  {:else}
    <Intro />
  {/if}
{/if}

<style lang="scss">
  div {
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;

    p {
      font-size: 20px;
      font-weight: bold;
    }
  }
</style>