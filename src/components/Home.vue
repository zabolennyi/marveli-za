<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Home
        input(
          type="text"
          placeholder="What we will watch?"
          v-model="taskTitle"
          @keyup.enter="newTask"
        )
        textarea(
          type="text"
          placeholder="Description"
          v-model="taskDescription"
          @keyup.enter="newTask"
        )
        .option-list
          input.what-watch--radio(
            type="radio"
            id="radioFilm"
            value="Film"
            v-model="whatWatch"
          )
          label(
            for="radioFilm"
          ) Film
          input.what-watch--radio(
            type="radio"
            id="radioSerial"
            value="Serial"
            v-model="whatWatch"
          )
          label(
            for="radioSerial"
          ) Serial
        /////// time
        .total-time
          .total-time__film(
            v-if="whatWatch === 'Film'"
          )
            span.time-title Hours
            input.time-input(
              type="number"
              v-model="filmHours"
            )
            span.time-title Minutes
            input.time-input(
              type="number"
              v-model="filmMinutes"
            )
            p {{filmTime}}
          .total-time__serial(
            v-if="whatWatch === 'Serial'"
          )
            span.time-title How many season?
            input.time-input(
              type="number"
              v-model="serialSeason"
            )
            span.time-title How many series?
            input.time-input(
              type="number"
              v-model="serialSeries"
            )
            span.time-title How long is one series (minutes)?
            input.time-input(
              type="number"
              v-model="serialSeriesMinutes"
            )
            p {{serialTime}}
            /////// tags
        .tag-list.tag-list--add
          .ui-tag__wrapper(
            @click="tagMenuShow = !tagMenuShow"
          )
            .ui-tag
              span.tag-title Add New
              span.button-close(
                :class="{ active: !tagMenuShow }"
              )
        .tag-list.tag-list--menu(
          v-if="tagMenuShow"
        )
          input.tag-add--input(
            type="text"
            placeholder="New tag"
            v-model="tagTitle"
            @keyup.enter="newTag"
          )
          .button.button-primary(
            @click="newTag"
          ) Send
        .tag-list
          .ui-tag__wrapper(
            v-for="tag in tags"
            :key="tag.title"
          )
            .ui-tag(
              @click="addTagUsed(tag)"
              :class="{used: tag.use}"
            )
              span.tag-title {{tag.title}}
              span.button-close
        p {{ tagsUsed }}
         .button-list
            button.button.button--round.button-primary(
              @click="newTask"
            ) Add
</template>
<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      whatWatch: 'Film',
      filmHours: 1,
      filmMinutes: 11,
      serialSeason: 1,
      serialSeries: 21,
      serialSeriesMinutes: 45,
      tagTitle: '',
      tagMenuShow: false,
      tagsUsed: [],
      tags: [
        {
          title: 'Phase 1',
          use: false
        },
        {
          title: 'Phase 2',
          use: false
        },
        {
          title: 'Phase 3',
          use: false
        }
      ]
    }
  },
  methods: {
    newTag () {
      if (this.tagTitle === '') {
        return
      }
      this.tags.push({
        title: this.tagTitle,
        used: false
      })
    },
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      let time
      if (this.whatWatch === 'Film') {
        time = this.filmTime
      } else {
        time = this.serialTime
      }
      const task = ({
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        tags: this.tagsUsed,
        time,
        completed: false,
        editing: false
      })
      this.$store.dispatch('newTask', task)
      console.log(task)
      //  reset
      this.taskTitle = ''
      this.taskDescription = ''
      this.tagsUsed = []
    },
    addTagUsed (tag) {
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push({
          title: tag.title
        })
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
    },
    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let min = minutes % 60
      return hours + ' Hours ' + min + ' Minutes'
    }
  },
  computed: {
    filmTime () {
      let min = (this.filmHours * 60) + (this.filmMinutes * 1)
      return this.getHoursAndMinutes(min)
    },
    serialTime () {
      let min = this.serialSeason * this.serialSeries * this.serialSeriesMinutes
      return this.getHoursAndMinutes(min)
    }
  }
}
</script>

<style lang="stylus" scoped>
.option-list
  display flex
  .what-watch--radio
    margin-right 12px
  .label
    margin-right 20px
    &:last-child
      margin-right  0

.total-time
  display block
  margin-bottom 20px

.time-title
  display block
  margin-bottom 6px

.time-input
  max-width 80px
  margin-right 10px

.tag-list
  margin-bottom 20px

.ui-tag__wrapper
  margin-right 18px
  margin-bottom 10px
  &:last-child
    margin-right 0

.ui-tag
  .button-close
    &.active
      transform: rotate(90deg)
  &.used
    background-color: #48f442
    color #ffffff
    .button-close
      &:before,
      &after
        background-color: #000000

.tag-list--menu
  display flex
  justify-content space-between
  align-items center

.tag-add--input
  margin-bottom 0
  margin-right 10px
  height 42px

.button-list
  display flex
  justify-content flex-end
</style>
