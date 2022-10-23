<script lang='ts'>
  import AddPotatoSiteModal from './AddPotatoSiteModal.svelte';
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../../lib/firebase';

  type PotatoSite = {
    id: string,
    url: string,
    tags: string[],
  };

  let potatoSites : Promise<PotatoSite[]> = getPotatoSites();

  async function getPotatoSites() {
    const sitesCollection = collection(db, 'potatosites');
    const sitesSnapshot = await getDocs(sitesCollection);

    let sites : PotatoSite[] = [];
    sitesSnapshot.forEach((doc) => {
      let site : PotatoSite = { id: doc.id, url: doc.data().url, tags: doc.data().tags };
      sites = [...sites, site];
    });

    return sites;
  }

</script>


<div class="flex flex-col w-full min-w-screen h-full min-h-screen p-8">

<div class="flex flex-row gap-8 mx-auto">
  {#await potatoSites then sites}
    {#each sites as site}

    <div class="flex flex-col gap-8 border-2 p-4 rounded-lg max-w-2xl">
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

<label for="addpotatositemodal" class="btn modal-button">open modal</label>

<AddPotatoSiteModal />
</div>
