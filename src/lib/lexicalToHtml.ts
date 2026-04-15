/**
 * Server-side Lexical JSON → HTML converter.
 * Runs at Astro build time. No client-side Lexical runtime needed.
 */

type LexicalNode = {
  type: string;
  tag?: string;
  format?: number | string;
  text?: string;
  url?: string;
  src?: string;
  altText?: string;
  children?: LexicalNode[];
  listType?: string;
  direction?: string | null;
  indent?: number;
  style?: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderText(node: LexicalNode): string {
  let text = escapeHtml(node.text || '');
  const format = typeof node.format === 'number' ? node.format : 0;
  // Lexical format flags: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code, 32=subscript, 64=superscript
  if (format & 16) text = `<code class="inline-code">${text}</code>`;
  if (format & 4)  text = `<s>${text}</s>`;
  if (format & 8)  text = `<u>${text}</u>`;
  if (format & 2)  text = `<em>${text}</em>`;
  if (format & 1)  text = `<strong>${text}</strong>`;
  return text;
}

function renderChildren(children: LexicalNode[] = []): string {
  return children.map(renderNode).join('');
}

function renderNode(node: LexicalNode): string {
  switch (node.type) {
    case 'root':
      return renderChildren(node.children);

    case 'paragraph': {
      const inner = renderChildren(node.children);
      if (!inner.trim()) return '<br>';
      return `<p>${inner}</p>`;
    }

    case 'heading': {
      const tag = node.tag || 'h2';
      return `<${tag}>${renderChildren(node.children)}</${tag}>`;
    }

    case 'text':
      return renderText(node);

    case 'linebreak':
      return '<br>';

    case 'quote':
      return `<blockquote>${renderChildren(node.children)}</blockquote>`;

    case 'code':
      return `<pre><code>${renderChildren(node.children)}</code></pre>`;

    case 'code-highlight':
      return escapeHtml(node.text || '');

    case 'list': {
      const tag = node.listType === 'number' ? 'ol' : 'ul';
      return `<${tag}>${renderChildren(node.children)}</${tag}>`;
    }

    case 'listitem':
      return `<li>${renderChildren(node.children)}</li>`;

    case 'link': {
      const href = escapeHtml(node.url || '#');
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${renderChildren(node.children)}</a>`;
    }

    case 'autolink': {
      const href = escapeHtml(node.url || '#');
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${renderChildren(node.children)}</a>`;
    }

    case 'image': {
      const src = escapeHtml(node.src || '');
      const alt = escapeHtml(node.altText || '');
      return `<figure class="article-figure"><img src="${src}" alt="${alt}" loading="lazy" />${alt ? `<figcaption>${alt}</figcaption>` : ''}</figure>`;
    }

    default:
      // Fallback: try to render children if any
      if (node.children) return renderChildren(node.children);
      if (node.text) return escapeHtml(node.text);
      return '';
  }
}

export function lexicalToHtml(content: unknown): string {
  if (!content) return '';

  try {
    const state = typeof content === 'string' ? JSON.parse(content) : content;
    const root = (state as any)?.root;
    if (!root) return '';
    return renderNode(root);
  } catch (err) {
    console.error('[lexicalToHtml] Failed to render content:', err);
    return '';
  }
}
