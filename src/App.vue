<template>
  <div class="max-w-screen-2xl mx-auto" ref="app">
    <form @submit.prevent="formHandler" class="flex flex-col min-h-screen">
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
              <Education
                :selectedEducation="selectedEducation"
                :educationOptions="educationOptions"
                :showOptionsWindow="showOptionsWindow"
                @toggleOptionsWindow="showOptionsWindow = !showOptionsWindow"
                @removeSelected="removeSelected"
                @selectEducation="selectEducation"
                @closeOptionsWindow="closeOptionsWindow"
              />
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

      <BottomButtons
        :isDisabled="isDisabled"
        @resetForm="resetForm"
        @formHandler="formHandler"
      />
    </form>
  </div>
</template>

<script>
import ToggleCheckBox from '@/components/toggleCheckBox'
import Errors from '@/components/errors'
import Toast from '@/components/toast'
import SexToggler from '@/components/sexToggler'
import BottomButtons from '@/components/bottomButtons'
import Education from '@/components/education'

export default {
  name: 'App',
  components: {
    Education,
    BottomButtons,
    SexToggler,
    Toast,
    Errors,
    ToggleCheckBox,
  },
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
    formHandler() {
      this.errors = []
      if (!this.fio) {
        this.errors.push('Необходимо ввести ФИО')
      } else {
        this.showModal = true
        setTimeout(() => (this.showModal = false), 3000)
      }
    },
    closeOptionsWindow() {
      this.showOptionsWindow = false
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
    resetForm() {
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
