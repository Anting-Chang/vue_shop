<template>
  <div>
    <h1>Calculator</h1>
    <div><input type="text" v-model="a" @input="calc"></div>
    <div><input type="text" v-model="b" @input="calc"></div>
    <div>{{c}}</div>
    <button >Calc</button>
    <div><input type="text" v-model="website"></div>
    <a v-bind:href="website">Entered website</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      a: '1',
      b: '2',
      c: '',
      website: ''
    }
  },
  methods: {
    calc () {
      this.c = this.a + this.b
    }
  }
}
</script>

<style scoped>

</style>
