<script type="ts">
  import Search from './Search.svelte';
  import Nav from './Nav.svelte';
</script>

<header class="layout-header">
  <div>
    <h1>
      <a href="/">
        <img src="/images/icon/logo105x47.png" alt="logo" title="dostagram" />
      </a>
    </h1>
    <div class="search">
      <Search />
    </div>
    <Nav />
  </div>

</header>

<style lang="scss">
  .layout-header {
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid var(--border-color);

    > div {
      display: flex;
      width: var(--contents-width);
      height: 54px;
      margin: 0 auto;
      align-items: center;
      justify-content: space-between;
    }
    h1 {
      font-size: 0;
      img {
        height: 40px;
      }
    } 
  }
</style>