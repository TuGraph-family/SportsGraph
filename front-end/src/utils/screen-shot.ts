import html2canvas from "html2canvas";

export const takeScreenshot = (id: string) => {
  const content = document.body;
  if (content) {
    html2canvas(content).then((canvas) => {
      document.body.appendChild(canvas);
      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "sportsgraph.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
};
