(function() {

  sheet.render();
  sheet.bind();
  sheet.scroll();
  nav.bind();
  tabs.bind();
  log.bind();
  log.render();
  night.update();
  checkUrl.render();
  // disbaled for now
  // checkUrl.checkHttps();

})();
