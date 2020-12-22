<template>
  <div class="max-w-screen-2xl mx-auto" ref="app">
    <form class="flex flex-col min-h-screen">
      <div class="mobile-container flex-grow">
        <div class="row flex flex-wrap px-7 mt-10 mb-7">
          <div class="w-full md:w-1/3">
            <div class="input-container">
              <label for="fio"
                ><span class="text-third-500 text-xs">ФИО</span
                ><span class="text-second-500">*</span></label
              >
              <div class="input-wrapper flex border-third-500 border-b h-10">
                <input
                  id="fio"
                  ref="inputFio"
                  v-model="fio"
                  type="text"
                  placeholder="Введите ФИО"
                  class="focus:outline-none flex-grow text-base"
                />
                <div
                  v-if="fio"
                  @click="resetFio"
                  class="cursor-pointer text-second-500 flex"
                >
                  <img src="@/assets/svgs/close.svg" alt="#" />
                </div>
              </div>

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
            </div>
          </div>
          <div class="w-full md:w-1/3 md:px-7 my-7 md:m-0">
            <div class="input-container">
              <label for="education" class="text-third-500 text-xs"
                >Образование</label
              >
              <div
                class="input-wrapper flex border-third-500 border-b"
                ref="educationDiv"
                @click="showOptionsWindow = true"
              >
                <div
                  id="education"
                  ref="inputEducation"
                  class="select-none min-h-43"
                >
                  <span
                    v-if="!selectedEducation.length"
                    class="text-third-500 text-base"
                    >Выберите образование</span
                  >
                  <div v-else>
                    <ul class="flex pb-1 flex-wrap">
                      <li
                        v-for="(item, index) of selectedEducation"
                        :key="index"
                        class="border border-third-500 rounded-3xl m-0.5 first:mx-0 px-3 py-2 flex flex items-center w-max"
                      >
                        <div class="font-medium text-xs">{{ item }}</div>
                        <img
                          src="@/assets/svgs/close.svg"
                          alt="#"
                          class="ml-3 cursor-pointer"
                          @click="removeSelected(index)"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  @click="resetEducation"
                  class="cursor-pointer text-second-500 flex"
                ></div>
              </div>
              <div class="Educations_Options relative">
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
                    @click="selectEducation(index)"
                  >
                    <div class="px-3.5 py-1 text-basexl">
                      {{ item }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3">
            <toggle-check-box
              :isReadyToTransfer="isReadyToTransfer"
              @checked="isReadyToTransfer = !isReadyToTransfer"
            />
          </div>
        </div>

        <div class="row flex flex-wrap px-7 mb-7">
          <div
            class="sex flex cursor-pointer mr-7 w-full md:w-auto mb-7 md:mb-0"
          >
            <div
              class="border border-iron-500 border-l-1 border-t-1 border-b-1 rounded-l-special50 py-2 px-4 font-bold text-xs"
              :class="{
                'text-main-500': sex === 'male',
                'bg-light-gray': sex !== 'male',
              }"
              @click="setSex('male')"
            >
              Мужчина
            </div>
            <div
              class="border border-iron-500 border-r-1 border-t-1 border-b-1 rounded-r-special50 py-2 px-4 font-bold text-xs"
              :class="{
                'text-main-500': sex === 'female',
                'bg-light-gray': sex !== 'female',
              }"
              @click="setSex('female')"
            >
              Женщина
            </div>
          </div>

          <div class="flex mr-7 w-full md:w-auto mb-7 md:mb-0">
            <div class="self-center flex">
              <input
                type="checkbox"
                id="dayCheckBox"
                class="hidden dayCheckBox"
                v-model="isReadyToWorkFullDay"
              />
              <label for="dayCheckBox"></label>
              <div class="text-small">Полный рабочий день</div>
            </div>
          </div>

          <div class="flex mr-7 w-full md:w-auto">
            <div class="self-center flex">
              <input
                type="checkbox"
                id="workCheckBox"
                class="hidden workCheckBox"
                v-model="isRemoteWork"
              />
              <label for="workCheckBox"></label>
              <div class="text-small">Удаленная работа</div>
            </div>
          </div>
        </div>

        <div class="row hidden md:flex px-7 mb-7">
          <button
            class="focus:outline-none border py-2 px-8 rounded-full text-base font-medium active:bg-third-100 duration-200 focus:outline-none select-none"
            @click="resetForm"
          >
            Отменить
          </button>
          <button
            type="submit"
            @click="formHandler"
            class="focus:outline-none border py-2 px-8 rounded-full ml-4 bg-main-500 text-base text-white font-medium border-main-500 hover:bg-main-600 active:bg-main-700 duration-200 select-none"
          >
            Сохранить
          </button>
        </div>
      </div>

      <div class="flex md:hidden h-9 border-t border-iron-500">
        <button
          @click="resetForm"
          class="w-1/2 focus:outline-none border-r border-iron-500 hover:bg-main-500 text-base font-medium hover:text-white active:bg-main-600 duration-200 select-none"
        >
          Отменить
        </button>
        <button
          @click="formHandler"
          class="w-1/2 focus:outline-none hover:bg-main-500 text-base hover:text-white font-medium active:bg-main-600 duration-200 select-none"
        >
          Сохрандить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ToggleCheckBox from '@/components/toggleCheckBox'

export default {
  name: 'App',
  components: { ToggleCheckBox },
  data: () => ({
    fio: '',
    education: [],
    errors: [],
    showOptionsWindow: false,
    isReadyToWorkFullDay: false,
    isRemoteWork: false,
    isReadyToTransfer: false,
    sex: 'male',
    educationOptions: [
      'Среднее',
      'Среднее специальное',
      'Высшее',
      'Магистр, кандидат, доктор наук',
    ],
    selectedEducation: [],
  }),
  created() {
    document.addEventListener('click', this.optionsWindowHandler)
  },
  unmounted() {
    document.removeEventListener('click', this.optionsWindowHandler)
  },
  methods: {
    setSex(sex) {
      this.sex = sex
    },
    optionsWindowHandler(e) {
      const target = e.target
      const dropdown = this.$refs.dropdown
      const educationDiv = this.$refs.educationDiv
      if (dropdown) {
        if (!educationDiv.contains(target) && !dropdown.contains(target)) {
          this.showOptionsWindow = false
        }
      }
    },
    formHandler(e) {
      e.preventDefault()
      this.errors = []
      !this.fio
        ? this.errors.push('Необходимо ввести ФИО')
        : console.log('check is good')
    },
    resetFio() {
      this.fio = ''
    },
    resetEducation() {
      this.education = []
    },
    selectEducation(index) {
      if (!this.selectedEducation.includes(this.educationOptions[index])) {
        return this.selectedEducation.push(this.educationOptions[index])
      }
    },
    removeSelected(index) {
      return this.selectedEducation.splice(index, 1)
    },
    resetForm(e) {
      e.preventDefault()
      this.isReadyToWorkFullDay = false
      this.isRemoteWork = false
      this.fio = ''
      this.isReadyToTransfer = false
      this.selectedEducation = []
      this.errors = []
      this.sex = 'male'
    },
  },
  watch: {
    fio() {
      this.errors = []
    },
  },
}
</script>

<style lang="postcss">
.dayCheckBox + label,
.workCheckBox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.dayCheckBox + label::before,
.workCheckBox + label::before {
  @apply border border-third-500 rounded-sm;
  content: '';
  width: 18px;
  height: 18px;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.dayCheckBox:checked + label::before,
.workCheckBox:checked + label::before {
  @apply border-main-500 bg-main-500;
  background-image: url('~@/assets/svgs/flag.svg');
}
</style>
