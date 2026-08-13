export function scrollToId(id) {
  const element = document.querySelector(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
