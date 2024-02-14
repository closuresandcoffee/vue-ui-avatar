<template>
  <div id="app">
    <ui-avatar status="online" label="Guy Fieri" image="/assets/guy.jpg" />
  </div>
</template>

<script>
import UIAvatar from './components/UIAvatar.vue'

export default {
  name: 'app',
  components: {
    'ui-avatar': UIAvatar,
  },
}
</script>
