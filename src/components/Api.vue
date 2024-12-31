<script setup lang="ts">
import { ApiReference } from "@scalar/api-reference";
import "@scalar/api-reference/style.css";
</script>

<template>
  <ApiReference
    :configuration="{
      spec: {
        url: 'https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.yaml',
      },
    }"
  />
</template>
