<script lang="ts">
  import HomeIcon from '~components/icons/Home.svelte';
	export let segment: string;
</script>

<nav>
	<ul>
		<li>
      <a href=".">
        <HomeIcon isActive={segment === undefined} />
      </a>
    </li>
	</ul>
</nav>

<style>
	ul {
		display: flex;
	}

  li {
    margin-left: 22px;
  }

</style>
