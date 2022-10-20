<script lang="ts">
  import Icon from "@iconify/svelte";
  import { fade } from 'svelte/transition';
  import IntersectionObserver from "svelte-intersection-observer";

  let section1 : HTMLElement;
  let intersecting1 : boolean = false;

  let tags = [
    {id: 1, name: "cats"},
    {id: 2, name: "games"},
    {id: 3, name: "foodie"},
    {id: 4, name: "tech"},
    {id: 5, name: "space"},
    {id: 6, name: "travel"},
  ];

</script>

<div class="flex flex-col w-full min-w-screen h-full min-h-screen justify-center">
  
  <div class="flex flex-col bg-primary h-full min-h-screen justify-center">
    <img src="potatonet-logo.png" class="w-1/3 h-1/3 mx-auto potatonet-logo" alt="potatonet logo" />
    <div class="flex flex-col gap-8 text-center mx-auto">
      <p class="text-8xl text-base-100 font-black">potatonet</p>
      <p class="text-3xl text-base-100 font-bold">There's more out there, Internet Explorer</p>
      <Icon icon="pixelarticons:arrow-down" class="text-base-100 text-6xl mx-auto animate-bounce" />
    </div>
  </div>


  <IntersectionObserver
    once
    element={section1}
    bind:intersecting={intersecting1}
  >
    <div class="flex flex-col bg-base-100 h-full min-h-screen justify-center" bind:this="{section1}">
      <div class="grid grid-cols-3 grid-rows-2 gap-8 px-16">
      
        {#each tags as {name}}
          {#if intersecting1}
            <div class="px-12 py-16 bg-base-300 rounded-lg" transition:fade="{{duration: 1000}}">
              {name}
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </IntersectionObserver>
  
</div>