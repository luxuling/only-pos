import type { SupabaseClient } from '@supabase/supabase-js';
import * as yup from 'yup';

export const visiblePassword = ref<boolean>(false);
export const isAllInputValid = ref<boolean>(false);
const passwordState = ref<boolean[]>([]);
export const isLoading = ref<boolean>(false);

type IRegisterForm = {
  email: string;
  whatsAppNumber?: string;
  password: string;
};

type PasswordErrors = {
  label: string;
  isValid: boolean;
};

type Errors = {
  email: string;
  whatsAppNumber: string;
  password: PasswordErrors[];
};

export const errors = reactive<Errors>({
  email: '',
  whatsAppNumber: '',
  password: [],
});

export const formRegister = ref<IRegisterForm>({
  email: '',
  whatsAppNumber: '',
  password: '',
});

export const onChangeHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  formRegister.value = { ...formRegister.value, [target.id]: target.value };
};

// eslint-disable-next-line no-useless-escape
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(regexEmail, 'Your format email is not valid!')
    .required('Please fill this field'),
  whatsAppNumber: yup
    .string()
    .min(9, 'Your number is under 9 character!')
    .required('Please fill this field'),
});

export const validate = (field: keyof IRegisterForm) => {
  schema
    .validateAt(field, formRegister.value)
    .then((value) => {
      if (value && field !== 'password') {
        errors[field] = '';
      }
    })
    .catch((err) => {
      errors[field] = err.errors[0];
    });
};

const yupMatches = async (regex: RegExp, compare: string) => {
  return await yup.string().matches(regex).isValid(compare);
};

watch(formRegister, async (oldValue, newValue) => {
  const isContainLowerCase = await yupMatches(
    /[a-z]/g,
    formRegister.value.password,
  );
  const isContainUpperCase = await yupMatches(
    /[A-Z]/g,
    formRegister.value.password,
  );

  const isContainSymbol = await yupMatches(
    // eslint-disable-next-line no-useless-escape
    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
    formRegister.value.password,
  );
  const isContainNumber = await yupMatches(
    /[0-9]/,
    formRegister.value.password,
  );
  const minimumLength = await yup
    .string()
    .min(8)
    .isValid(formRegister.value.password);

  errors.password = [
    {
      label: 'contain lowercase',
      isValid: isContainLowerCase,
    },
    {
      label: 'contain uppercase',
      isValid: isContainUpperCase,
    },
    {
      label: 'contain number',
      isValid: isContainNumber,
    },
    {
      label: 'contain symbol',
      isValid: isContainSymbol,
    },
    {
      label: '8 character minimum',
      isValid: minimumLength,
    },
  ];

  if (oldValue.password !== newValue.password) {
    for (let i = 0; i < errors.password.length; i++) {
      if (errors.password[i] !== undefined) {
        passwordState.value[i] = errors.password[i].isValid;
      }
    }
  }
});

watch(errors, () => {
  if (
    passwordState.value.includes(false) ||
    errors.email.length > 0 ||
    errors.whatsAppNumber.length > 0
  ) {
    isAllInputValid.value = false;
  } else {
    isAllInputValid.value = true;
  }
});

export const registerHandler = async (
  event: Event,
  supabase: SupabaseClient,
) => {
  event.preventDefault();
  if (!isAllInputValid) return;

  isLoading.value = true;

  const { error } = await supabase.auth.signUp({
    email: formRegister.value.email,
    password: formRegister.value.password,
    options: {
      data: {
        whatsAppNumber: formRegister.value.whatsAppNumber,
      },
    },
  });

  isLoading.value = false;

  if (error) return console.log(error?.message);

  navigateTo('/register/success');
};
