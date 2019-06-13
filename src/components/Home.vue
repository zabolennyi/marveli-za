<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Home
    section
      .container
        .task-list
          .task-item(
            v-for="task in tasks"
            :key="tasks.id"
            :class="{ completed: task.completed }"
          )
            .ui-card.ui-card--shadow
              .task-item__info
                .task-item__main-info
                  span.ui-label.ui-label--light {{ task.whatWhatch }}
                  span Total Time:
                span.button-close
              .task-item__content
                span.ui-title-3 {{ task.title }}

</template>
<script>
export default {
  data () {
    return {
      tasks: [
        {
          'id': 1,
          'title': 'Iron Man',
          'description': 'aaaaa',
          'whatWhatch': 'Film',
          'completed': false,
          'editing': false
        },
        {
          'id': 2,
          'title': 'Doctor Strange',
          'description': 'bbbbb',
          'whatWhatch': 'Serial',
          'completed': false,
          'editing': false
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.task-item
  margin-bottom 20px
  &:last-child
    margin-bottom 0

.ui-label
  margin-right 8px

.task-item__info
  display flex
  align-items center
  justify-content space-between
  margin-bottom 20px
  .button-close
    width 20px
    height @width
</style>
