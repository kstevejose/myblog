import fs from 'node:fs';
import path from 'node:path';

const SRC = 'C:/Claude/myblog-src';
const OUT = 'C:/Claude/portfolio/src/content/posts';

const TAG_MAP = {
  'DocasSystem': 'Docs as Systems',
  'How to': 'How-to',
  'Tutorials': 'Tutorial',
  'API': 'API',
  'Concepts': 'Concept',
};

// Minimal front-matter reader: we only need scalar + flow-seq + nested image map.
function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const [, fmText, body] = m;
  const data = {};
  const lines = fmText.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const top = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!top) continue;
    const key = top[1];
    let val = top[2].trim();
    if (val === '') {
      // possible nested block map
      const nested = {};
      let j = i + 1;
      while (j < lines.length && /^\s+\S/.test(lines[j])) {
        const sub = lines[j].match(/^\s+([A-Za-z_][\w-]*):\s*(.*)$/);
        if (sub) nested[sub[1]] = stripQuotes(sub[2].trim());
        j++;
      }
      if (Object.keys(nested).length) { data[key] = nested; i = j - 1; continue; }
      data[key] = null;
      continue;
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val.slice(1, -1).split(',').map(s => stripQuotes(s.trim())).filter(Boolean);
      continue;
    }
    data[key] = stripQuotes(val);
  }
  return { data, body };
}
const stripQuotes = (s) => s.replace(/^["'](.*)["']$/, '$1');

function toISO(dateStr) {
  if (!dateStr) return null;
  const m = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})\s*([+-]\d{2}):?(\d{2})?/);
  if (m) {
    const [, y, mo, d, h, mi, s, oh, om = '00'] = m;
    return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}${oh}:${om}`).toISOString();
  }
  const d = new Date(dateStr);
  return isNaN(d) ? null : d.toISOString();
}

const yamlStr = (s) => JSON.stringify(String(s));

const files = fs.readdirSync(path.join(SRC, '_posts')).filter(f => f.endsWith('.md'));
const report = [];

for (const file of files) {
  const raw = fs.readFileSync(path.join(SRC, '_posts', file), 'utf8');
  const { data, body } = parseFrontMatter(raw);

  const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const iso = toISO(data.date);
  const tags = (data.tags || []).map(t => TAG_MAP[t] || t);
  const cover = data.image && typeof data.image === 'object' ? data.image.path : null;

  let out = body
    // Chirpy asset paths -> Astro public/
    .replace(/(\.\/)?\/?assets\/img\//g, '/img/')
    // demote body H1s so the page title is the only h1
    .replace(/^# (?!#)/gm, '## ')
    // drop Chirpy-specific liquid/attribute noise
    .replace(/\{:\s*\.[^}]*\}/g, '')
    .trim();

  const words = out.replace(/```[\s\S]*?```/g, ' ').replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(words / 220));

  const fm = [
    '---',
    `title: ${yamlStr(data.title || slug)}`,
    `description: ${yamlStr(data.description || data.excerpt || '')}`,
    `date: ${iso}`,
    `tags: [${tags.map(yamlStr).join(', ')}]`,
    cover ? `cover: ${yamlStr(cover.replace(/(\.\/)?\/?assets\/img\//, '/img/'))}` : null,
    data.image && data.image.alt ? `coverAlt: ${yamlStr(data.image.alt)}` : null,
    `readingTime: ${readingTime}`,
    'draft: false',
    '---',
    '',
  ].filter(Boolean).join('\n');

  fs.writeFileSync(path.join(OUT, `${slug}.md`), fm + out + '\n', 'utf8');
  report.push({ slug, date: iso ? iso.slice(0, 10) : 'MISSING', tags: tags.join('|'), cover: cover ? 'y' : '-', readingTime, words });
}

console.table(report);
console.log(`\n${report.length} posts migrated`);
