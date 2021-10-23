<script>
import CallNode from "./nodes/call";
import GetInputNode from "./nodes/getInput";
import PlaySoundNode from "./nodes/playSound";
import Rete from "./utils/Rete";

export default {
  name: "App",
  components: {},
  async mounted() {
    Rete.init([new CallNode(), new PlaySoundNode(), new GetInputNode()]);
  },
};
</script>

<template>
  <div class="page flex h-screen bg-blue-100">
    <div class="toolbox bg-gray-50 p-6 w-72">
      <h1 class="text-center text-3xl mb-4 capitalize font-bold">tool box</h1>
      <div id="dock"></div>
    </div>
    <div id="rete" class="node-editor flex-1 h-full"></div>
  </div>
</template>
