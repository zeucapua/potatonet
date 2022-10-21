<script lang='ts'>
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../../../lib/firebase';

  type PotatoSite = {
    id: string,
    url: string,
    tags: string[],
  }

  let potatoSites : Promise<PotatoSite[]> = getPotatoSites();

  async function getPotatoSites() {
    const sitesCollection = collection(db, 'potatosites');
    const sitesSnapshot = await getDocs(sitesCollection);

    let sites : PotatoSite[] = [];
    sitesSnapshot.forEach((doc) => {
      let site : PotatoSite = { id: doc.id, url: doc.data().url, tags: doc.data().tags };
      sites = [...sites, site];
    });

    return await sites;
  }

</script>


{#await potatoSites then sites}
  {#each sites as site}
    <p>{site.url}</p>
  {/each}
{/await}