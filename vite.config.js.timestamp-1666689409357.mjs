// vite.config.js
import { defineConfig } from "file:///Users/a123/yangyunping/react%E8%BD%AE%E5%AD%90/my-react-app1/node_modules/vite/dist/node/index.js";

// src/vite_plugins/svgstore.js
import path from "path";
import fs from "fs";
import store from "file:///Users/a123/yangyunping/react%E8%BD%AE%E5%AD%90/my-react-app1/node_modules/svgstore/src/svgstore.js";
import { optimize } from "file:///Users/a123/yangyunping/react%E8%BD%AE%E5%AD%90/my-react-app1/node_modules/svgo/lib/svgo-node.js";
var svgstore = (options = {}) => {
  const inputFolder = options.inputFolder || "src/assets/icons";
  return {
    name: "svgstore",
    resolveId(id) {
      if (id === "@svgstore") {
        return "svg_bundle.js";
      }
    },
    load(id) {
      if (id === "svg_bundle.js") {
        const sprites = store(options);
        const iconsDir = path.resolve(inputFolder);
        for (const file of fs.readdirSync(iconsDir)) {
          const filepath = path.join(iconsDir, file);
          const svgid = path.parse(file).name;
          let code2 = fs.readFileSync(filepath, { encoding: "utf-8" });
          sprites.add(svgid, code2);
        }
        const { data: code } = optimize(
          sprites.toString({ inline: options.inline }),
          {
            plugins: [
              "cleanupAttrs",
              "removeDoctype",
              "removeComments",
              "removeTitle",
              "removeDesc",
              "removeEmptyAttrs",
              {
                name: "removeAttrs",
                params: { attrs: "(data-name|data-xxx)" }
              }
            ]
          }
        );
        return `const div = document.createElement('div')
div.innerHTML = \`${code}\`
const svg = div.getElementsByTagName('svg')[0]
if (svg) {
  svg.style.position = 'absolute'
  svg.style.width = 0
  svg.style.height = 0
  svg.style.overflow = 'hidden'
  svg.setAttribute("aria-hidden", "true")
}
// listen dom ready event
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.firstChild) {
    document.body.insertBefore(div, document.body.firstChild)
  } else {
    document.body.appendChild(div)
  }
})`;
      }
    }
  };
};

// vite.config.js
import react from "file:///Users/a123/yangyunping/react%E8%BD%AE%E5%AD%90/my-react-app1/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), svgstore()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL3ZpdGVfcGx1Z2lucy9zdmdzdG9yZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hMTIzL3lhbmd5dW5waW5nL3JlYWN0XHU4RjZFXHU1QjUwL215LXJlYWN0LWFwcDFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hMTIzL3lhbmd5dW5waW5nL3JlYWN0XHU4RjZFXHU1QjUwL215LXJlYWN0LWFwcDEvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2ExMjMveWFuZ3l1bnBpbmcvcmVhY3QlRTglQkQlQUUlRTUlQUQlOTAvbXktcmVhY3QtYXBwMS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgc3Znc3RvcmUgfSBmcm9tIFwiLi9zcmMvdml0ZV9wbHVnaW5zL3N2Z3N0b3JlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSxzdmdzdG9yZSgpXVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2ExMjMveWFuZ3l1bnBpbmcvcmVhY3RcdThGNkVcdTVCNTAvbXktcmVhY3QtYXBwMS9zcmMvdml0ZV9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYTEyMy95YW5neXVucGluZy9yZWFjdFx1OEY2RVx1NUI1MC9teS1yZWFjdC1hcHAxL3NyYy92aXRlX3BsdWdpbnMvc3Znc3RvcmUuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2ExMjMveWFuZ3l1bnBpbmcvcmVhY3QlRTglQkQlQUUlRTUlQUQlOTAvbXktcmVhY3QtYXBwMS9zcmMvdml0ZV9wbHVnaW5zL3N2Z3N0b3JlLmpzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBzdG9yZSBmcm9tIFwic3Znc3RvcmVcIjsgLy8gXHU3NTI4XHU0RThFXHU1MjM2XHU0RjVDIFNWRyBTcHJpdGVzXG5pbXBvcnQgeyBvcHRpbWl6ZSB9IGZyb20gXCJzdmdvXCI7IC8vIFx1NzUyOFx1NEU4RVx1NEYxOFx1NTMxNiBTVkcgXHU2NTg3XHU0RUY2XG5cbmV4cG9ydCBjb25zdCBzdmdzdG9yZSA9IChvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3QgaW5wdXRGb2xkZXIgPSBvcHRpb25zLmlucHV0Rm9sZGVyIHx8IFwic3JjL2Fzc2V0cy9pY29uc1wiO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwic3Znc3RvcmVcIixcbiAgICByZXNvbHZlSWQoaWQpIHtcbiAgICAgIGlmIChpZCA9PT0gXCJAc3Znc3RvcmVcIikge1xuICAgICAgICByZXR1cm4gXCJzdmdfYnVuZGxlLmpzXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBsb2FkKGlkKSB7XG4gICAgICBpZiAoaWQgPT09IFwic3ZnX2J1bmRsZS5qc1wiKSB7XG4gICAgICAgIGNvbnN0IHNwcml0ZXMgPSBzdG9yZShvcHRpb25zKTtcbiAgICAgICAgY29uc3QgaWNvbnNEaXIgPSBwYXRoLnJlc29sdmUoaW5wdXRGb2xkZXIpO1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZnMucmVhZGRpclN5bmMoaWNvbnNEaXIpKSB7XG4gICAgICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4oaWNvbnNEaXIsIGZpbGUpO1xuICAgICAgICAgIGNvbnN0IHN2Z2lkID0gcGF0aC5wYXJzZShmaWxlKS5uYW1lO1xuICAgICAgICAgIGxldCBjb2RlID0gZnMucmVhZEZpbGVTeW5jKGZpbGVwYXRoLCB7IGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgICAgICAgc3ByaXRlcy5hZGQoc3ZnaWQsIGNvZGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgZGF0YTogY29kZSB9ID0gb3B0aW1pemUoXG4gICAgICAgICAgc3ByaXRlcy50b1N0cmluZyh7IGlubGluZTogb3B0aW9ucy5pbmxpbmUgfSksXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICBcImNsZWFudXBBdHRyc1wiLFxuICAgICAgICAgICAgICBcInJlbW92ZURvY3R5cGVcIixcbiAgICAgICAgICAgICAgXCJyZW1vdmVDb21tZW50c1wiLFxuICAgICAgICAgICAgICBcInJlbW92ZVRpdGxlXCIsXG4gICAgICAgICAgICAgIFwicmVtb3ZlRGVzY1wiLFxuICAgICAgICAgICAgICBcInJlbW92ZUVtcHR5QXR0cnNcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwicmVtb3ZlQXR0cnNcIixcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHsgYXR0cnM6IFwiKGRhdGEtbmFtZXxkYXRhLXh4eClcIiB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbmRpdi5pbm5lckhUTUwgPSBcXGAke2NvZGV9XFxgXG5jb25zdCBzdmcgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N2ZycpWzBdXG5pZiAoc3ZnKSB7XG4gIHN2Zy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgc3ZnLnN0eWxlLndpZHRoID0gMFxuICBzdmcuc3R5bGUuaGVpZ2h0ID0gMFxuICBzdmcuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICBzdmcuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpXG59XG4vLyBsaXN0ZW4gZG9tIHJlYWR5IGV2ZW50XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBpZiAoZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoZGl2LCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpXG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpXG4gIH1cbn0pYDtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVUsU0FBUyxvQkFBb0I7OztBQ0FnQixPQUFPLFVBQVU7QUFDdlksT0FBTyxRQUFRO0FBQ2YsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZ0JBQWdCO0FBRWxCLElBQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNO0FBQ3hDLFFBQU0sY0FBYyxRQUFRLGVBQWU7QUFDM0MsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVSxJQUFJO0FBQ1osVUFBSSxPQUFPLGFBQWE7QUFDdEIsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLLElBQUk7QUFDUCxVQUFJLE9BQU8saUJBQWlCO0FBQzFCLGNBQU0sVUFBVSxNQUFNLE9BQU87QUFDN0IsY0FBTSxXQUFXLEtBQUssUUFBUSxXQUFXO0FBQ3pDLG1CQUFXLFFBQVEsR0FBRyxZQUFZLFFBQVEsR0FBRztBQUMzQyxnQkFBTSxXQUFXLEtBQUssS0FBSyxVQUFVLElBQUk7QUFDekMsZ0JBQU0sUUFBUSxLQUFLLE1BQU0sSUFBSSxFQUFFO0FBQy9CLGNBQUlBLFFBQU8sR0FBRyxhQUFhLFVBQVUsRUFBRSxVQUFVLFFBQVEsQ0FBQztBQUMxRCxrQkFBUSxJQUFJLE9BQU9BLEtBQUk7QUFBQSxRQUN6QjtBQUNBLGNBQU0sRUFBRSxNQUFNLEtBQUssSUFBSTtBQUFBLFVBQ3JCLFFBQVEsU0FBUyxFQUFFLFFBQVEsUUFBUSxPQUFPLENBQUM7QUFBQSxVQUMzQztBQUFBLFlBQ0UsU0FBUztBQUFBLGNBQ1A7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sUUFBUSxFQUFFLE9BQU8sdUJBQXVCO0FBQUEsY0FDMUM7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFDQSxlQUFPO0FBQUEsb0JBQ0s7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BaUJkO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FENURBLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFFLFNBQVMsQ0FBQztBQUM5QixDQUFDOyIsCiAgIm5hbWVzIjogWyJjb2RlIl0KfQo=
