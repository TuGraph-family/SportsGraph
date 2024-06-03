const adjustVH = () => {
  const innerHeight = window.innerHeight;
  const root = document.getElementById("root");
  if (root) {
    root.style.height = `${innerHeight}px`;
  }
};

export const resetClientHeight = () => {
  /* 在初次加载和视口大小变化时调整高度 */
  adjustVH();
  window.addEventListener("resize", adjustVH);
};
