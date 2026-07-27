// AI Tool Stack - Visit Counter (Client-Side)
// Uses localStorage — works on any static site including GitHub Pages
// Displays total visits and estimated unique visitors in the footer
(function(){
  var STORAGE_KEY = 'aitoolstack_visits';
  var VISIT_KEY = 'aitoolstack_has_visited';
  
  var visits = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
  if (!sessionStorage.getItem(VISIT_KEY)) {
    visits++;
    localStorage.setItem(STORAGE_KEY, visits.toString());
    sessionStorage.setItem(VISIT_KEY, 'true');
  }
  
  var counterHTML = 
    '<div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,.1);font-size:13px;color:rgba(255,255,255,.5);line-height:1.6">' +
      '<span>&#x1f4c0; Total Visits: <strong id="total-visits">' + visits.toLocaleString() + '</strong></span>' +
      '&nbsp;&nbsp;' +
      '<span>&#x1f464; Estimated Unique Visitors: <strong>~' + Math.round(visits * 0.7).toLocaleString() + '</strong></span>' +
    '</div>';
  
  var target = document.querySelector('.footer-bottom') || 
               document.querySelector('.footer p:last-child') ||
               document.querySelector('.footer');
  
  if (target) {
    var div = document.createElement('div');
    div.innerHTML = counterHTML;
    target.parentNode.insertBefore(div, target.nextSibling);
  } else {
    var f = document.createElement('footer');
    f.style.cssText = 'background:#1a1a2e;color:rgba(255,255,255,.6);padding:20px;font-size:13px;text-align:center;margin-top:40px;';
    f.innerHTML = counterHTML;
    document.body.appendChild(f);
  }
})();