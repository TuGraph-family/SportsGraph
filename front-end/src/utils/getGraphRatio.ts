export const getGraphRatio = () => {
  if (document.documentElement.clientWidth < 390) {
    return {
      strength: 0.1
    };
  } else {
    return {
      strength: 1
    };
  }
};
