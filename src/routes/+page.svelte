<script lang="ts">
  import Icon from "@iconify/svelte";
  let tags = [
    "cats",
    "games",
    "foodie",
    "tech",
    "space",
    "travel",
  ];

</script>

<div class="flex flex-col w-full min-w-screen h-full min-h-screen justify-center">
  
  <div class="flex flex-col bg-primary h-full min-h-screen justify-center">
    <img src="potatonet-logo.png" class="w-1/3 h-1/3 mx-auto" alt="potatonet logo" />
    <div class="flex flex-col gap-8 text-center mx-auto">
      <p class="text-8xl text-base-100 font-black">potatonet</p>
      <p class="text-3xl text-base-100 font-bold">There's more out there, Internet Explorer</p>
      <a href="/explore">
        <button class="btn rounded-full w-fit mx-auto">Start Exploring</button>  
      </a>
      <Icon icon="pixelarticons:arrow-down" class="text-base-100 text-6xl mx-auto animate-bounce" />
    </div>
  </div>

  <div class="flex flex-col bg-base-100 h-full min-h-screen justify-center">
    
  </div>

</div>


