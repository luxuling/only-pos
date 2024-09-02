<script setup lang="ts">
import { cn } from '@/lib';

interface ButtonProps {
  click?: (event: Event) => void;
  class?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

const props = defineProps<ButtonProps>()

</script>

<template>
  <button
:type="props.type" :disabled="props.disabled"
    :class="cn('px-5 w-fit h-[45px] font-medium gap-[5px] lg:h-[50px] flex justify-center items-center rounded-2xl border border-primary   transition-all', props.disabled === true ? 'text-neutral-500  shadow-brutalism-disable border-neutral-400 cursor-not-allowed' : 'shadow-brutalism text-primary active:translate-y-2 active:shadow-none', props.class)"
    @click="props.click">
    <slot />
  </button>
</template>
