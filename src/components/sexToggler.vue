<template>
  <div class="sex flex cursor-pointer mr-7 w-full md:w-auto mb-1.3 md:mb-0">
    <div
      class="border border-iron-500 border-l-1 border-t-1 border-b-1 rounded-l-special50 py-2 px-4 font-medium text-xs"
      :class="{
        'text-main-500': sex !== 'male',
        'bg-light-gray': sex === 'male',
      }"
      @click="$emit('setSex', 'male')"
    >
      Мужчина
    </div>
    <div
      class="border border-iron-500 border-r-1 border-t-1 border-b-1 rounded-r-special50 py-2 px-4 font-medium text-xs"
      :class="{
        'text-main-500': sex !== 'female',
        'bg-light-gray': sex === 'female',
      }"
      @click="$emit('setSex', 'female')"
    >
      Женщина
    </div>
  </div>
</template>

<script>
export default {
  name: 'sexToggler',
  props: {
    sex: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
