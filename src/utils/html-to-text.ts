// html-to-text-lite.ts
export function t(html: string): string {
  // 0) normalize Quill artifacts
  let s = html
    .replace(/<span[^>]*class="ql-ui"[^>]*>.*?<\/span>/gi, '')
    .replace(/\scontenteditable="false"/gi, '')
    .replace(/<li[^>]*data-list="bullet"[^>]*>/gi, '<li>')
    .replace(/<br\s*\/?>\s*(<br\s*\/?>)+/gi, '<br>');

  // 1) first <p><strong>…</strong></p> -> # …
  s = s.replace(
    /<p[^>]*>\s*<strong>\s*(.*?)\s*<\/strong>\s*<\/p>/i,
    (_, t) => `\n# ${stripTags(t)}\n`
  );

  // 2) strip strong/em but keep content (prevents **)
  s = s.replace(/<\/?(strong|b|em|i)>/gi, '');

  // 3) convert headings if present
  s = s.replace(/<h1[^>]*>(.*?)<\/h1>/gi, (_, t) => `\n# ${stripTags(t)}\n`);
  s = s.replace(/<h2[^>]*>(.*?)<\/h2>/gi, (_, t) => `\n## ${stripTags(t)}\n`);
  s = s.replace(/<h3[^>]*>(.*?)<\/h3>/gi, (_, t) => `\n### ${stripTags(t)}\n`);

  // 4) convert lists
  // unordered
  s = s.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => {
    return '\n' + inner
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_: any, t: any) => `- ${collapseWs(stripTags(t))}\n`)
      .trimEnd() + '\n';
  });
  // ordered
  s = s.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
    let i = 1;
    return '\n' + inner
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_: any, t: any) => `${i++}. ${collapseWs(stripTags(t))}\n`)
      .trimEnd() + '\n';
  });

  // 5) paragraphs and line breaks
  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_: any, t: any) => `${collapseWs(stripTags(t))}\n\n`);
  s = s.replace(/<br\s*\/?>/gi, '\n');

  // 6) remove remaining tags
  s = stripTags(s);

  // 7) fix "1.Mladi" -> "1. Mladi"
  s = s.replace(/(^|\n)(\d+)\.(?=\S)/g, (_m, pre, num) => `${pre}${num}. `);

  // 8) collapse extra blank lines
  s = s.replace(/\n{3,}/g, '\n\n').trim();

  return s;
}

function stripTags(x: string): string {
  return x.replace(/<\/?[^>]+>/g, '');
}
function collapseWs(x: string): string {
  return x.replace(/\s+/g, ' ').trim();
}
