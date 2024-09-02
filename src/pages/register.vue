<script setup lang="ts">
import { Eye, EyeOffIcon } from 'lucide-vue-next';

import GoogleIcon from '~/assets/icons/google.svg'

const supabase = useSupabaseClient()
const visiblePassword = ref<boolean>(false)

interface IForm {
  email: string;
  whatsAppNumber?: string;
  password: string;
}

const formRegister = ref<IForm>({
  email: '',
  whatsAppNumber: undefined,
  password: ''
})

const onChangeHandler = (event: Event) => {
  const target = event.target as HTMLInputElement
  formRegister.value = { ...formRegister.value, [target.id]: target.value }
}

const onClickHandler = async (event: Event) => {
  event.preventDefault()
  console.log(formRegister.value)

  const { error } = await supabase.auth.signUp({
    email: formRegister.value.email,
    password: formRegister.value.email,
    options: {
      data: {
        whatsAppNumber: formRegister.value.whatsAppNumber
      }
    }
  })

  if (error) console.log(error?.message)
}
</script>

<template>
  <main class="px-5 pt-5 pb-[50px] md:grid md:grid-cols-2 md:p-[40px] min-h-screen md:gap-[20px]">
    <section class="flex justify-center items-center h-full">
      <div class="flex flex-col items-center gap-[30px] w-full max-w-[380px]">
        <form class="flex flex-col gap-[40px] items-start w-full" @submit="onClickHandler">
          <div>
            <h1 class="text-2xl font-semibold">Get Started</h1>
            <p>Unlock your potential. Get started today</p>
          </div>
          <div class="flex flex-col w-full gap-[10px]">
            <Input
id="email" type="email" :value="formRegister.email" label="Email"
              placeholder="Enter your email Ex: my@gmail.com" :change="onChangeHandler" />
            <Input
id="whatsAppNumber" type="number" :value="formRegister.whatsAppNumber" label="WhatsApp Number"
              placeholder="Enter your number Ex: 089899..." :change="onChangeHandler" />
            <Input
id="password" :type="visiblePassword ? 'text' : 'password'" :value="formRegister.password"
              label="Password" placeholder="Enter your password Ex: @mypass2312" :change="onChangeHandler">
            <button class="absolute right-2 group top-1/2 -translate-y-1/2" @click="visiblePassword = !visiblePassword">
              <Eye v-if="visiblePassword" class="text-neutral-500 group-hover:text-primary" />
              <EyeOffIcon v-else class="text-neutral-500 group-hover:text-primary" />
            </button>
            </Input>
          </div>
          <Button type="submit" class="w-full">Register</Button>
        </form>
        <AuthSeparator />
        <Button :click="onClickHandler" class="w-full">
          <GoogleIcon class="nuxt-icon" />
          Register with google
        </Button>
        <p>
          Already have account? <NuxtLink to="/auth/login" class="font-medium underline">Sign In</NuxtLink>
        </p>
      </div>
    </section>
    <section
      class="hidden bg-primary rounded-lg h-full md:flex text-white flex-col justify-center items-center px-[50px] gap-[50px]">
      <div>
        <h2 class="text-xl font-medium">{{ `⭐ A simple way to receive your first POS with high performance at no cost.
          Try
          it for free today. 🤑 `}}</h2>
        <p>Fast & Reliable POS, Free to Try.</p>
      </div>
      <NuxtImg
class="rounded-lg w-full border-2 border-neutral-500 hover:border-white transition-colors"
        src="/images/app_dashboard.png" />
    </section>
  </main>
</template>
