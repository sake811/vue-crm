<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: bError}">
      <label for="buy">Покупка</label>
      <input type="text" id="buy" v-model="buy" @blur="bBlur" />
      <small v-if="bError">{{bError}}</small>
    </div>

    <div class="form-control" :class="{invalid: dError}">
      <label for="date">Дата</label>
      <input type="text" id="date" v-model="date" @blur="dBlur" />
      <small v-if="dError">{{dError}}</small>
    </div>

    <div class="form-control" :class="{invalid: aError}">
      <label for="amount">Сумма</label>
      <input type="number" id="amount" v-model.number="amount" @blur="aBlur"/>
      <small v-if="aError">{{aError}}</small>
    </div>

    <div class="form-control">
      <label for="status">Статуc</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>

import {useRequestForm} from '../../use/request-form'
import {useStore} from 'vuex'

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()
    const submit = async values => {
      await store.dispatch('request/create', values)
      emit('created')
    }

    return {
      ...useRequestForm(submit)
    }
  }
};

</script>