<script lang='ts'>
  import Icon from '@iconify/svelte';
  import AddPotatoSiteModal from './AddPotatoSiteModal.svelte';

  import mql from '@microlink/mql';
  import { getDocs } from 'firebase/firestore';
  import { sitesCollection } from '../../lib/firebase';

  import { onMount } from 'svelte';
    import { M } from 'svelte-motion';

  type PotatoSite = {
    id: string,
    url: string,
    tags: string[],
    title: string,
    description: string,
    screenshot: string,
  };

  let potatoSites : Promise<PotatoSite[]> = getPotatoSites();

  async function getPotatoSites() {
    const sitesSnapshot = await getDocs(sitesCollection);

    let sites : PotatoSite[] = [];
    sitesSnapshot.forEach((doc) => {
      let site : PotatoSite = { 
        id: doc.id, 
        url: doc.data().url, 
        tags: doc.data().tags, 
        title: '', description: '', screenshot: '' // default
      };
      sites = [...sites, site];
    });
    for (const site of sites) {
      const { status, data } = await mql(site.url, {screenshot: true});
      if (status == 'success') { 
        site.title = data.title ? data.title : '';
        site.description = data.description ? data.description : '';
        site.screenshot = data.screenshot ? data.screenshot.url : ''; 
      }
    }


    return sites;
  }



</script>


<div class="flex flex-col w-full min-w-screen h-full min-h-screen p-8 gap-8 relative">

<p class="absolute top-0 left-0 text-9xl font-bold tracking-wider text-primary z-10">Explore</p>
<div class="grid grid-cols-2 gap-8 mx-auto mt-32 z-20">
  {#await potatoSites}
    <Icon icon="pixelarticons:loader" class="animate-spin text-center" width="128" />
  {:then sites}
  {#each sites as site}
  <a href={site.url} target="__blank">
    <div class="flex flex-col border-2 rounded-lg bg-base-100 z-50 max-w-2xl">
      {#if site.screenshot != ''}
        <img src={site.screenshot} alt={site.title} class="aspect-[3/2]" />
      {/if}
      <div class="flex flex-col p-4 gap-4">
        <p class="text-xl text-primary font-bold">{site.title}</p>
        <p>{site.description}</p>
        <div class="flex flex-row gap-2">
          {#each site.tags as tag}
          <p class="underline underline-offset-8">{tag}</p>
          {/each}
        </div>
      </div>
    </div>
  </a>

  {/each}
  {/await}
</div>

<div class="fixed z-50 inset-x-0 bottom-0 bg-primary flex flex-row gap-8 w-fit max-w-1/4 h-fit px-4 py-2 my-4 mx-auto rounded-lg">
  <label for="addpotatositemodal" class="group btn btn-ghost px-2 py-2 modal-button my-auto mx-auto">
    <Icon icon="bi:patch-plus" width="32" class="text-primary-content group-hover:text-white transition-all duration-150" />
  </label>
</div>


<AddPotatoSiteModal />
</div>
