(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function selectTab(id) {
    tabs.forEach(function (t) {
      var on = t.id === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { selectTab(t.id); });
  });

  // In-text links such as "see the browser tab" switch the tab, then scroll to #install.
  document.querySelectorAll('[data-tab]').forEach(function (a) {
    a.addEventListener('click', function () { selectTab(a.getAttribute('data-tab')); });
  });

  // Shareable deep links: .../#whatsapp, #samsung, #browser open that tab.
  var hashTabs = { browser: 't-browser', whatsapp: 't-whatsapp', samsung: 't-samsung' };
  function fromHash() {
    var id = hashTabs[location.hash.slice(1)];
    if (id) {
      selectTab(id);
      document.getElementById('install').scrollIntoView();
    }
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();

  // Tap a screenshot to see it full size.
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  document.querySelectorAll('.shot img').forEach(function (img) {
    img.addEventListener('click', function () {
      boxImg.src = img.currentSrc || img.src;
      boxImg.alt = img.alt;
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
    });
  });
  function close() {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
  }
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
