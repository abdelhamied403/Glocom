import "@babel/polyfill";
import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";
import DockPlugin from "rete-dock-plugin";

export default (() => {
  const init = (components) => {
    const container = document.querySelector("#rete");
    const editor = new Rete.NodeEditor("demo@0.1.0", container);

    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(DockPlugin, {
      container: document.querySelector("#dock"),
      itemClass: "item", // default: dock-item
      plugins: [VueRenderPlugin], // render plugins
    });

    const engine = new Rete.Engine("demo@0.1.0");

    components.forEach((c) => {
      editor.register(c);
      engine.register(c);
    });

    editor.on(
      "process nodecreated noderemoved connectioncreated connectionremoved",
      async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
      }
    );

    editor.on("connectioncreate", ({ output, input }) => {
      console.log(output, input);
    });

    editor.view.resize();
    editor.trigger("process");
  };
  return {
    init,
  };
})();
