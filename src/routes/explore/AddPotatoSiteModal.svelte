<script lang="ts">
  import AddPotatoSiteForm from "../../lib/AddPotatoSiteForm.svelte";
</script>

<input type="checkbox" id="addpotatositemodal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative border-primary border-2">
    <label for="addpotatositemodal" class="btn btn-sm btn-circle absolute right-4 top-4">✕</label>
    <AddPotatoSiteForm  />  
  </div>
</div>