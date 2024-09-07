<script setup lang="ts">
import { CircleCheck, CircleX, Eye, EyeOffIcon, LoaderCircle } from 'lucide-vue-next';

import { cn } from '@/lib';

import { signInWithGoogle } from '@/services/oauth'

import { errors, formRegister, isAllInputValid, isLoading, onChangeHandler, registerHandler, visiblePassword } from './script';

import GoogleIcon from '~/assets/icons/google.svg'

const supabase = useSupabaseClient()

</script>

<template>
  <main class="px-5 pt-5 pb-[50px] md:grid md:grid-cols-2 md:p-[40px] min-h-screen md:gap-[20px]">
    <section class="flex justify-center items-center h-full">
      <div class="flex flex-col items-center gap-[30px] w-full max-w-[380px]">
        <form class="flex flex-col gap-[40px] items-start w-full" @submit="(event) => registerHandler(event, supabase)">
          <div>
            <h1 class="text-2xl font-semibold">Get Started</h1>
            <p>Unlock your potential. Get started today</p>
          </div>
          <div class="flex flex-col w-full gap-[10px]">
            <Input
id="email" type="email" :value="formRegister.email" label="Email"
              placeholder="Enter your email Ex: my@gmail.com" :error="errors.email" :change="onChangeHandler" />
            <Input
id="whatsAppNumber" type="number" :value="formRegister.whatsAppNumber" label="WhatsApp Number"
              placeholder="Enter your number Ex: 089899..." :error="errors.whatsAppNumber" :change="onChangeHandler" />
            <Input
id="password" :type="visiblePassword ? 'text' : 'password'" :value="formRegister.password"
              label="Password" placeholder="Enter your password Ex: @mypass2312" :change="onChangeHandler">
            <button
type="button" class="absolute right-2 group top-1/2 -translate-y-1/2"
              @click="visiblePassword = !visiblePassword">
              <Eye v-if="visiblePassword" class="text-neutral-500 group-hover:text-primary" />
              <EyeOffIcon v-else class="text-neutral-500 group-hover:text-primary" />
            </button>
            </Input>
          </div>
          <Button type="submit" class="w-full" :disabled="!isAllInputValid">
            <LoaderCircle v-if="isLoading" class="animate-spin" />
            <span v-else>Register</span>
          </Button>
          <div class="w-full grid grid-cols-2 gap-[5px]">
            <div
v-for="error in errors.password" :key="error.label"
              :class="cn('flex items-center gap-[5px] text-sm', !error.isValid ? 'text-[#DF4343]' : 'text-[#43DF66]')">
              <CircleCheck v-if="error.isValid" :size="20" />
              <CircleX v-else :size="20" />
              {{ error.label }}
            </div>
          </div>
        </form>
        <AuthSeparator />
        <Button class="w-full" :click="() => signInWithGoogle(supabase)">
          <GoogleIcon class="nuxt-icon" />
          Register with google
        </Button>
        <p>
          Already have account? <NuxtLink to="/login" class="font-medium underline">Sign In</NuxtLink>
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
