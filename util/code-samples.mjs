import prettier from "https://cdn.jsdelivr.net/npm/prettier@2.3.2/esm/standalone.mjs";
import parserHtml from "https://cdn.jsdelivr.net/npm/prettier@2.3.2/esm/parser-html.mjs";

/**
 * @param {{js: string, css: string, html: string}} sources
 */
export const includeCodeSamples = (sources) => {
  Promise.all(
    Object.keys(sources).map(
      /**
       * @param {"js" | "css" | "html"} type
       */
      (type) => {
        const codeElement = document.querySelector(`[data-ref=${type}]`);

        return (
          type === "html"
            ? Promise.resolve(
                prettier.format(
                  document.querySelector(sources.html)?.outerHTML,
                  { parser: "html", plugins: [parserHtml] }
                )
              )
            : window
                .fetch(sources[type], { method: "GET" })
                .then((result) => result.text())
        ).then((text) =>
          codeElement.appendChild(document.createTextNode(text))
        );
      }
    )
  ).then(() => hljs.highlightAll());
};
