<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

import { cn } from '@/lib'

interface InputProps {
  change: (event: Event) => void;
  label?: string
  placeholder?: string
  class?: string
  type?: InputTypeHTMLAttribute
}

const props = defineProps<InputProps>();

</script>

<template>
  <div v-if="label" class="flex w-full flex-col gap-[5px] items-start">
    <Label>{{ props.label }}</Label>
    <input @change="props.change"
      :class="cn('h-[45px] py-[13px] w-full px-[15px] bg-white border border-neutral-300 rounded-lg placeholder:text-sm placeholder:text-neutral-300 outline-none focus:outline-primary focus:border-none', props.class)"
      :placeholder="props.placeholder" :type="props.type" />
  </div>
  <input v-else @change="props.change"
    :class="cn('h-[45px] py-[13px] w-full px-[15px] bg-white border border-neutral-300 rounded-lg placeholder:text-sm placeholder:text-neutral-300 outline-none', props.class)"
    :placeholder="props.placeholder" />
</template>
