import { useField, useForm } from "vee-validate";
import * as yup from 'yup'

export function useRequestForm(fn) {
    const { isSubmitting, handleSubmit } = useForm({
        initialValues: {
            status: 'active'
        }
    })

    const {
        value: buy,
        errorMessage: bError,
        handleBlur: bBlur,
    } = useField('buy',
        yup.string()
            .trim()
            .required('Введите покупку/приобретение'));
    const {
        value: date,
        errorMessage: dError,
        handleBlur: dBlur,
    } = useField('date',
        yup.string()
            .trim()
            .required('Введите дату'));
    const {
        value: amount,
        errorMessage: aError,
        handleBlur: aBlur,
    } = useField('amount',
        yup.number()
            .required('Введите сумму')
            .min(0, 'Сумма не может быть меньше нуля'));
    const { value: status } = useField('status')


    const onSubmit = handleSubmit(fn)

    return {
        status,
        isSubmitting,
        onSubmit,
        buy,
        bError,
        bBlur,
        date,
        dError,
        dBlur,
        amount,
        aError,
        aBlur
    }
}