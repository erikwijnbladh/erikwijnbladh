<script>
  export let title = "Erik Wijnbladh";
  export let description =
    "Hey, I'm Erik, a Stockholm based Front-end Developer";
  export let image =
    "https://pbs.twimg.com/media/EvBUvV3WQAE5aGk?format=png&name=small";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />

  <link
    rel="icon"
    href="https://www.erikwijnbladh.se/favicon.ico"
    type="image/x-icon"
  />
</svelte:head>
