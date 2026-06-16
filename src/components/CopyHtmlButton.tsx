import React, { useState } from "react";

type Props = {
  htmlString?: string;
  plainTextString?: string;
  containerRef?: React.RefObject<HTMLElement>;
};

const stripHtml = (html = "") => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.innerText || tmp.textContent || "";
};

const CopyHtmlButton = ({
  htmlString,
  plainTextString,
  containerRef,
}: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const getSource = () => {
    if (htmlString)
      return {
        html: htmlString,
        text: plainTextString || stripHtml(htmlString),
      };
    if (containerRef?.current) {
      const el = containerRef.current;
      return {
        html: el.innerHTML,
        text: el.innerText || stripHtml(el.innerHTML),
      };
    }
    return { html: "", text: "" };
  };

  const handleCopy = async () => {
    const { html, text } = getSource();
    if (!html && !text) return;

    try {
      if (window.ClipboardItem && navigator.clipboard?.write) {
        const htmlBlob = new Blob([html], { type: "text/html" });
        const textBlob = new Blob([text || html], { type: "text/plain" });
        const item = new ClipboardItem({
          "text/html": htmlBlob,
          "text/plain": textBlob,
        });
        await navigator.clipboard.write([item]);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text || stripHtml(html));
      } else {
        const ta = document.createElement("textarea");
        ta.value = text || stripHtml(html);
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-white bg-emerald-700 rounded-md hover:bg-emerald-600 px-4 py-2.5"
    >
      {isCopied ? "Copied HTML" : "Copy HTML"}
    </button>
  );
};

export default CopyHtmlButton;
