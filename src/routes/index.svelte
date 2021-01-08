<script type="typescript">
	import { session } from '~stores';
  import {onMount} from 'svelte';
  import Cookies from 'js-cookie';

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
    <div>안녕?</div>
  {:else}
    <div>로그인 을 해줄래?</div>
  {/if}
{/if}

<style lang="scss">
	
</style>