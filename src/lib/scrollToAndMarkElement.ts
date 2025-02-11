let lastId: string | null = null;

export function scrollToAndMarkElement(el: Element, id: string) {
  if (lastId !== id) {
    console.log("scrolling to", el);
    el.scrollIntoView({ behavior: "instant" });
    window.scrollBy({ top: -50, behavior: "instant" });
    el.classList.add("!bg-cyan-3/10");
    lastId = id;
  }
}
