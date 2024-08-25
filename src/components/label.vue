<script setup lang="ts">
import { cn } from '@/lib'

interface LabelProps {
  class?: string;
}
const props = defineProps<LabelProps>()

</script>

<template>
  <label :class="cn('font-medium', props.class)">
    <slot />
  </label>
</template>
