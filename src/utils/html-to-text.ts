// lib/normalize-quill-html.ts
export function normalizeQuillHtml(rawHtml: string): string {
  return rawHtml
    // remove Quill's hidden bullet helpers from pasted Word/Quill content
    .replace(/<span[^>]*class="ql-ui"[^>]*>.*?<\/span>/gi, '')
    // normalize Quill's custom bullet attr to a normal <li>
    .replace(/<li[^>]*data-list="bullet"[^>]*>/gi, '<li>')
    // fix numbering like "1.Mladi" -> "1. Mladi"
    .replace(/(\b\d+)\.(?=\S)/g, '$1. ');
}
