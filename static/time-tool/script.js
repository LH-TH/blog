let currentUnit = 'second';

// 时间格式定义
const timeFormats = [
    { name: 'ISO 8601', format: (date) => date.toISOString() },
    { name: 'RFC 2822', format: (date) => date.toUTCString() },
    { name: 'YYYY-MM-DD', format: (date) => date.toISOString().split('T')[0] },
    { name: 'YYYY-MM-DD HH:mm:ss', format: (date) => {
        const pad = (n) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }},
    { name: 'MM/DD/YYYY', format: (date) => {
        const pad = (n) => n.toString().padStart(2, '0');
        return `${pad(date.getMonth()+1)}/${pad(date.getDate())}/${date.getFullYear()}`;
    }},
    { name: 'DD/MM/YYYY', format: (date) => {
        const pad = (n) => n.toString().padStart(2, '0');
        return `${pad(date.getDate())}/${pad(date.getMonth()+1)}/${date.getFullYear()}`;
    }},
    { name: 'Unix时间戳(秒)', format: (date) => Math.floor(date.getTime() / 1000).toString() },
    { name: 'Unix时间戳(毫秒)', format: (date) => date.getTime().toString() },
    { name: '中文格式', format: (date) => {
        const pad = (n) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}年${pad(date.getMonth()+1)}月${pad(date.getDate())}日 ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }},
    { name: '相对时间', format: (date) => getRelativeTime(date) }
];

function getRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(Math.abs(diff) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (diff > 0) {
        if (seconds < 60) return `${seconds}秒前`;
        if (minutes < 60) return `${minutes}分钟前`;
        if (hours < 24) return `${hours}小时前`;
        return `${days}天前`;
    } else {
        if (seconds < 60) return `${seconds}秒后`;
        if (minutes < 60) return `${minutes}分钟后`;
        if (hours < 24) return `${hours}小时后`;
        return `${days}天后`;
    }
}

function updateCurrentTime() {
    const now = new Date();
    const timeStr = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const timestampSecond = Math.floor(now.getTime() / 1000);
    const timestampMilli = now.getTime();

    document.getElementById('currentTime').textContent = timeStr;
    document.getElementById('currentTimestampSecond').textContent = timestampSecond;
    document.getElementById('currentTimestampMilli').textContent = timestampMilli;
}

function selectUnit(unit, event) {
    currentUnit = unit;
    const buttons = document.querySelectorAll('.unit-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function convertToTimestamp() {
    const datetimeInput = document.getElementById('datetimeInput').value;

    if (!datetimeInput) {
        alert('请选择日期和时间！');
        return;
    }

    const date = new Date(datetimeInput);
    const timestampSecond = Math.floor(date.getTime() / 1000);
    const timestampMilli = date.getTime();

    document.getElementById('timestampSecondValue').textContent = timestampSecond;
    document.getElementById('timestampMilliValue').textContent = timestampMilli;
    document.getElementById('timestampResult').classList.add('show');
}

function convertToTime() {
    const timestampInput = document.getElementById('timestampInput').value.trim();

    if (!timestampInput) {
        alert('请输入时间戳！');
        return;
    }

    let timestamp = parseInt(timestampInput);

    if (isNaN(timestamp)) {
        alert('请输入有效的数字！');
        return;
    }

    // 自动判断：如果是秒级时间戳（10位），转换为毫秒
    if (currentUnit === 'second' || timestamp < 10000000000) {
        timestamp = timestamp * 1000;
    }

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
        alert('无效的时间戳！');
        return;
    }

    const timeStr = date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const isoStr = date.toISOString();

    document.getElementById('timeLocalValue').textContent = timeStr;
    document.getElementById('timeISOValue').textContent = isoStr;
    document.getElementById('timeResult').classList.add('show');
}

function copyTimestamp(event) {
    const value = document.getElementById('timestampSecondValue').textContent;
    navigator.clipboard.writeText(value).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '已复制！';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

function copyTimestamp2(event) {
    const value = document.getElementById('timestampMilliValue').textContent;
    navigator.clipboard.writeText(value).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '已复制！';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

function copyTime(event) {
    const value = document.getElementById('timeLocalValue').textContent;
    navigator.clipboard.writeText(value).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '已复制！';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

function useCurrentTimeForFormat() {
    const timestamp = Math.floor(Date.now() / 1000);
    document.getElementById('formatTimestampInput').value = timestamp;
    updateFormatDisplay(timestamp);
}

function updateFormatDisplay(timestamp) {
    let ts = parseInt(timestamp);
    if (isNaN(ts)) return;

    // 自动判断秒级或毫秒级
    if (ts < 10000000000) {
        ts = ts * 1000;
    }

    const date = new Date(ts);
    if (isNaN(date.getTime())) return;

    const formatGrid = document.getElementById('formatGrid');
    formatGrid.innerHTML = timeFormats.map(fmt => `
        <div class="format-item">
            <div class="format-name">${fmt.name}</div>
            <div class="format-value">${fmt.format(date)}</div>
            <button class="format-copy-btn" onclick="copyFormatValue(event, '${fmt.format(date).replace(/'/g, "\\'")}')">复制</button>
        </div>
    `).join('');
}

function copyFormatValue(event, value) {
    navigator.clipboard.writeText(value).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '已复制！';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1500);
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // 设置默认时间为当前时间
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now - offset)).toISOString().slice(0, 16);
    document.getElementById('datetimeInput').value = localISOTime;

    // 初始化格式转换
    useCurrentTimeForFormat();

    // 监听格式输入框变化
    const formatInput = document.getElementById('formatTimestampInput');
    formatInput.addEventListener('input', function() {
        const value = this.value.trim();
        if (value) {
            updateFormatDisplay(value);
        }
    });
});
