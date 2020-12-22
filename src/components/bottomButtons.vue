<template>
  <div
    class="flex md:hidden h-9 border-t border-iron-500"
    :class="{ 'opacity-50': isDisabled }"
  >
    <button
      :disabled="isDisabled"
      @click="$emit('resetForm')"
      class="w-1/2 focus:outline-none border-r border-iron-500 active:bg-third-100 text-base font-medium duration-200 select-none"
    >
      Отменить
    </button>
    <button
      :disabled="isDisabled"
      @click="$emit('formHandler')"
      class="w-1/2 focus:outline-none text-base text-white font-medium bg-main-500 hover:bg-main-600 active:bg-main-700 duration-200 select-none"
    >
      Сохрандить
    </button>
  </div>
</template>

<script>
export default {
  name: 'bottomButtons',
  props: {
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped></style>
