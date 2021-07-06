export const includeCodeSamples = (sources) => {
  Promise.all(
    sources.map((source) => {
      const keys = Object.keys(source);
      const codeElement = document.querySelector(`[data-ref=${keys[0]}]`);

      return window
        .fetch(source[keys[0]], { method: "GET" })
        .then((result) => result.text())
        .then((text) => codeElement.appendChild(document.createTextNode(text)));
    })
  ).then(() => hljs.highlightAll());
};
