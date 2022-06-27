<template>
  <div class="card" style="width: 18rem">
    <img src="" class="card-img-top" alt="" />
    <div class="card-body">
      <h5 class="card-title"></h5>
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { commentService } from '../services/CommentService'
export default {

  setup() {
    return {
      comment: computed(() => AppState.comment),
      async getComment() {
        try {
          await commentService.getComment(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>