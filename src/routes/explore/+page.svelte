<script lang='ts'>
  import Icon from '@iconify/svelte';
  import AddPotatoSiteModal from './AddPotatoSiteModal.svelte';
  import { getDocs } from 'firebase/firestore';
  import { sitesCollection } from '../../lib/firebase';

  type PotatoSite = {
    id: string,
    url: string,
    tags: string[],
  };

  let potatoSites : Promise<PotatoSite[]> = getPotatoSites();

  async function getPotatoSites() {
    const sitesSnapshot = await getDocs(sitesCollection);

    let sites : PotatoSite[] = [];
    sitesSnapshot.forEach((doc) => {
      let site : PotatoSite = { id: doc.id, url: doc.data().url, tags: doc.data().tags };
      sites = [...sites, site];
    });

    return sites;
  }

</script>


<div class="flex flex-col w-full min-w-screen h-full min-h-screen p-8 gap-8 relative">

<p class="absolute top-0 left-0 text-9xl font-bold tracking-wider text-primary z-10">Explore</p>
<div class="flex flex-row gap-8 mx-auto mt-32">
  {#await potatoSites then sites}
    {#each sites as site}

    <div class="flex flex-col gap-8 border-2 p-4 rounded-lg bg-base-100 z-50 max-w-2xl">
      <a href={site.url} target="__blank">{site.url}</a>
      <div class="flex flex-row gap-2">
        {#each site.tags as tag}
          <p class="underline underline-offset-8">{tag}</p>
        {/each}
      </div>
    </div>

    {/each}
  {/await}
</div>

<div class="absolute inset-x-0 bottom-0 bg-primary flex flex-row gap-8 w-fit max-w-1/4 h-fit px-4 py-2 my-4 mx-auto rounded-lg">
  <button class="btn btn-ghost px-0">
    <img src="potatonet-logo.png" alt="potatonet logo" class="w-12 my-auto inline-block" />
  </button>
  <label for="addpotatositemodal" class="group btn btn-ghost px-2 py-2 modal-button my-auto mx-auto">
    <Icon icon="bi:patch-plus" width="32" class="text-primary-content group-hover:text-white transition-all duration-150" />
  </label>
</div>


<AddPotatoSiteModal />
</div>
