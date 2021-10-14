import { useEffect, useReducer } from 'react'
import { isCheckbox, isParsableToNumber } from './Utils'
import { get } from '../StateManagement/ObjectPath'
import { FormValuesState } from '../StateManagement/FormValuesState'
import { Validate } from '../Validation/Validate'
import { CreateField, FieldType } from './CreateField'
import { FormErrorsState } from '../StateManagement/FormErrorsState'
import { FormTouchedState } from '../StateManagement/FormTouchedState'
import { FormPristineState } from '../StateManagement/FormPristineState'

type Options = {
   mode: 'onBlur' | 'onChange' | 'onSubmit'
   validateOn?: 'onBlur' | 'onChange' | 'onSubmit'
}

type Action = {
   type: 'touched' | 'errors' | 'values' | 'pristine'
   payload: any
}

function stateReducer(state: FormValuesState, action: Action) {
   return {
      ...state,
      [action.type]: action.payload
   }
}

/**
 * CREATE FORM
 *
 * @param {Function} function - This function receives a `CreateField` function as a parameter, and returns a custom hook.
 * @example const useForm = create(register => ({
 *    name: register('') }),
 *    email => ({ email: register('')
 * })) `or`
 *
 * const useForm = create(register => ({
 *    name: register(['', required('This field is required'),...more validators]),
 *    email: register(['', required('This field is required',...more validators)])
 * }))
 */
export function create(fn: Function) {
   const state = new FormValuesState({})
   const validate = new Validate()
   const errors = new FormErrorsState({})
   const touched = new FormTouchedState({})
   const pristine = new FormPristineState({})

   return (options?: Options) => {
      const fields = fn(CreateField)

      function register(name: string, type?: FieldType) {
         const { validations, ...field } = get(fields, name)
         const [formState, setFormState] = useReducer(stateReducer, {})

         function handleOnChange(event: any) {
            if (isCheckbox(field.type)) {
               return state.setFieldValue(name, event.target.checked)
            }
            const value = isParsableToNumber(event.target.value)
               ? parseInt(event.target.value, 10)
               : event.target.value

            return state.setFieldValue(name, value)
         }

         function handleValidate(event: any) {
            errors.setFieldError(
               name,
               validate.validate(event.target.value, validations)
            )
         }

         function handleTouched() {
            touched.setFieldTouched(name, true)
         }

         function inputEventHandler(event: any) {
            if (options?.mode === 'onChange') {
               console.log(
                  pristine.getFieldsPristine(),
                  errors.getFieldsError()
               )
               handleOnChange(event)
               handleValidate(event)
            }
         }

         function blurEventHandler(event: any) {
            if (options?.mode === 'onBlur') {
               handleOnChange(event)
               handleValidate(event)
               handleTouched()
            }
         }

         function focusEventHandler() {
            pristine.setFieldPristine(name)
         }

         function submitEventHandler(event: any) {
            if (options?.mode === 'onSubmit') {
               handleOnChange(event)
               handleValidate(event)
            }
         }

         useEffect(() => {
            if (field.ref.current) {
               field.ref.current.addEventListener('focus', focusEventHandler)
            }
         }, [field.ref])

         useEffect(() => {
            if (field.ref.current) {
               field.ref.current.addEventListener('input', inputEventHandler)
               field.ref.current.addEventListener('blur', blurEventHandler)
            }

            return () => {
               field.ref.current.removeEventListener('input', inputEventHandler)
               field.ref.current.removeEventListener('blur', blurEventHandler)
            }
         }, [field.ref])

         useEffect(() => {
            if (field.ref.current && type === 'radio') {
               Array.from(
                  (field.ref.current as HTMLDivElement).getElementsByTagName(
                     'input'
                  )
               ).forEach((radio: any) => {
                  radio.checked = radio.value == field.defaultChecked
               })
            }
         }, [field.ref])

         return { ...field, name }
      }

      return {
         state: state.getFormValues(),
         register
      }
   }
}
