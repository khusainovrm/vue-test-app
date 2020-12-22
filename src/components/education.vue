<template>
  <div class="input-container">
    <label for="education" class="text-third-500 text-xs">Образование</label>
    <div
      class="input-wrapper flex border-third-500 border-b"
      ref="educationDiv"
      @click.self="$emit('toggleOptionsWindow')"
    >
      <div
        id="education"
        ref="inputEducation"
        class="select-none min-h-39 flex items-center"
      >
        <span
          v-if="!selectedEducation.length"
          class="text-third-500 text-base"
          @click.self="$emit('toggleOptionsWindow')"
          >Выберите образование</span
        >

        <div v-if="selectedEducation.length">
          <ul class="flex pb-1 flex-wrap">
            <li
              v-for="(item, index) of selectedEducation"
              :key="index"
              class="border border-third-500 rounded-special50 m-0.5 first:mx-0 px-3 py-2 flex flex items-center"
            >
              <div class="font-medium text-xs">{{ item }}</div>
              <img
                src="@/assets/svgs/close.svg"
                alt="#"
                class="ml-3 cursor-pointer"
                @click="$emit('removeSelected', index)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="Educations_Options relative">
      <transition name="fade">
        <ul
          v-if="showOptionsWindow"
          ref="dropdown"
          class="Dropdown absolute top-1 border rounded-md py-2.5 px-4 shadow-special bg-white flex flex-col w-full z-10"
        >
          <li
            v-for="(item, index) in educationOptions"
            :key="index"
            class="DropdownElement duration-200 rounded-special50 select-none"
            :class="{
              'text-third-500': selectedEducation.includes(item),
              'hover:bg-light-blue cursor-pointer': !selectedEducation.includes(
                item
              ),
            }"
            @click="$emit('selectEducation', index)"
          >
            <div class="px-3.5 py-1 text-basexl">
              {{ item }}
            </div>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'education',
  props: {
    selectedEducation: {
      type: Array,
      required: true,
    },
    educationOptions: {
      type: Array,
      required: true,
    },
    showOptionsWindow: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    document.addEventListener('click', this.optionsWindowHandler)
  },

  unmounted() {
    document.removeEventListener('click', this.optionsWindowHandler)
  },

  methods: {
    optionsWindowHandler(e) {
      const target = e.target
      const dropdown = this.$refs.dropdown
      const educationDiv = this.$refs.educationDiv
      if (dropdown) {
        if (!educationDiv.contains(target) && !dropdown.contains(target)) {
          this.$emit('closeOptionsWindow')
        }
      }
    },
  },
}
</script>

<style scoped></style>
