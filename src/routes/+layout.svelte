<script lang="ts">
	let { children } = $props();
    import Header from "../components/Header.svelte"
    import Footer from "../components/Footer.svelte"
    import "../app.css"
    import "devicon/devicon.min.css"
</script>

<Header />

{@render children()}

<Footer />