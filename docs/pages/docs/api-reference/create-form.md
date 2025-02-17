---
title: createForm
description: This guide describes all resources of createForm function.
tags: react, form, useform, use-form, debounce, debounced, hook, yup, validation, form-error, error
---

# createForm

Useform does not have a huge API, in fact it's a tiny API, witch means you don't have a lot of things to learn, but that does not means that **UseForm**, is not powerful, this library provides you all resources you need to deal with forms in React applications.

This function is the main resource of **useForm** library, it return hook function, as others React hooks, this function should be executed inside a component.

### createForm params

- **initialValues** - The initial values of the createForm function depend on the initial values of the form fields that you want to manage with the hook. For example, if you want to manage a form with three fields - name, email, and password - the initial values of the useForm hook would look something like this:

```js
const yourHookForm = createForm({
  initialValues: {
    name: '',
    email: '',
    password: '',
  },
});
```

Now, form state will contain the initial values for each of the form fields that you are managing with the createForm function. You can then use the function to update the form state whenever the user enters new values into the form fields.

> It's important to note that the initial values of the createForm function are not required - you can initialize the hook without specifying any initial values. But, we recommend to add initialValues.

- **initialErrors** - This property represents a errors object that has all properties of a form values.

```jsx
import { createForm } from '@use-form/use-form';

const yourHookForm = createForm({
  initialErrors: {
    name: 'Invalid name!',
    email: 'Invalid format!',
    accept: 'This field is required!',
  },
});
```

- **initialTouched** - This property represents a touched object that has all properties of a form values.

```jsx
import { createForm } from '@use-form/use-form';

const yourHookForm = createForm({
  initialTouched: {
    name: false,
    email: false,
    accept: false,
  },
});
```

- **yourHooForm** - This is a hook that should be used inside a functional component, this hook provides resources that you need to manager forms, let all of them:

  - **form** - This property is an observable of the form, ti allow you to subscribe and watch every change that happens inside the form, or change the form state.

  - **register** - register is a function that is used to register a input into the form. This function receives one parameter, witch is the field name, `register('name')`.

  - **setFieldValue** - This function is typically used in the context of a form. It allows you to set the value of a specific field in the form. This can be useful for pre-populating form fields with default values, or for programmatically setting the value of a field based on the user's input in other fields. For example, if you have a form with a field for the user's first and last name, example: `setFieldError("name","Jesse")`.

  - **setFieldsValue** - function is similar to the setFieldValue function, but it allows you to set the values of multiple fields in a form at once. This can be useful for pre-populating a form with default values, or for programmatically setting the values of multiple fields based on the user's input in other fields. For example, if you have a form with fields for the user's first and last name, you could use setFieldsValue to set the values of both fields at the same time. This would ensure that the form always contains the most up-to-date values based on the user's input.

    ```jsx
    const { setFieldValues } = yourHookForm();

    setFieldsValue({
      name: 'Jesse',
      lastName: '...',
    });

    //or

    setFieldsValue((state) => ({
      ...state,
      lastName: '...',
    }));
    ```

  - **setFieldError** - This function is typically used in a form validation context. It allows you to set an error message for a specific field in a form. This is useful for providing feedback to the user about what went wrong with their input. For example, if a user enters an invalid email address, you could use setFieldError to set the error message for the email field to something like `setFieldError("email","Please enter a valid email address.")` This error message would then be displayed to the user so that they know what they need to fix in order to successfully submit the form.

  - **setFieldsError** - This function is similar to the setFieldError function, but it allows you to set error messages for multiple fields in a form at once. This can be useful for providing feedback to the user about any errors in their input. For example, if a user submits a form with multiple invalid fields, you could use setFieldsError to set the error messages for all of the invalid fields at the same time. This would allow the user to easily see all of the errors in their input and correct them before resubmitting the form.

    ```jsx
    const { setFieldsError } = yourHookForm();

    setFieldsError({
      name: 'Invalid name!',
      lastName: 'This field is required!',
    });

    //or

    setFieldsError((state) => ({
      ...state,
      lastName: 'This field is required!',
    }));
    ```

  - **setFieldTouched** - It is a function that allows you to mark a specific field as "touched", which means that the field has been interacted with by the user. This is often used in conjunction with form validation, as it allows you to only validate fields that have been touched by the user. For example, if you have a required field in a form that the user has not interacted with, you could use setFieldTouched to mark the field as touched before running the validation. This would ensure that the validation checks the field and displays an error message if the field is empty, example: `setFieldTouched("name",true)`.

  - **setFieldsTouched** - The setFieldsTouched function is similar to the setFieldTouched function, but it allows you to mark multiple fields as "touched" at the same time. This can be useful for ensuring that all relevant fields in a form are validated, even if the user has not directly interacted with all of them. For example, if you have a form with multiple required fields, you could use setFieldsTouched to mark all of the required fields as touched before running the validation. This would ensure that all of the required fields are checked and that any empty fields display an error message to the user.

    ```jsx
    const { setFieldsError } = yourHookForm();

    setFieldsTouched({
      name: true,
      lastName: false,
    });

    //or

    setFieldsTouched((state) => ({
      ...state,
      lastName: false,
    }));
    ```

  - **reset** - It allows you to reset the form to its initial, unmodified state. This can be useful for clearing all of the user's input and starting over, or for resetting the form after a successful submission. For example, if the user submits a form and the submission is successful, you could use the reset function to clear all of the form fields and reset any error messages or validation states. This would allow the user to start fresh and enter new data into the form.

  - **resetValues** - The resetValues function is similar to the reset function, but it only resets the values of the form fields, and not their error messages or validation states. This can be useful for clearing the user's input from the form without resetting the form's validation state. For example, if the user submits a form and the submission is successful, you could use the resetValues function to clear all of the form fields without resetting any error messages or validation states. This would allow the user to start fresh and enter new data into the form, while still displaying any existing error messages or validation errors.

  - **resetErrors** - The resetErrors function is similar to the reset function, but it only resets the error messages of the form fields, and not their values or validation states. This can be useful for clearing any existing error messages from the form without resetting the form's values or validation state. For example, if the user submits a form and the submission is successful, you could use the resetErrors function to clear all of the error messages from the form fields without resetting the values or validation state. This would allow the user to start fresh and enter new data into the form, while still retaining any existing values and validation errors.

  - **resetTouched** - The resetTouched function is similar to the reset function, but it only resets the "touched" state of the form fields, and not their values, error messages, or validation states. This can be useful for resetting the "touched" state of the form fields without resetting any other aspects of the form. For example, if the user submits a form and the submission is successful, you could use the resetTouched function to reset the "touched" state of all of the form fields without resetting their values, error messages, or validation states. This would allow the user to start fresh and enter new data into the form, while still retaining any existing values, error messages, and validation errors.

  - **handleSubmit** - It is a method that is called when the user submits the form. This function is responsible for performing any necessary form validation and handling the form submission. For example, when the user clicks the "Submit" button on a form, the handleSubmit function would be called. This function would then run the form validation to ensure that all of the required fields are filled out and that the user's input is valid. If the validation is successful, the handleSubmit function would handle the form submission, typically by sending the form data to a server for processing. If the validation fails, the handleSubmit function would typically display error messages to the user so that they can fix any issues with their input before resubmitting the form.

    ```jsx
    const Form = () => {
      const { handleSubmit } = yourHookForm();

      function handleOnSubmit(e) {
        mutation(e);
      }

      return (
        <form onsubmit={handleSubmit(handleOnSubmit)}>
          <button type="submit">Submit</button>
        </form>
      );
    };
    ```

  - **state** - This object contains information about the values of the form fields, their error messages, their validation states, and other metadata about the form. The formState object is typically used to populate the form fields and display any validation errors or other feedback to the user.

    ```jsx
    const { state } = yourHookForm();
    const { values, errors, touched } = state;
    ```
