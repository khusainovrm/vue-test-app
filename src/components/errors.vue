<template>
  <div class="row w-full px-7 hidden md:block mb-1.3">
    <transition name="fade">
      <div
        v-if="errors.length"
        class="errors flex text-second-500 mt-3 text-xxs flex items-center"
      >
        <img
          src="@/assets/svgs/attention.svg"
          alt="#"
          class="mr-1 h-3.5 w-3.5"
        />
        Необходимо ввести ФИО
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'errors',
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
