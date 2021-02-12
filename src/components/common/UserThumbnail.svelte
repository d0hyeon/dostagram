<script type="ts">
  import { onMount } from 'svelte';
  import firebase from 'src/utils/firebase';
  import 'firebase/storage';
  
  export let username: string = '';
  export let size: number = 80;
  export let filename: string = '';
  let src: string = '';
  let widthValue: string = `${size}px`;
  let heightValue: string = `${size}px`;
  let loading: boolean = false;

  onMount(() => {
    loading = true;
    const storage = firebase.app().storage();
    const storageRef = storage.ref().child(filename);
    storageRef.getDownloadURL().then(value => {
      src = value;
    }).finally(() => {
      loading = false;
    })
  });

  $: handleImageLoad = ({target}) => {
    const height =  (target as HTMLImageElement).naturalHeight;
    const width = (target as HTMLImageElement).naturalWidth;
    
    if((height > size) || (width > size)) {
      if(height === width) {
        widthValue = '100%';
      } else if (width > height) {
        widthValue = '100%';
        heightValue = 'auto'
      } else {
        widthValue = 'auto';
        heightValue = '100%';
      }
    } else {
      widthValue = 'auto';
    }
  }


</script>

<div class="frame" style={`width: ${size}px; height: ${size}px;`}>
  {#if loading}
    <img 
      src="/images/icon/loading.gif" 
      alt="loading" 
      class="loading"
      style={`width: ${size-10}px`} 
    />
  {:else}
    {#if src}
      <img 
        src={src} 
        alt="user profile" 
        title={`${username} profile`} 
        on:load={handleImageLoad} 
        style={`width: ${widthValue}; height: ${heightValue}`}
      />
    {/if}
  {/if}
</div>

<style lang="scss">
  .frame {
    position: relative;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    overflow: hidden;

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      content: '';
    }

    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>