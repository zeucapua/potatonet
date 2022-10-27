<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Motion } from "svelte-motion";

  let tags = [
    "cats",
    "games",
    "foodie",
    "tech",
    "space",
    "travel",
  ];

  let logoDeg : number = 0;


</script>

<div class="flex flex-col w-full min-w-screen h-full min-h-screen justify-center">
  
  <div class="flex flex-col bg-primary h-full min-h-screen justify-center">

    <Motion animate={{ rotate: logoDeg }} transition={{ ease: 'easeOutIn', duration: .75 }} let:motion>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img src="potatonet-logo.png" class="w-1/3 h-1/3 mx-auto" alt="potatonet logo" 
        use:motion on:click={ () => logoDeg += 360 }
      />
    </Motion>
    

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


