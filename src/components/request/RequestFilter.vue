<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Начните писать имя" v-model="buy">
    </div>
    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Выберите статус</option>
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn warning" v-if="isActive" @click="reset">Очистить</button>
  </div>
</template>

<script>
import {ref, watch, computed} from 'vue'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, {emit}) {
    const buy = ref()
    const status = ref()

    watch([buy, status], values => {
      emit('update:modelValue', {
        buy: values[0],
        status: values[1]
      })
    })

    const isActive = computed(() => buy.value || status.value)

    return {
      buy,
      status,
      isActive,
      reset: () => {
        buy.value = ''
        status.value = null
      }
    }
  }
}
</script>

<style scoped>

</style>