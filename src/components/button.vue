<script setup lang="ts">

import { cn } from '@/lib'

interface ButtonProps {
  click?: () => void
  class?: string
  type?: "button" | "submit" | "reset" | undefined
}

const props = defineProps<ButtonProps>()

</script>

<template>
  <button :type="props.type"
    :class="cn('px-5 w-fit h-[45px] font-medium gap-[5px] lg:h-[50px] flex justify-center items-center rounded-2xl border border-primary shadow-brutalism active:shadow-none active:translate-y-2 transition-all', props.class)"
    @click="props.click">
    <slot />
  </button>
</template>
