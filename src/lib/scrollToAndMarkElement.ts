export function scrollToAndMarkElement(el: Element) {
  el.scrollIntoView({ behavior: "instant" });
  window.scrollBy({ top: -50, behavior: "instant" });
  el.classList.remove("ring-dark-1");
  el.classList.add("ring-4", "animate-pulse-ring");
}
