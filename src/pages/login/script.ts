import type { SupabaseClient } from '@supabase/supabase-js';
import * as yup from 'yup';

import { regexEmail } from '@/lib';

export const visiblePassword = ref<boolean>(false);
export const isAllInputValid = ref<boolean>(false);
export const isLoading = ref<boolean>(false);

type ILoginForm = {
  email: string;
  password: string;
};

export const formLogin = ref<ILoginForm>({
  email: '',
  password: '',
});

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(regexEmail, 'Your format email is not valid!')
    .required('Please fill this field'),
  password: yup.string().required('Please fill this field'),
});

type Errors = {
  email: string;
  password: string;
};

export const errors = reactive<Errors>({
  email: '',
  password: '',
});

export const validate = (field: keyof ILoginForm) => {
  schema
    .validateAt(field, formLogin.value)
    .then(() => {
      errors[field] = '';
    })
    .catch((err) => {
      errors[field] = err.errors[0];
    });
};

watch([formLogin, errors], () => {
  if (
    errors.email.length > 0 ||
    errors.password.length > 0 ||
    formLogin.value.password.length === 0 ||
    formLogin.value.email.length === 0
  ) {
    isAllInputValid.value = false;
  } else {
    isAllInputValid.value = true;
  }
});

export const onChangeHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  formLogin.value = { ...formLogin.value, [target.id]: target.value };
  validate(target.id as keyof ILoginForm);
};

export const loginHandler = async (event: Event, supabase: SupabaseClient) => {
  event.preventDefault();
  if (!isAllInputValid) return;

  isLoading.value = true;

  const { error } = await supabase.auth.signInWithPassword({
    email: formLogin.value.email,
    password: formLogin.value.password,
  });

  isLoading.value = false;

  if (error) {
    return console.error(error.message);
  }

  navigateTo('/');
};
