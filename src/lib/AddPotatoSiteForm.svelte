<script lang='ts'>
  import Icon from "@iconify/svelte";
  import toast, { Toaster } from 'svelte-french-toast';
  import { addPotatoSiteToDB } from '../lib/firebase';

  let url : string = '';
  let tags : {id: number, tag: string}[] = [];

  let keyNum : number = 0;
  let tagInput : string = '';

  const isValidUrl = (u : string) => {
      try {
        return Boolean(new URL(u));
      }
      catch (e) {
        return false;
      }
    };


  function addTag() { 
    let valid : boolean = true;
    tags.forEach(tag => {
      if (tag.tag === tagInput) { valid = false; return; }
    });

    if (tagInput.trim().length == 0) { valid = false; }

    if (valid) {
      tags = [...tags, { id: keyNum, tag: tagInput }];
      keyNum++; 
      tagInput = ''; 
    }
  }

  function removeTag(t : {id : number, tag : string}) { 
    tags = tags.filter((tItem) => { return tItem != t });
    console.log(tags);
  }

  function handleKeydown(event : KeyboardEvent) {
    if (event.key == 'Enter') {
      addTag();
    }
  }

  function submitWebsite() {
    if ((tags.length > 0) && isValidUrl(url)) {
      try {
        let tagsList : string[] = [];
        tags.forEach(tag => {
          tagsList = [...tagsList, tag.tag];
        });
        addPotatoSiteToDB({url: url, tags: tagsList});
        window.location.reload();
      }
      catch (e : unknown) {
        toast.error('Error has occured');
        if (typeof e === 'string') {
          console.log(e.toUpperCase());
        }
        else if (e instanceof Error) { console.log(e.message); }
      }
    }
    else {
      let message : string = !isValidUrl(url) ? 'Invalid URL' : 'Please use at least 1 tag';
      toast.error(message, { position: 'top-right' });
    }
  }

</script>

<Toaster />

<div class='form-control gap-4 py-4'>
  <p class="text-2xl font-bold">Submit a Website</p>
  <div class="divider my-0"></div>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">
    <span class="label-text">Website URL</span>
    <span class="label-text-alt">Use "https://" at the Start</span>
  </label>
  <input type='text' bind:value={url} class="input input-bordered focus:input-primary" />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">
    <span class="label-text">Tags</span>
    <span class="label-text-alt">Press Enter to Add a Tag</span>
  </label>
  <input type='text' bind:value={tagInput} on:keydown={handleKeydown}
    class="input input-bordered focus:input-primary" />

  <div class="flex flex-row flex-wrap">
    {#each tags as t (t.id)}

      <div class="badge badge-accent gap-2 mt-4 mr-2">
        <button on:click='{() => removeTag(t)}'>
          <Icon class="inline-block text-current" icon="bi:x" />
        </button>
        {t.tag}
      </div>


    {/each}
  </div>

  <div class="modal-action">
    <button class="btn" on:click={submitWebsite}>Submit</button>
  </div>
  


</div>