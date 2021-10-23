<template>
  <input
    class="w-full px-2 py-1"
    :type="type || 'text'"
    :readonly="readonly"
    :value="value"
    :placeholder="placeholder"
    @input="onChange($event)"
    @mousedown.stop
  />
</template>

<script>
export default {
  props: [
    "initial",
    "readonly",
    "emitter",
    "ikey",
    "type",
    "change",
    "getData",
    "putData",
    "placeholder",
    "default",
  ],
  data() {
    return {
      value: this.initial || this.default,
    };
  },
  methods: {
    parse(value) {
      return this.type === "number" ? +value : value;
    },
    onChange(e) {
      this.value = this.parse(e.target.value);
      this.update();
    },
    update() {
      if (this.ikey) {
        this.putData(this.ikey, this.value);
        this.change(this.value);
      }
      this.emitter.trigger("process");
    },
  },
  mounted() {
    // this.value = this.getData(this.ikey);
  },
};
</script>

<style></style>
