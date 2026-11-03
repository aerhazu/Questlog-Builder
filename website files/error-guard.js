// Questlog editor runtime error guard.
// Only reports real JavaScript failures. Resource loading failures are logged to the console
// instead of covering the app with a scary red box.
(function () {
  function show(kind, message, extra) {
    var d = document.getElementById('runtime-error-box') || document.body.appendChild(document.createElement('pre'));
    d.id = 'runtime-error-box';
    d.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:999999;padding:12px;border:1px solid #5c2b2e;border-radius:8px;background:#2a1215;color:#ff8a80;white-space:pre-wrap;font:12px/1.4 ui-monospace,monospace;max-height:40vh;overflow:auto';
    d.textContent += (d.textContent ? '\n' : '') + '[' + kind + '] ' + message + (extra ? ' ' + extra : '');
  }

  window.addEventListener('error', function (e) {
    // Ignore CSS/font/image/script resource load events. Those have no message/filename
    // and were the cause of the old false "[runtime] error" banner.
    if (!e.message && e.target && e.target !== window) {
      console.warn('[resource]', e.target.tagName || e.target.nodeName, e.target.src || e.target.href || 'failed to load');
      return;
    }
    show('runtime', e.message || e.type, e.filename ? '(' + e.filename + ':' + e.lineno + ')' : '');
  }, true);

  window.addEventListener('unhandledrejection', function (e) {
    var reason = e.reason && e.reason.message ? e.reason.message : String(e.reason || 'Unhandled promise rejection');
    show('promise', reason, '');
  });
})();
