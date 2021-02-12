<script>
import Epic from "src/components/Epic.svelte";

</script>
<main>
  <Epic />
	<slot></slot>
</main>

<style lang="scss">
	main {
    width: 100%;
    height: 100vh;
    background-color: var(--background-color);
  }
</style>