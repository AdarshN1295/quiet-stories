import { useEffect } from "react";

function setMetaTag(name, content) {
  if (!content) return;

  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function useDocumentMeta({ title, description, keywords } = {}) {
  const keywordsString = Array.isArray(keywords) ? keywords.join(", ") : keywords;

  useEffect(() => {
    if (title) document.title = title;
    if (description) setMetaTag("description", description);
    if (keywordsString) setMetaTag("keywords", keywordsString);
  }, [title, description, keywordsString]);
}
