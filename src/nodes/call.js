import "@babel/polyfill";
import Rete, { Control } from "rete";
import socket from "./socket";
import Input from "../components/Input.vue";

class CallControl extends Control {
  constructor(emitter, key, readonly = false) {
    super(key);
    this.component = Input;
    this.props = {
      emitter,
      ikey: key,
      type: "string",
      readonly,
      change: () => this.onChange(),
      placeholder: key,
    };
  }

  setValue(value) {
    const ctx = this.vueContext || this.props;
    ctx.value = value;
  }

  onChange() {}
}

class CallNode extends Rete.Component {
  constructor() {
    super("Call");
  }

  builder(node) {
    const inputs = [];
    const outputs = [
      new Rete.Output("on_answer", "on answer", socket),
      new Rete.Output("no_answer", "no answer", socket),
      new Rete.Output("busy", "busy", socket),
      new Rete.Output("failed", "failed", socket),
    ];

    node.addControl(new CallControl(this.editor, "caller"));
    node.addControl(new CallControl(this.editor, "callee"));

    inputs.forEach((input) => {
      node.addInput(input);
    });
    outputs.forEach((output) => {
      node.addOutput(output);
    });
  }

  worker(node, inputs, outputs) {
    outputs[0] = node.data.num;
    if (node.outputs.on_answer.connections[0]?.input === "play") {
    }
  }
}

export default CallNode;
