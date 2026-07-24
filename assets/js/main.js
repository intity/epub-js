import load from "./load.js";

window.onload = () => {

  const url = new URL(window.location);
  const val = url.searchParams.get("q");
  const doc = url.pathname === "/" || url.pathname === "/epub-js/" ? "./README.md" : "./index.md";
  const uri = val === null ? doc : `./${val}`;
  const btn = document.getElementById("b-menu");
  const box = document.getElementById("mbox");
  const mi1 = document.getElementById("mi-1");
  box.className = btn.checked ? "m-list" : "m-line";
  btn.onclick = (e) => {
    box.className = e.target.checked ? "m-list" : "m-line";
  };

  if (window.mocha) {
    mocha.run();
  } else if (window.marked) {
    load(uri);
  }
}
