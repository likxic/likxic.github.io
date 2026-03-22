// 显示提示框
function showToast(msg) {
    const toast = document.getElementById('toastMsg');
    toast.textContent = msg || '已复制';
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1500);
}

// 复制文本到剪贴板
async function copyToClipboard(text, type) {
    try {
        await navigator.clipboard.writeText(text);
        showToast(`📋 ${type} 已复制`);
    } catch (err) {
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`📋 ${type} 已复制 (兼容模式)`);
    }
}

// 给所有复制按钮绑定事件
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const text = btn.getAttribute('data-copy');
        const type = btn.getAttribute('data-type') || '信息';
        if (text) copyToClipboard(text, type);
        else showToast('无法复制');
    });
});