export const resize = () => {
  const setElementHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.body.style.setProperty("height", `${vh}px`);
  };

  // 初始化和监听窗口大小变化
  setElementHeight();
  window.addEventListener("resize", setElementHeight);
};
