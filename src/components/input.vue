<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

import { cn } from '@/lib'

interface InputProps {
  change: (event: Event) => void;
  value?: string;
  label?: string
  placeholder?: string
  class?: string
  id?: string;
  type?: InputTypeHTMLAttribute
}

const props = defineProps<InputProps>();

</script>

<template>
  <div v-if="label" class="flex w-full flex-col gap-[5px] items-start">
    <Label>{{ props.label }}</Label>
    <div class="w-full h-fit relative">
      <input
:id="props.id" :value="props.value"
        :class="cn('h-[45px] py-[13px] w-full px-[15px] bg-white border border-neutral-300 rounded-lg placeholder:text-sm placeholder:text-neutral-300 outline-none focus:outline-primary focus:border-none', props.class)"
        :placeholder="props.placeholder" :type="props.type" @input="props.change">
      <slot />
    </div>
  </div>
  <div v-else class="w-full h-fit relative">
    <input
:id="props.id" :value="props.value"
      :class="cn('h-[45px] py-[13px] w-full px-[15px] bg-white border border-neutral-300 rounded-lg placeholder:text-sm placeholder:text-neutral-300 outline-none focus:outline-primary focus:border-none', props.class)"
      :placeholder="props.placeholder" :type="props.type" @input="props.change">
    <slot />
  </div>
</template>
