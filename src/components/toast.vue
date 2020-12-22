<template>
  <div v-if="showModal" class="px-5 md:px-7 mb-4 md:mb-0">
    <div
      class="modal-container bg-granny-apple w-full md:w-max px-9 py-1.3 rounded-md shadow-special"
    >
      <div class="flex">
        <img src="@/assets/svgs/green-flag.svg" alt="#" class="mr-3" />
        <div class="text-small">Данные успешно сохранены</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped></style>
