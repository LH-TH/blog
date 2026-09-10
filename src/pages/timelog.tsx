import type {ReactNode} from 'react';
import {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';

const TOOL_URL = '/time-tool/index.html';
const BUFFER = 8; // 让 iframe 比内容多留几像素，避免底部共线
// 高度变化小于该阈值时不更新 DOM，避免 ResizeObserver 观察-改高-再观察 的抖动循环
const HEIGHT_EPSILON = 1;

export default function TimeLog(): ReactNode {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const [height, setHeight] = useState(1200);

  useEffect(() => {
    return () => {
      const ro = (iframeRef.current as unknown as {__ro?: ResizeObserver} | null)?.__ro;
      ro?.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  function handleLoad() {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!iframe || !doc) {
      return;
    }

    // 若 onLoad 重复触发，先断开旧观察器
    (iframe as unknown as {__ro?: ResizeObserver}).__ro?.disconnect();

    const measure = () => {
      const h = Math.max(
        doc.body?.scrollHeight ?? 0,
        doc.documentElement?.scrollHeight ?? 0,
      );
      if (h > 0) {
        // 高度没实质变化就不动 state，避免无意义的重复渲染与 RO 重触发
        setHeight((prev) => (Math.abs(h + BUFFER - prev) > HEIGHT_EPSILON ? h + BUFFER : prev));
      }
    };

    // 关键：彻底隐藏子文档自身的滚动条，避免出现"双滚动条"。
    // 只靠 iframe 的 overflow:hidden 不生效，需用 iframe 专属 scrolling='no'
    // 并在子文档根部也关闭 overflow。
    if (doc.documentElement) {
      doc.documentElement.style.overflow = 'hidden';
    }
    if (doc.body) {
      doc.body.style.overflow = 'hidden';
    }

    // 先量一次，覆盖占位高度
    measure();

    // 同源 iframe：内容高度变化（显示/隐藏转换结果、变宽换行）时自动调整。
    // 通过 rAF 防抖把布局更新推迟到下一帧，避免在 RO 回调里同步改布局触发浏览器警告。
    // 工具 body 已无 min-height:100vh，不会形成"越撑越大"的死循环。
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
        rafIdRef.current = window.requestAnimationFrame(() => {
          rafIdRef.current = null;
          measure();
        });
      });
      if (doc.body) {
        ro.observe(doc.body);
      }
      if (doc.documentElement) {
        ro.observe(doc.documentElement);
      }
      (iframe as unknown as {__ro: ResizeObserver}).__ro = ro;
    }
  }

  return (
    <Layout
      title="时间戳转换工具"
      description="在线时间戳转换工具，支持秒级/毫秒级时间戳互转与常用时间格式转换。">
      <div style={{background: '#f5f5f7'}}>
        <iframe
          ref={iframeRef}
          title="时间戳转换工具"
          src={TOOL_URL}
          onLoad={handleLoad}
          style={{
            display: 'block',
            width: '100%',
            height,
            border: 'none',
            background: '#f5f5f7',
          }}
        />
      </div>
    </Layout>
  );
}
