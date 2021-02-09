<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import LoginForm from '~components/common/LoginForm.svelte';

  const phoneImageFileNames: string[] = [
    'intro-banner1.jpg',
    'intro-banner2.jpg',
    'intro-banner3.jpg',
    'intro-banner4.jpg',
    'intro-banner5.jpg',
  ];

  let currentIdx: number = 0;
  let timerId: number = 0;

  $: nextShowBanner = () => {
    timerId = setTimeout(() => {
      currentIdx = currentIdx === phoneImageFileNames.length -1
        ? 0
        : currentIdx + 1;
      
      nextShowBanner();
    }, 3000);
  }

  onMount(() => {
    nextShowBanner();
    return () => {
      clearTimeout(timerId);
    }
  });
  

</script>

<div class="body">
  <section>
    <article>
      <div class="phone-wrapper">
        <ul class="phone-screen">
          {#each phoneImageFileNames as filename, i}
            {#if currentIdx === i }
              <li class:active={i === currentIdx} transition:fade>
                <img src={`/images/banner/${filename}`} alt={`banner ${i}`} />
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    </article>
    <article>
      <LoginForm />
    </article>
  </section>
</div>

<style lang="scss">
  .body {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
  section {
    display: flex;
    max-width: 935px;
    margin: 30px auto;
    align-items: flex-start;
    text-align: center;
    justify-content: center;
    

    article {
      flex: 1;

      &:nth-child(1) {
        flex: 0 0 454px;
      }

      &:nth-child(2) {
        flex: 0 0 350px;
      }
      
    }
  }

  .phone-wrapper {
    position: relative;
    height: 618px;
    background-image: url('/images/banner/intro.png');
    text-align: right;

    ul {
      position: relative;
      width: 240px; 
      left: 151px;
      top: 100px;
      height: 100px;
      li {
        position: absolute;
        left: 0;
        top: 0;

        &.active {
          z-index: 5;
        }
      }
    }
  }
</style>