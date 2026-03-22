const codeEl = document.getElementById('code');
const previewEl = document.getElementById('preview');
const runBtn = document.getElementById('runBtn');

const runPreview = () => {
  const src = codeEl.value;

  // lightweight preview simulation for docs site
  const hasImport = /mimpor\s*\{[^}]+\}\s*moy\s*"[^"]+"\s*;?/m.test(src);
  const hasConst = /\b(mc|const)\s+\w+\s*=\s*[^;]+;/m.test(src);
  const hasPrint = /\b(tampil|print)\s*\(/m.test(src);

  const lines = [];
  lines.push('MCLANG Docs Preview (simulasi):');
  lines.push('--------------------------------');
  lines.push(`Import statement: ${hasImport ? 'detected ✅' : 'not found'}`);
  lines.push(`Declaration: ${hasConst ? 'detected ✅' : 'not found'}`);
  lines.push(`Stdlib output call: ${hasPrint ? 'detected ✅' : 'not found'}`);
  lines.push('');
  lines.push('Tip: run real execution with: mclang run main.mc');

  previewEl.textContent = lines.join('\n');
};

runBtn.addEventListener('click', runPreview);
