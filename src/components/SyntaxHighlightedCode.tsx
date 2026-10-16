import Prism from 'prismjs';
import type { Grammar, Token } from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

Prism.languages.insertBefore('cpp', 'function', {
  'arduino-constant': /\b(?:HIGH|LOW|INPUT|OUTPUT|INPUT_PULLUP)\b/,
});

const languageAliases: Record<string, string> = {
  arduino: 'cpp', ino: 'cpp', c: 'c', 'c++': 'cpp', cpp: 'cpp',
  javascript: 'javascript', js: 'javascript', typescript: 'typescript', ts: 'typescript',
  tsx: 'tsx', jsx: 'jsx', html: 'markup', xml: 'markup', markup: 'markup',
  css: 'css', python: 'python', py: 'python', json: 'json', bash: 'bash',
  sh: 'bash', shell: 'bash', zsh: 'bash',
};

function renderTokens(tokens: Array<string | Token>, keyPrefix = 'token') {
  return tokens.map((token, index) => {
    const key = `${keyPrefix}-${index}`;
    if (typeof token === 'string') return token;
    const content = Array.isArray(token.content)
      ? renderTokens(token.content, key)
      : typeof token.content === 'string'
        ? token.content
        : renderTokens([token.content as Token], key);
    const tokenTypes = Array.isArray(token.type) ? token.type : [token.type];
    return <span key={key} className={`token ${tokenTypes.join(' ')}`}>{content}</span>;
  });
}

interface Props {
  code: string;
  language: string;
}

export default function SyntaxHighlightedCode({ code, language }: Props) {
  const normalizedLanguage = languageAliases[language.trim().toLowerCase()];
  const grammar = normalizedLanguage
    ? (Prism.languages[normalizedLanguage] as Grammar | undefined)
    : undefined;

  if (!grammar) return <>{code}</>;
  return <>{renderTokens(Prism.tokenize(code, grammar))}</>;
}
