import "@babel/polyfill";
import Rete, { Control } from "rete";
import socket from "./socket";
import Input from "../components/Input.vue";

class GetInputControl extends Control {
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

class GetInputNode extends Rete.Component {
  constructor() {
    super("Get Input");
  }

  builder(node) {
    const inputs = [new Rete.Input("input", "", socket)];
    const outputs = [
      new Rete.Output("no_input", "no input", socket),
      new Rete.Output("wrong_input", "wrong input", socket),
      new Rete.Output("1", "1", socket),
      new Rete.Output("2", "2", socket),
    ];

    node.addControl(new GetInputControl(this.editor, "sound url"));

    inputs.forEach((input) => {
      node.addInput(input);
    });
    outputs.forEach((output) => {
      node.addOutput(output);
    });
  }

  worker(node, inputs, outputs) {
    outputs[0] = node.data.num;
  }
}

export default GetInputNode;
