<template>
  <div class="max-w-screen-2xl mx-auto" ref="app">
    <form class="flex flex-col min-h-screen">
      <div class="mobile-container flex-grow flex flex-col">
        <div class="content-wrapper md:flex-none flex-1">
          <div class="row flex flex-wrap px-5 md:px-7 mt-10">
            <div class="w-full md:w-1/3">
              <div class="flex flex-col h-full input-container">
                <label for="fio"
                  ><span class="text-third-500 text-xs">ФИО</span
                  ><span class="text-second-500">*</span></label
                >
                <div
                  class="input-wrapper flex flex-1 border-b h-10"
                  :class="{
                    'border-second-500': errors.length,
                    'border-third-500': !errors.length,
                  }"
                >
                  <input
                    id="fio"
                    ref="inputFio"
                    v-model="fio"
                    type="text"
                    placeholder="Введите ФИО"
                    class="focus:outline-none flex-grow text-base placeholder-third-500 self-end pb-2 min-h-39"
                    @keydown.enter="$refs.inputFio.blur()"
                  />
                  <div
                    v-if="fio"
                    @click="resetFio"
                    class="cursor-pointer text-second-500 flex"
                  >
                    <img src="@/assets/svgs/close.svg" alt="#" />
                  </div>
                </div>

                <transition name="fade">
                  <div
                    v-if="errors.length"
                    class="errors flex md:hidden text-second-500 mt-3 text-xxs flex items-center"
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
            </div>

            <div class="w-full md:w-1/3 md:px-7 my-7 md:m-0">
              <div class="input-container">
                <label for="education" class="text-third-500 text-xs"
                  >Образование</label
                >
                <div
                  class="input-wrapper flex border-third-500 border-b"
                  ref="educationDiv"
                  @click.self="showOptionsWindow = !showOptionsWindow"
                >
                  <div
                    id="education"
                    ref="inputEducation"
                    class="select-none min-h-39 flex items-center"
                  >
                    <span
                      v-if="!selectedEducation.length"
                      class="text-third-500 text-base"
                      @click.self="showOptionsWindow = !showOptionsWindow"
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
                            @click="removeSelected(index)"
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
                        @click="selectEducation(index)"
                      >
                        <div class="px-3.5 py-1 text-basexl">
                          {{ item }}
                        </div>
                      </li>
                    </ul>
                  </transition>
                </div>
              </div>
            </div>

            <div class="w-full md:w-1/3 mb-1.3 md:mb-0">
              <toggle-check-box
                :isReadyToTransfer="isReadyToTransfer"
                @checked="isReadyToTransfer = !isReadyToTransfer"
              />
            </div>
          </div>

          <Errors :errors="errors" />

          <div class="row flex flex-wrap px-5 md:px-7 mb-1.3">
            <SexToggler :sex="sex" @setSex="setSex" />

            <div class="flex mr-7 w-full md:w-auto mb-1.3 md:mb-0">
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

          <div
            class="row hidden md:flex px-5 md:px-7 mb-1.3"
            :class="{ 'opacity-50': isDisabled }"
          >
            <button
              :disabled="isDisabled"
              class="focus:outline-none border py-2 px-8 rounded-full text-base font-medium active:bg-third-100 duration-200 focus:outline-none select-none"
              @click="resetForm"
            >
              Отменить
            </button>
            <button
              :disabled="isDisabled"
              type="submit"
              @click="formHandler"
              class="focus:outline-none border py-2 px-8 rounded-full ml-4 text-base text-white font-medium border-main-500 bg-main-500 hover:bg-main-600 active:bg-main-700 duration-200 select-none"
            >
              Сохранить
            </button>
          </div>
        </div>

        <transition name="fade">
          <Toast :showModal="showModal" />
        </transition>
      </div>

      <div
        class="flex md:hidden h-9 border-t border-iron-500"
        :class="{ 'opacity-50': isDisabled }"
      >
        <button
          :disabled="isDisabled"
          @click="resetForm"
          class="w-1/2 focus:outline-none border-r border-iron-500 active:bg-third-100 text-base font-medium duration-200 select-none"
        >
          Отменить
        </button>
        <button
          :disabled="isDisabled"
          @click="formHandler"
          class="w-1/2 focus:outline-none text-base text-white font-medium bg-main-500 hover:bg-main-600 active:bg-main-700 duration-200 select-none"
        >
          Сохрандить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ToggleCheckBox from '@/components/toggleCheckBox'
import Errors from '@/components/errors'
import Toast from '@/components/toast'
import SexToggler from '@/components/sexToggler'

export default {
  name: 'App',
  components: { SexToggler, Toast, Errors, ToggleCheckBox },
  data: () => ({
    fio: '',
    errors: [],
    showOptionsWindow: false,
    showModal: false,
    isReadyToWorkFullDay: false,
    isRemoteWork: false,
    isReadyToTransfer: false,
    sex: 'male',
    isSexChosen: false,
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

  computed: {
    isDisabled() {
      return !(
        this.fio ||
        this.selectedEducation.length ||
        !!this.isReadyToTransfer ||
        this.sex === 'female' ||
        this.isSexChosen ||
        !!this.isReadyToWorkFullDay ||
        !!this.isRemoteWork
      )
    },
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
      if (!this.fio) {
        this.errors.push('Необходимо ввести ФИО')
      } else {
        this.showModal = true
        setTimeout(() => (this.showModal = false), 3000)
      }
    },
    resetFio() {
      this.fio = ''
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
      this.isSexChosen = false
    },
  },

  watch: {
    fio() {
      this.errors = []
    },
    sex() {
      this.isSexChosen = true
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
