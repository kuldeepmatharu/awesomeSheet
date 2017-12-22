var prompt = (function() {

  var previousPrompt = null;

  function bind() {
    window.addEventListener("keydown", function(event) {
      if (event.keyCode == 27) {
        destroy();
        page.update();
      };
    }, false);
  };

  function destroy() {
    var all_prompt = helper.eA(".js-prompt");
    if (all_prompt[0]) {
      for (var i = 0; i < all_prompt.length; i++) {
        all_prompt[i].destroy();
      };
    };
  };

  function render(heading, message, actionText, action, actionUrl, actionAttributeKey, actionAttributeValue) {
    var makePrompt = function() {
      var body = helper.e("body");
      body.dataset.prompt = true;
      var promptWrapper = document.createElement("div");
      promptWrapper.setAttribute("class", "m-prompt-wrapper js-prompt-wrapper is-unrotate-out");
      var prompt = document.createElement("div");
      prompt.setAttribute("class", "m-prompt js-prompt");
      prompt.destroy = function() {
        if (prompt.classList.contains("is-opaque") || promptWrapper.classList.contains("is-unrotate-in")) {
          helper.removeClass(prompt, "is-opaque");
          helper.addClass(prompt, "is-transparent");
          helper.removeClass(promptWrapper, "is-unrotate-in");
          helper.addClass(promptWrapper, "is-dropped-out");
        } else {
          prompt.remove();
        };
        body.dataset.prompt = false;
      };
      var promptbody = document.createElement("div");
      promptbody.setAttribute("class", "m-prompt-body");
      var promptHeading = document.createElement("h1");
      promptHeading.setAttribute("tabindex", "1");
      promptHeading.setAttribute("class", "m-prompt-heading");
      promptHeading.textContent = heading;
      var promptText = document.createElement("p");
      promptText.setAttribute("class", "m-prompt-text");
      promptText.textContent = message;
      var promptControls = document.createElement("div");
      promptControls.setAttribute("class", "m-prompt-controls button-group button-group-line button-group-equal");
      var actionButton = document.createElement("a");
      actionButton.setAttribute("href", "javascript:void(0)");
      actionButton.setAttribute("tabindex", "1");
      actionButton.setAttribute("class", "button button-primary button-large js-prompt-action");
      actionButton.textContent = actionText || "Ok";
      var cancelButton = document.createElement("a");
      cancelButton.setAttribute("href", "javascript:void(0)");
      cancelButton.setAttribute("tabindex", "1");
      cancelButton.setAttribute("class", "button button-large");
      cancelButton.textContent = "Cancel";
      promptControls.appendChild(cancelButton);
      promptControls.appendChild(actionButton);
      if (heading != false) {
        promptbody.appendChild(promptHeading);
      };
      if (message != false) {
        promptbody.appendChild(promptText);
      };
      promptWrapper.appendChild(promptbody);
      promptWrapper.appendChild(promptControls);
      prompt.appendChild(promptWrapper);
      prompt.addEventListener("transitionend", function(event, elapsed) {
        if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
          this.parentElement.removeChild(this);
        };
      }.bind(prompt), false);
      actionButton.addEventListener("click", function(event) {
        event.stopPropagation();
        this.destroy();
        shade.destroy();
        if (action) {
          action();
        };
        page.update();
      }.bind(prompt), false);
      if (actionUrl) {
        actionButton.href = actionUrl;
      };
      if (actionAttributeKey && actionAttributeValue) {
        actionButton.setAttribute(actionAttributeKey, actionAttributeValue);
      };
      cancelButton.addEventListener("click", function(event) {
        event.stopPropagation();
        this.destroy();
        shade.destroy();
        page.update();
      }.bind(prompt), false);
      previousPrompt = prompt;
      shade.render({
        action: function() {
          prompt.destroy();
          page.update();
        },
        includeHeader: true
      });
      body.appendChild(prompt);
      getComputedStyle(prompt).opacity;
      helper.removeClass(prompt, "is-transparent");
      helper.addClass(prompt, "is-opaque");
      helper.removeClass(promptWrapper, "is-unrotate-out");
      helper.addClass(promptWrapper, "is-unrotate-in");
      promptHeading.focus(this);
    };
    modal.destroy();
    menu.close();
    characterSelect.close();
    if (previousPrompt != null) {
      destroy();
    };
    makePrompt();
  };

  // exposed methods
  return {
    bind: bind,
    destroy: destroy,
    render: render
  };

})();
