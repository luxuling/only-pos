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
  blur?: () => void
  error?: string
}

const props = defineProps<InputProps>();

defineOptions({
  inheritAttrs: true
})

</script>

<template>
  <div v-if="label" class="flex w-full flex-col gap-[5px] items-start">
    <Label>{{ props.label }}</Label>
    <div class="w-full h-fit relative">
      <input
:id="props.id" :value="props.value"
        :class="cn('h-[45px] py-[13px] w-full px-[15px] bg-white border border-neutral-300 rounded-lg placeholder:text-sm placeholder:text-neutral-300 outline-none focus:outline-primary focus:border-none', props.error && props.error.length > 0 ? 'border-red-500 focus:outline-red-500' : '', props.class)"
        :placeholder="props.placeholder" :type="props.type" v-bind="$attrs" @input="props.change" @blur="props.blur">
      <slot />
    </div>
    <span v-if="props.error && props.error.length > 0" class="text-xs text-red-500">{{ props.error }}</span>
  </div>

  <div v-else>
    <div class="w-full h-fit relative">
      <input
:id="props.id" :value="props.value"
        :class="cn('h-[45px] py-[13px] w-full px-[15px] bg-white border border-neutral-300 rounded-lg placeholder:text-sm placeholder:text-neutral-300 outline-none focus:outline-primary focus:border-none', props.class)"
        :placeholder="props.placeholder" :type="props.type" @input="props.change" @blur="props.blur">
      <slot />
    </div>
    <span v-if="props.error && props.error.length > 0" class="text-xs text-red-500">{{ props.error }}</span>
  </div>
</template>
