/**
 * 双击表格单元格自动复制内容
 *
 * 通过 document 级事件委托监听 dblclick：
 * 命中 <td>/<th> 时，复制该单元格的文本内容并给出反馈
 * （单元格短暂高亮 + 鼠标附近弹出「已复制」提示）。
 * SPA 路由切换不会影响 document 级监听，无需重复绑定。
 */

const COPIED_CLASS = 'dblclick-copied';
const TOAST_CLASS = 'table-copy-toast';
const HIGHLIGHT_MS = 600;
const TOAST_MS = 1200;

function copyText(text: string): Promise<void> {
  // 优先使用 Clipboard API（需要 https 或 localhost）
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // 兼容非安全上下文的降级方案
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      if (document.execCommand('copy')) {
        resolve();
      } else {
        reject(new Error('copy command failed'));
      }
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textarea);
    }
  });
}

function showToast(message: string, x: number, y: number): void {
  let toast = document.querySelector<HTMLDivElement>(`.${TOAST_CLASS}`);
  if (!toast) {
    toast = document.createElement('div');
    toast.className = TOAST_CLASS;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.left = `${x}px`;
  toast.style.top = `${y}px`;
  // 强制回流，保证连续双击时过渡动画可以重放
  void toast.offsetWidth;
  toast.classList.add('show');
  window.setTimeout(() => toast?.classList.remove('show'), TOAST_MS);
}

function flashCell(cell: HTMLElement): void {
  cell.classList.add(COPIED_CLASS);
  window.setTimeout(() => cell.classList.remove(COPIED_CLASS), HIGHLIGHT_MS);
}

function handleDoubleClick(e: MouseEvent): void {
  const target = e.target as HTMLElement | null;
  const cell = target?.closest<HTMLElement>('td, th');
  if (!cell || !cell.closest('table')) {
    return;
  }

  // 合并空白并去掉首尾空格，复制出来的内容更干净
  const text = (cell.textContent ?? '').replace(/\s+/g, ' ').trim();
  if (!text) {
    return;
  }

  e.preventDefault();
  // 清掉双击产生的默认文本选中高亮
  window.getSelection()?.removeAllRanges();

  copyText(text)
    .then(() => showToast(`已复制：${text}`, e.clientX, e.clientY))
    .catch(() => showToast('复制失败，请手动复制', e.clientX, e.clientY));

  flashCell(cell);
}

function init(): void {
  document.addEventListener('dblclick', handleDoubleClick);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
