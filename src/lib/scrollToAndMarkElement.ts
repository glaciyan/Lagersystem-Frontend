export const last: { id: string | null } = { id: null };

export function scrollToAndMarkElement(el: Element, id: string) {
  if (last.id !== id) {
    console.log("scrolling to", el);
    el.scrollIntoView({ behavior: "instant" });
    window.scrollBy({ top: -50, behavior: "instant" });
    el.classList.add("!bg-cyan-3/10");
    last.id = id;
  }
}
