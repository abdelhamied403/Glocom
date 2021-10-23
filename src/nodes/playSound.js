import "@babel/polyfill";
import Input from "../components/Input.vue";
import Rete, { Control } from "rete";
import socket from "./socket";

class SoundControl extends Control {
  constructor(emitter, key, readonly = false) {
    super(key);
    this.component = Input;
    this.props = {
      emitter,
      ikey: key,
      type: "string",
      readonly,
      change: () => this.onChange(),
      placeholder: "sound url",
      default: "https://www.myinstants.com/media/sounds/wow_2.mp3",
    };
  }

  setValue(value) {
    const ctx = this.vueContext || this.props;
    ctx.value = value;
  }

  onChange() {
    const audio = new Audio(this.parent.data.sound);
    audio.play();
  }
}

class PlaySoundNode extends Rete.Component {
  constructor() {
    super("Play Sound");
  }

  playSoundSocket = new Rete.Socket("c1");
  builder(node) {
    const inputs = [new Rete.Input("play", "", socket, true)];
    const outputs = [];

    node.addControl(new SoundControl(this.editor, "sound"));

    inputs.forEach((input) => {
      node.addInput(input);
    });
    outputs.forEach((output) => {
      node.addOutput(output);
    });
  }

  worker(node, inputs, outputs) {
    outputs[0] = node.data.sound;
    let canPlay = false;
    node.inputs.play.connections.forEach((conn) => {
      if (
        conn.output === "on_answer" ||
        conn.output === "1" ||
        conn.output === "2"
      ) {
        canPlay = true;
      }
    });

    if (canPlay) {
      if (node.data.sound !== "") {
        const audio = new Audio(
          node.data.sound || "https://www.myinstants.com/media/sounds/wow_2.mp3"
        );
        audio.play();
      }
    }
  }
}

export default PlaySoundNode;
