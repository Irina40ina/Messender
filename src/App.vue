<template>
  <router-view></router-view>
</template>

<script>
import { globalSocketStarted } from '@/plugins/socket.js';
export default {
    created: () => {
        globalSocketStarted();
    }
}
</script>

<style>
:root {
  --color-fg-main: rgb(34, 34, 34);
  --color-fg-header: rgb(54, 54, 54);
  --color-fg-chunk: rgb(48, 48, 48);
  --primary-fg: rgb(63, 205, 94);
  --primary-fg-light: rgba(63, 205, 94, 0.5);
  --color-bg-main: rgb(255, 255, 255);
  --color-bg-input: rgb(240, 240, 240);
  --shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
  --border: 1px solid rgba(128, 128, 128, 0.5);
  --nav-item-color-bg: rgba(128, 128, 128, 0.15);
  --font: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --radius: 3px;
  --default-bg: rgba(128, 128, 128, 0.2);
  --topbar-bg: rgba(128, 128, 128, 0.366);
  --topbar-fg: rgba(128, 128, 128, 0.744);
  --timepicker-border: rgb(54, 161, 78);
  --timepicker-bg: rgba(63, 205, 94, 0.3);
  --timepicker-fg: rgb(63, 205, 94);
  --profile-save-border: rgb(109, 172, 84);
  --profile-save-fg: rgb(119, 172, 84);
  --profile-save-hover: rgb(92, 209, 46);
  --colorful-bg: rgb(54, 161, 78);
  --violet: rgb(155, 108, 155);
}


</style>
