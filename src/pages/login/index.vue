<script setup lang="ts">
import { Eye, EyeOffIcon, LoaderCircle } from 'lucide-vue-next'

import { signInWithGoogle } from '@/services/oauth';

import { errors, formLogin, isAllInputValid, isLoading, loginHandler, onChangeHandler, visiblePassword } from './script'

import GoogleIcon from '~/assets/icons/google.svg'

const supabase = useSupabaseClient()

</script>

<template>
  <main class="px-5 pt-5 pb-[50px] md:grid md:grid-cols-2 md:p-[40px] min-h-screen md:gap-[20px]">
    <section class="flex justify-center items-center h-full">
      <div class="flex flex-col items-center gap-[30px] w-full max-w-[380px]">
        <form class="flex flex-col gap-[40px] items-start w-full" @submit="(event) => loginHandler(event, supabase)">
          <div>
            <h1 class="text-2xl font-semibold">Get Started</h1>
            <p>Unlock your potential. Get started today</p>
          </div>
          <div class="flex flex-col w-full gap-[10px]">
            <Input
id="email" type="email" label="Email" placeholder="Enter your email Ex: my@gmail.com"
              :value="formLogin.email" :change="onChangeHandler" :error="errors.email" autocomplete="email" />
            <Input
id="password" :type="visiblePassword ? 'text' : 'password'" :value="formLogin.password"
              label="Password" placeholder="Enter your password Ex: @mypass2312" :change="onChangeHandler"
              :error="errors.password" autocomplete="current-password">
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
            <span v-else>Log In</span>
          </Button>
        </form>
        <AuthSeparator />
        <Button class="w-full" @click="() => signInWithGoogle(supabase)">
          <GoogleIcon class="nuxt-icon" />
          Log in with google
        </Button>
        <p>
          Don't have account? <NuxtLink to="/register" class="font-medium underline">Register</NuxtLink>
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
class="rounded-lg border-2 w-full border-neutral-500 hover:border-white transition-colors"
        src="/images/app_dashboard.png" />
    </section>
  </main>
</template>
