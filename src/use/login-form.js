import { computed, watch } from 'vue'
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()
  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const MIN_LENGTH = 8


  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur,
  } = useField("email", yup.string().trim().required('Пожалуйста введите Email').email('Введите корректный Email'));

  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField("password", yup.string().trim().required('Пожалуйста введите Password').min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`));


  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => submitCount.value = 0, 15000)
    }
  })


  const onSubmit = handleSubmit(async values => {
    console.log('Form:', values)
    try {
      await store.dispatch('auth/login', values)
      router.push('/')
    } catch (e) {

    }
  })

  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts
  };
}