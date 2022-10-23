<script lang='ts'>
  import Icon from "@iconify/svelte";

  let url : string = '';
  let tags : {id: number, tag: string}[] = [];
  let keyNum : number = 0;

  let tagInput : string = '';

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

  function handleKeydown(event) {
    if (event.key == 'Enter') {
      addTag();
    }
  }
</script>


<div class='form-control'>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">
    <span class="label-text">Potato Site URL:</span>
  </label>
  <input type='text' bind:value={url} class="input input-bordered focus:input-primary" />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">
    <span class="label-text">Tags</span>
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

</div>