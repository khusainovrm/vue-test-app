<template>
  <div class="flex h-full">
    <div class="self-end flex items-center mb-2">
      <label class="checkbox-ios">
        <input
          type="checkbox"
          :checked="isReadyToTransfer"
          @click="$emit('checked')"
        />
        <span class="checkbox-ios-switch"></span>
      </label>
      <div class="text-small">Готов к переезду</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toggleCheckBox',
  components: {},
  props: {
    isReadyToTransfer: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.checkbox-ios {
  display: inline-block;
  height: 28px;
  line-height: 28px;
  margin-right: 10px;
  position: relative;
  vertical-align: middle;
  font-size: 14px;
  user-select: none;
}
.checkbox-ios .checkbox-ios-switch {
  @apply border-iron-500 bg-iron-500;

  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 38px;
  height: 20px;
  border-radius: 25%/50%;
  vertical-align: top;
  transition: 0.2s;
}
.checkbox-ios .checkbox-ios-switch:before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  transition: 0.15s;
}
.checkbox-ios input[type='checkbox'] {
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.checkbox-ios
  input[type='checkbox']:not(:disabled):active
  + .checkbox-ios-switch:before {
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
}
.checkbox-ios input[type='checkbox']:checked + .checkbox-ios-switch {
  @apply bg-main-500;
}
.checkbox-ios input[type='checkbox']:checked + .checkbox-ios-switch:before {
  transform: translateX(18px);
}

/* Hover */
.checkbox-ios input[type='checkbox']:not(:disabled) + .checkbox-ios-switch {
  cursor: pointer;
  //border-color: rgba(0, 0, 0, 0.3);
}
</style>
