(function (root, factory) {
  if (typeof exports === 'object') {
    factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else {
    factory(root);
  }
} (this, function (exports) {
  var VERSION = '2.8.0-alpha.1';

  function IntroJs(obj) {
    this._targetElement = obj;
    this._introItems = [];

    this._options = {
      nextLabel: 'Next &rarr;',
      prevLabel: '&larr; Back',
      skipLabel: 'Skip',
      doneLabel: 'Done',
      hidePrev: false,
      hideNext: false,
      tooltipPosition: 'bottom',
      tooltipClass: '',
      highlightClass: '',
      exitOnEsc: true,
      exitOnOverlayClick: true,
      showStepNumbers: true,
      keyboardNavigation: true,
      showButtons: true,
      showBullets: true,
      showProgress: false,
      scrollToElement: true,
      scrollTo: 'element',
      scrollPadding: 30,
      overlayOpacity: 0.8,
      positionPrecedence: ["bottom", "top", "right", "left"],
      disableInteraction: false,
      hintPosition: 'top-middle',
      hintButtonLabel: 'Got it',
      hintAnimation: true
    };
  }
  function _introForElement(targetElm) {
    var introItems = [],
        self = this;

    if (this._options.steps) {
      for (var i = 0, stepsLength = this._options.steps.length; i < stepsLength; i++) {
        var currentItem = _cloneObject(this._options.steps[i]);

        currentItem.step = introItems.length + 1;

        if (typeof (currentItem.element) === 'string') {
          currentItem.element = document.querySelector(currentItem.element);
        }

        if (typeof (currentItem.element) === 'undefined' || currentItem.element == null) {
          var floatingElementQuery = document.querySelector(".introjsFloatingElement");

          if (floatingElementQuery == null) {
            floatingElementQuery = document.createElement('div');
            floatingElementQuery.className = 'introjsFloatingElement';

            document.body.appendChild(floatingElementQuery);
          }

          currentItem.element  = floatingElementQuery;
          currentItem.position = 'floating';
        }

        currentItem.scrollTo = currentItem.scrollTo || this._options.scrollTo;

        if (typeof (currentItem.disableInteraction) === 'undefined') {
          currentItem.disableInteraction = this._options.disableInteraction;
        }

        if (currentItem.element != null) {
          introItems.push(currentItem);
        }
      }

    } else {
      var allIntroSteps = targetElm.querySelectorAll('*[data-intro]');
      if (allIntroSteps.length < 1) {
        return false;
      }

      for (var i = 0, elmsLength = allIntroSteps.length; i < elmsLength; i++) {
        var currentElement = allIntroSteps[i];

        if (currentElement.style.display == 'none') {
          continue;
        }

        var step = parseInt(currentElement.getAttribute('data-step'), 10);

        var disableInteraction = this._options.disableInteraction;

        if (typeof (currentElement.getAttribute('data-disable-interaction')) != 'undefined') {
          disableInteraction = !!currentElement.getAttribute('data-disable-interaction');
        }

        if (step > 0) {
          introItems[step - 1] = {
            element: currentElement,
            intro: currentElement.getAttribute('data-intro'),
            step: parseInt(currentElement.getAttribute('data-step'), 10),
            tooltipClass: currentElement.getAttribute('data-tooltipClass'),
            highlightClass: currentElement.getAttribute('data-highlightClass'),
            position: currentElement.getAttribute('data-position') || this._options.tooltipPosition,
            scrollTo: currentElement.getAttribute('data-scrollTo') || this._options.scrollTo,
            disableInteraction: disableInteraction
          };
        }
      }

      var nextStep = 0;
      for (var i = 0, elmsLength = allIntroSteps.length; i < elmsLength; i++) {
        var currentElement = allIntroSteps[i];

        if (currentElement.getAttribute('data-step') == null) {

          while (true) {
            if (typeof introItems[nextStep] == 'undefined') {
              break;
            } else {
              nextStep++;
            }
          }

          var disableInteraction = this._options.disableInteraction;

          if (typeof (currentElement.getAttribute('data-disable-interaction')) != 'undefined') {
            disableInteraction = !!currentElement.getAttribute('data-disable-interaction');
          }

          introItems[nextStep] = {
            element: currentElement,
            intro: currentElement.getAttribute('data-intro'),
            step: nextStep + 1,
            tooltipClass: currentElement.getAttribute('data-tooltipClass'),
            highlightClass: currentElement.getAttribute('data-highlightClass'),
            position: currentElement.getAttribute('data-position') || this._options.tooltipPosition,
            scrollTo: currentElement.getAttribute('data-scrollTo') || this._options.scrollTo,
            disableInteraction: disableInteraction
          };
        }
      }
    }

    var tempIntroItems = [];
    for (var z = 0; z < introItems.length; z++) {
      introItems[z] && tempIntroItems.push(introItems[z]);
    }

    introItems = tempIntroItems;

    introItems.sort(function (a, b) {
      return a.step - b.step;
    });

    self._introItems = introItems;

    if(_addOverlayLayer.call(self, targetElm)) {
      _nextStep.call(self);

      var skipButton     = targetElm.querySelector('.introjs-skipbutton'),
          nextStepButton = targetElm.querySelector('.introjs-nextbutton');

      self._onKeyDown = function(e) {
        if (e.keyCode === 27 && self._options.exitOnEsc == true) {
          _exitIntro.call(self, targetElm);
        } else if(e.keyCode === 37) {
          _previousStep.call(self);
        } else if (e.keyCode === 39) {
          _nextStep.call(self);
        } else if (e.keyCode === 13) {
          var target = e.target || e.srcElement;
          if (target && target.className.indexOf('introjs-prevbutton') > 0) {
            _previousStep.call(self);
          } else if (target && target.className.indexOf('introjs-skipbutton') > 0) {
            if (self._introItems.length - 1 == self._currentStep && typeof (self._introCompleteCallback) === 'function') {
                self._introCompleteCallback.call(self);
            }

            _exitIntro.call(self, targetElm);
          } else {
            _nextStep.call(self);
          }

          if(e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
      };

      self._onResize = function(e) {
        self.refresh.call(self);
      };

      if (window.addEventListener) {
        if (this._options.keyboardNavigation) {
          window.addEventListener('keydown', self._onKeyDown, true);
        }
        window.addEventListener('resize', self._onResize, true);
      } else if (document.attachEvent) { 
        if (this._options.keyboardNavigation) {
          document.attachEvent('onkeydown', self._onKeyDown);
        }
        document.attachEvent('onresize', self._onResize);
      }
    }
    return false;
  }

  function _cloneObject(object) {
      if (object == null || typeof (object) != 'object' || typeof (object.nodeType) != 'undefined') {
        return object;
      }
      var temp = {};
      for (var key in object) {
        if (typeof (jQuery) != 'undefined' && object[key] instanceof jQuery) {
          temp[key] = object[key];
        } else {
          temp[key] = _cloneObject(object[key]);
        }
      }
      return temp;
  }
  function _goToStep(step) {
    this._currentStep = step - 2;
    if (typeof (this._introItems) !== 'undefined') {
      _nextStep.call(this);
    }
  }

  function _goToStepNumber(step) {
    this._currentStepNumber = step;
    if (typeof (this._introItems) !== 'undefined') {
      _nextStep.call(this);
    }
  }

  function _nextStep() {
    this._direction = 'forward';

    if (typeof (this._currentStepNumber) !== 'undefined') {
        for( var i = 0, len = this._introItems.length; i < len; i++ ) {
            var item = this._introItems[i];
            if( item.step === this._currentStepNumber ) {
                this._currentStep = i - 1;
                this._currentStepNumber = undefined;
            }
        }
    }

    if (typeof (this._currentStep) === 'undefined') {
      this._currentStep = 0;
    } else {
      ++this._currentStep;
    }

    if (typeof (this._introBeforeChangeCallback) !== 'undefined') {
      var continueStep = this._introBeforeChangeCallback.call(this);
    }

    if (continueStep === false) {
      --this._currentStep;
      return false;
    } 

    if ((this._introItems.length) <= this._currentStep) {
      if (typeof (this._introCompleteCallback) === 'function') {
        this._introCompleteCallback.call(this);
      }
      _exitIntro.call(this, this._targetElement);
      return;
    }

    var nextStep = this._introItems[this._currentStep];
    _showElement.call(this, nextStep);
  }

  function _previousStep() {
    this._direction = 'backward';

    if (this._currentStep === 0) {
      return false;
    }

    --this._currentStep;

    if (typeof (this._introBeforeChangeCallback) !== 'undefined') {
      var continueStep = this._introBeforeChangeCallback.call(this);
    }

    if (continueStep === false) {
      ++this._currentStep;
      return false;
    }

    var nextStep = this._introItems[this._currentStep];
    _showElement.call(this, nextStep);
  }

  function _refresh() {
    _setHelperLayerPosition.call(this, document.querySelector('.introjs-helperLayer'));
    _setHelperLayerPosition.call(this, document.querySelector('.introjs-tooltipReferenceLayer'));
    _setHelperLayerPosition.call(this, document.querySelector('.introjs-disableInteraction'));

    if(this._currentStep !== undefined && this._currentStep !== null) {
      var oldHelperNumberLayer = document.querySelector('.introjs-helperNumberLayer'),
        oldArrowLayer        = document.querySelector('.introjs-arrow'),
        oldtooltipContainer  = document.querySelector('.introjs-tooltip');
      _placeTooltip.call(this, this._introItems[this._currentStep].element, oldtooltipContainer, oldArrowLayer, oldHelperNumberLayer);
    }

    _reAlignHints.call(this);
    return this;
  }

  function _exitIntro(targetElement, force) {
    var continueExit = true;
    if (this._introBeforeExitCallback != undefined) {
      continueExit = this._introBeforeExitCallback.call(self);
    }

    if (!force && continueExit === false) return;

    var overlayLayers = targetElement.querySelectorAll('.introjs-overlay');

    if (overlayLayers && overlayLayers.length > 0) {
      for (var i = overlayLayers.length - 1; i >= 0; i--) {
        var overlayLayer = overlayLayers[i];
        overlayLayer.style.opacity = 0;
        setTimeout(function () {
          if (this.parentNode) {
            this.parentNode.removeChild(this);
          }
        }.bind(overlayLayer), 500);
      };
    }

    var helperLayer = targetElement.querySelector('.introjs-helperLayer');
    if (helperLayer) {
      helperLayer.parentNode.removeChild(helperLayer);
    }

    var referenceLayer = targetElement.querySelector('.introjs-tooltipReferenceLayer');
    if (referenceLayer) {
      referenceLayer.parentNode.removeChild(referenceLayer);
    }

    var disableInteractionLayer = targetElement.querySelector('.introjs-disableInteraction');
    if (disableInteractionLayer) {
      disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
    }

    var floatingElement = document.querySelector('.introjsFloatingElement');
    if (floatingElement) {
      floatingElement.parentNode.removeChild(floatingElement);
    }

    _removeShowElement();

    var fixParents = document.querySelectorAll('.introjs-fixParent');
    if (fixParents && fixParents.length > 0) {
      for (var i = fixParents.length - 1; i >= 0; i--) {
        fixParents[i].className = fixParents[i].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
      }
    }

    if (window.removeEventListener) {
      window.removeEventListener('keydown', this._onKeyDown, true);
    } else if (document.detachEvent) { //IE
      document.detachEvent('onkeydown', this._onKeyDown);
    }

    if (this._introExitCallback != undefined) {
      this._introExitCallback.call(self);
    }

    this._currentStep = undefined;
  }

  function _placeTooltip(targetElement, tooltipLayer, arrowLayer, helperNumberLayer, hintMode) {
    var tooltipCssClass = '',
        currentStepObj,
        tooltipOffset,
        targetOffset,
        windowSize,
        currentTooltipPosition;

    hintMode = hintMode || false;

    tooltipLayer.style.top        = null;
    tooltipLayer.style.right      = null;
    tooltipLayer.style.bottom     = null;
    tooltipLayer.style.left       = null;
    tooltipLayer.style.marginLeft = null;
    tooltipLayer.style.marginTop  = null;

    arrowLayer.style.display = 'inherit';

    if (typeof(helperNumberLayer) != 'undefined' && helperNumberLayer != null) {
      helperNumberLayer.style.top  = null;
      helperNumberLayer.style.left = null;
    }

    if (!this._introItems[this._currentStep]) return;

    currentStepObj = this._introItems[this._currentStep];
    if (typeof (currentStepObj.tooltipClass) === 'string') {
      tooltipCssClass = currentStepObj.tooltipClass;
    } else {
      tooltipCssClass = this._options.tooltipClass;
    }

    tooltipLayer.className = ('introjs-tooltip ' + tooltipCssClass).replace(/^\s+|\s+$/g, '');

    currentTooltipPosition = this._introItems[this._currentStep].position;

    if (currentTooltipPosition != "floating") { 
      if (currentTooltipPosition === "auto") {
        currentTooltipPosition = _determineAutoPosition.call(this, targetElement, tooltipLayer);
      } else {
        currentTooltipPosition = _determineAutoPosition.call(this, targetElement, tooltipLayer, currentTooltipPosition);
      }
    }

    targetOffset  = _getOffset(targetElement);
    tooltipOffset = _getOffset(tooltipLayer);
    windowSize    = _getWinSize();

    switch (currentTooltipPosition) {
      case 'top':
        arrowLayer.className = 'introjs-arrow bottom';

        if (hintMode) {
          var tooltipLayerStyleLeft = 0;
        } else {
          var tooltipLayerStyleLeft = 15;
        }

        _checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer);
        tooltipLayer.style.bottom = (targetOffset.height +  20) + 'px';
        break;
      case 'right':
        tooltipLayer.style.left = (targetOffset.width + 20) + 'px';
        if (targetOffset.top + tooltipOffset.height > windowSize.height) {
          arrowLayer.className = "introjs-arrow left-bottom";
          tooltipLayer.style.top = "-" + (tooltipOffset.height - targetOffset.height - 20) + "px";
        } else {
          arrowLayer.className = 'introjs-arrow left';
        }
        break;
      case 'left':
        if (!hintMode && this._options.showStepNumbers == true) {
          tooltipLayer.style.top = '15px';
        }

        if (targetOffset.top + tooltipOffset.height > windowSize.height) {
          tooltipLayer.style.top = "-" + (tooltipOffset.height - targetOffset.height - 20) + "px";
          arrowLayer.className = 'introjs-arrow right-bottom';
        } else {
          arrowLayer.className = 'introjs-arrow right';
        }
        tooltipLayer.style.right = (targetOffset.width + 20) + 'px';

        break;
      case 'floating':
        arrowLayer.style.display = 'none';

        tooltipLayer.style.left   = '50%';
        tooltipLayer.style.top    = '50%';
        tooltipLayer.style.marginLeft = '-' + (tooltipOffset.width / 2)  + 'px';
        tooltipLayer.style.marginTop  = '-' + (tooltipOffset.height / 2) + 'px';

        if (typeof(helperNumberLayer) != 'undefined' && helperNumberLayer != null) {
          helperNumberLayer.style.left = '-' + ((tooltipOffset.width / 2) + 18) + 'px';
          helperNumberLayer.style.top  = '-' + ((tooltipOffset.height / 2) + 18) + 'px';
        }

        break;
      case 'bottom-right-aligned':
        arrowLayer.className      = 'introjs-arrow top-right';

        var tooltipLayerStyleRight = 0;
        _checkLeft(targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer);
        tooltipLayer.style.top    = (targetOffset.height +  20) + 'px';
        break;

      case 'bottom-middle-aligned':
        arrowLayer.className      = 'introjs-arrow top-middle';

        var tooltipLayerStyleLeftRight = targetOffset.width / 2 - tooltipOffset.width / 2;

        if (hintMode) {
          tooltipLayerStyleLeftRight += 5;
        }

        if (_checkLeft(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, tooltipLayer)) {
          tooltipLayer.style.right = null;
          _checkRight(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, windowSize, tooltipLayer);
        }
        tooltipLayer.style.top = (targetOffset.height + 20) + 'px';
        break;

      case 'bottom-left-aligned':
      case 'bottom':
      default:
        arrowLayer.className = 'introjs-arrow top';

        var tooltipLayerStyleLeft = 0;
        _checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer);
        tooltipLayer.style.top    = (targetOffset.height +  20) + 'px';
        break;
    }
  }

  function _checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer) {
    if (targetOffset.left + tooltipLayerStyleLeft + tooltipOffset.width > windowSize.width) {
      tooltipLayer.style.left = (windowSize.width - tooltipOffset.width - targetOffset.left) + 'px';
      return false;
    }
    tooltipLayer.style.left = tooltipLayerStyleLeft + 'px';
    return true;
  }

  function _checkLeft(targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer) {
    if (targetOffset.left + targetOffset.width - tooltipLayerStyleRight - tooltipOffset.width < 0) {
      tooltipLayer.style.left = (-targetOffset.left) + 'px';
      return false;
    }
    tooltipLayer.style.right = tooltipLayerStyleRight + 'px';
    return true;
  }

  function _determineAutoPosition(targetElement, tooltipLayer, desiredTooltipPosition) {

    var possiblePositions = this._options.positionPrecedence.slice();

    var windowSize = _getWinSize();
    var tooltipHeight = _getOffset(tooltipLayer).height + 10;
    var tooltipWidth = _getOffset(tooltipLayer).width + 20;
    var targetOffset = _getOffset(targetElement);
    var calculatedPosition = "floating";
    if (targetOffset.left + tooltipWidth > windowSize.width || ((targetOffset.left + (targetOffset.width / 2)) - tooltipWidth) < 0) {
      _removeEntry(possiblePositions, "bottom");
      _removeEntry(possiblePositions, "top");
    } else {
      if ((targetOffset.height + targetOffset.top + tooltipHeight) > windowSize.height) {
        _removeEntry(possiblePositions, "bottom");
      }

      if (targetOffset.top - tooltipHeight < 0) {
        _removeEntry(possiblePositions, "top");
      }
    }

    if (targetOffset.width + targetOffset.left + tooltipWidth > windowSize.width) {
      _removeEntry(possiblePositions, "right");
    }

    if (targetOffset.left - tooltipWidth < 0) {
      _removeEntry(possiblePositions, "left");
    }

    if (possiblePositions.length > 0) {
      calculatedPosition = possiblePositions[0];
    }

    if (desiredTooltipPosition && desiredTooltipPosition != "auto") {
      if (possiblePositions.indexOf(desiredTooltipPosition) > -1) {
        calculatedPosition = desiredTooltipPosition;
      }
    }

    return calculatedPosition;
  }
  function _removeEntry(stringArray, stringToRemove) {
    if (stringArray.indexOf(stringToRemove) > -1) {
      stringArray.splice(stringArray.indexOf(stringToRemove), 1);
    }
  }
  function _setHelperLayerPosition(helperLayer) {
    if (helperLayer) {
      if (!this._introItems[this._currentStep]) return;

      var currentElement  = this._introItems[this._currentStep],
          elementPosition = _getOffset(currentElement.element),
          widthHeightPadding = 10;

      if (_isFixed(currentElement.element)) {
        helperLayer.className += ' introjs-fixedTooltip';
      } else {
        helperLayer.className = helperLayer.className.replace(' introjs-fixedTooltip', '');
      }

      if (currentElement.position == 'floating') {
        widthHeightPadding = 0;
      }

      helperLayer.setAttribute('style', 'width: ' + (elementPosition.width  + widthHeightPadding)  + 'px; ' +
                                        'height:' + (elementPosition.height + widthHeightPadding)  + 'px; ' +
                                        'top:'    + (elementPosition.top    - 5)   + 'px;' +
                                        'left: '  + (elementPosition.left   - 5)   + 'px;');

    }
  }

  function _disableInteraction() {
    var disableInteractionLayer = document.querySelector('.introjs-disableInteraction');

    if (disableInteractionLayer === null) {
      disableInteractionLayer = document.createElement('div');
      disableInteractionLayer.className = 'introjs-disableInteraction';
      this._targetElement.appendChild(disableInteractionLayer);
    }

    _setHelperLayerPosition.call(this, disableInteractionLayer);
  }

  function _setAnchorAsButton(anchor){
    anchor.setAttribute('role', 'button');
    anchor.tabIndex = 0;
  }

  function _showElement(targetElement) {
    if (typeof (this._introChangeCallback) !== 'undefined') {
      this._introChangeCallback.call(this, targetElement.element);
    }

    var self = this,
        oldHelperLayer = document.querySelector('.introjs-helperLayer'),
        oldReferenceLayer = document.querySelector('.introjs-tooltipReferenceLayer'),
        highlightClass = 'introjs-helperLayer',
        elementPosition = _getOffset(targetElement.element);

    if (typeof (targetElement.highlightClass) === 'string') {
      highlightClass += (' ' + targetElement.highlightClass);
    }
    if (typeof (this._options.highlightClass) === 'string') {
      highlightClass += (' ' + this._options.highlightClass);
    }

    if (oldHelperLayer != null) {
      var oldHelperNumberLayer = oldReferenceLayer.querySelector('.introjs-helperNumberLayer'),
          oldtooltipLayer      = oldReferenceLayer.querySelector('.introjs-tooltiptext'),
          oldArrowLayer        = oldReferenceLayer.querySelector('.introjs-arrow'),
          oldtooltipContainer  = oldReferenceLayer.querySelector('.introjs-tooltip'),
          skipTooltipButton    = oldReferenceLayer.querySelector('.introjs-skipbutton'),
          prevTooltipButton    = oldReferenceLayer.querySelector('.introjs-prevbutton'),
          nextTooltipButton    = oldReferenceLayer.querySelector('.introjs-nextbutton');

      oldHelperLayer.className = highlightClass;
      oldtooltipContainer.style.opacity = 0;
      oldtooltipContainer.style.display = "none";

      if (oldHelperNumberLayer != null) {
        var lastIntroItem = this._introItems[(targetElement.step - 2 >= 0 ? targetElement.step - 2 : 0)];

        if (lastIntroItem != null && (this._direction == 'forward' && lastIntroItem.position == 'floating') || (this._direction == 'backward' && targetElement.position == 'floating')) {
          oldHelperNumberLayer.style.opacity = 0;
        }
      }

      _setHelperLayerPosition.call(self, oldHelperLayer);
      _setHelperLayerPosition.call(self, oldReferenceLayer);

      var fixParents = document.querySelectorAll('.introjs-fixParent');
      if (fixParents && fixParents.length > 0) {
        for (var i = fixParents.length - 1; i >= 0; i--) {
          fixParents[i].className = fixParents[i].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
        };
      }

      _removeShowElement();

      if (self._lastShowElementTimer) {
        clearTimeout(self._lastShowElementTimer);
      }

      self._lastShowElementTimer = setTimeout(function() {
        if (oldHelperNumberLayer != null) {
          oldHelperNumberLayer.innerHTML = targetElement.step;
        }
        oldtooltipLayer.innerHTML = targetElement.intro;
        oldtooltipContainer.style.display = "block";
        _placeTooltip.call(self, targetElement.element, oldtooltipContainer, oldArrowLayer, oldHelperNumberLayer);

        if (self._options.showBullets) {
            oldReferenceLayer.querySelector('.introjs-bullets li > a.active').className = '';
            oldReferenceLayer.querySelector('.introjs-bullets li > a[data-stepnumber="' + targetElement.step + '"]').className = 'active';
        }
        oldReferenceLayer.querySelector('.introjs-progress .introjs-progressbar').setAttribute('style', 'width:' + _getProgress.call(self) + '%;');

        oldtooltipContainer.style.opacity = 1;
        if (oldHelperNumberLayer) oldHelperNumberLayer.style.opacity = 1;

        if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null && /introjs-donebutton/gi.test(skipTooltipButton.className)) {
          skipTooltipButton.focus();
        } else if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
          nextTooltipButton.focus();
        }

        _scrollTo.call(self, targetElement.scrollTo, targetElement, oldtooltipLayer);
      }, 350);

    } else {
      var helperLayer       = document.createElement('div'),
          referenceLayer    = document.createElement('div'),
          arrowLayer        = document.createElement('div'),
          tooltipLayer      = document.createElement('div'),
          tooltipTextLayer  = document.createElement('div'),
          bulletsLayer      = document.createElement('div'),
          progressLayer     = document.createElement('div'),
          buttonsLayer      = document.createElement('div');

      helperLayer.className = highlightClass;
      referenceLayer.className = 'introjs-tooltipReferenceLayer';

      _setHelperLayerPosition.call(self, helperLayer);
      _setHelperLayerPosition.call(self, referenceLayer);

      this._targetElement.appendChild(helperLayer);
      this._targetElement.appendChild(referenceLayer);

      arrowLayer.className = 'introjs-arrow';

      tooltipTextLayer.className = 'introjs-tooltiptext';
      tooltipTextLayer.innerHTML = targetElement.intro;

      bulletsLayer.className = 'introjs-bullets';

      if (this._options.showBullets === false) {
        bulletsLayer.style.display = 'none';
      }

      var ulContainer = document.createElement('ul');

      for (var i = 0, stepsLength = this._introItems.length; i < stepsLength; i++) {
        var innerLi    = document.createElement('li');
        var anchorLink = document.createElement('a');

        anchorLink.onclick = function() {
          self.goToStep(this.getAttribute('data-stepnumber'));
        };

        if (i === (targetElement.step-1)) anchorLink.className = 'active';

        _setAnchorAsButton(anchorLink);
        anchorLink.innerHTML = "&nbsp;";
        anchorLink.setAttribute('data-stepnumber', this._introItems[i].step);

        innerLi.appendChild(anchorLink);
        ulContainer.appendChild(innerLi);
      }

      bulletsLayer.appendChild(ulContainer);

      progressLayer.className = 'introjs-progress';

      if (this._options.showProgress === false) {
        progressLayer.style.display = 'none';
      }
      var progressBar = document.createElement('div');
      progressBar.className = 'introjs-progressbar';
      progressBar.setAttribute('style', 'width:' + _getProgress.call(this) + '%;');

      progressLayer.appendChild(progressBar);

      buttonsLayer.className = 'introjs-tooltipbuttons';
      if (this._options.showButtons === false) {
        buttonsLayer.style.display = 'none';
      }

      tooltipLayer.className = 'introjs-tooltip';
      tooltipLayer.appendChild(tooltipTextLayer);
      tooltipLayer.appendChild(bulletsLayer);
      tooltipLayer.appendChild(progressLayer);

      if (this._options.showStepNumbers == true) {
        var helperNumberLayer = document.createElement('span');
        helperNumberLayer.className = 'introjs-helperNumberLayer';
        helperNumberLayer.innerHTML = targetElement.step;
        referenceLayer.appendChild(helperNumberLayer);
      }

      tooltipLayer.appendChild(arrowLayer);
      referenceLayer.appendChild(tooltipLayer);

      var nextTooltipButton = document.createElement('a');

      nextTooltipButton.onclick = function() {
        if (self._introItems.length - 1 != self._currentStep) {
          _nextStep.call(self);
        }
      };

      _setAnchorAsButton(nextTooltipButton);
      nextTooltipButton.innerHTML = this._options.nextLabel;

      var prevTooltipButton = document.createElement('a');

      prevTooltipButton.onclick = function() {
        if (self._currentStep != 0) {
          _previousStep.call(self);
        }
      };

      _setAnchorAsButton(prevTooltipButton);
      prevTooltipButton.innerHTML = this._options.prevLabel;

      var skipTooltipButton = document.createElement('a');
      skipTooltipButton.className = 'introjs-button introjs-skipbutton';
      _setAnchorAsButton(skipTooltipButton);
      skipTooltipButton.innerHTML = this._options.skipLabel;

      skipTooltipButton.onclick = function() {
        if (self._introItems.length - 1 == self._currentStep && typeof (self._introCompleteCallback) === 'function') {
          self._introCompleteCallback.call(self);
        }

        _exitIntro.call(self, self._targetElement);
      };

      buttonsLayer.appendChild(skipTooltipButton);

      if (this._introItems.length > 1) {
        buttonsLayer.appendChild(prevTooltipButton);
        buttonsLayer.appendChild(nextTooltipButton);
      }

      tooltipLayer.appendChild(buttonsLayer);

      _placeTooltip.call(self, targetElement.element, tooltipLayer, arrowLayer, helperNumberLayer);

      _scrollTo.call(this, targetElement.scrollTo, targetElement, tooltipLayer);

    }

    var disableInteractionLayer = self._targetElement.querySelector('.introjs-disableInteraction');
    if (disableInteractionLayer) {
      disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
    }

    if (targetElement.disableInteraction) {
      _disableInteraction.call(self);
    }

    if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
      nextTooltipButton.removeAttribute('tabIndex');
    }
    if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
      prevTooltipButton.removeAttribute('tabIndex');
    }

    if (this._currentStep == 0 && this._introItems.length > 1) {
      if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null) {
        skipTooltipButton.className = 'introjs-button introjs-skipbutton';
      }
      if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
        nextTooltipButton.className = 'introjs-button introjs-nextbutton';
      }

      if (this._options.hidePrev == true) {
        if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
          prevTooltipButton.className = 'introjs-button introjs-prevbutton introjs-hidden';
        }
        if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
          nextTooltipButton.className += ' introjs-fullbutton';
        }
      } else {
        if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
          prevTooltipButton.className = 'introjs-button introjs-prevbutton introjs-disabled';
        }
      }

      if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
        prevTooltipButton.tabIndex = '-1';
      }
      if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null) {
        skipTooltipButton.innerHTML = this._options.skipLabel;
      }
    } else if (this._introItems.length - 1 == this._currentStep || this._introItems.length == 1) {
      if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null) {
        skipTooltipButton.innerHTML = this._options.doneLabel;
        skipTooltipButton.className += ' introjs-donebutton';
      }
      if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
        prevTooltipButton.className = 'introjs-button introjs-prevbutton';
      }

      if (this._options.hideNext == true) {
        if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
          nextTooltipButton.className = 'introjs-button introjs-nextbutton introjs-hidden';
        }
        if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
          prevTooltipButton.className += ' introjs-fullbutton';
        }
      } else {
        if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
          nextTooltipButton.className = 'introjs-button introjs-nextbutton introjs-disabled';
        }
      }

      if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
        nextTooltipButton.tabIndex = '-1';
      }
    } else {
      if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null) {
        skipTooltipButton.className = 'introjs-button introjs-skipbutton';
      }
      if (typeof prevTooltipButton !== "undefined" && prevTooltipButton != null) {
        prevTooltipButton.className = 'introjs-button introjs-prevbutton';
      }
      if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
        nextTooltipButton.className = 'introjs-button introjs-nextbutton';
      }
      if (typeof skipTooltipButton !== "undefined" && skipTooltipButton != null) {
        skipTooltipButton.innerHTML = this._options.skipLabel;
      }
    }

    if (typeof nextTooltipButton !== "undefined" && nextTooltipButton != null) {
      nextTooltipButton.focus();
    }

    _setShowElement(targetElement);

    if (typeof (this._introAfterChangeCallback) !== 'undefined') {
      this._introAfterChangeCallback.call(this, targetElement.element);
    }
  }

  function _scrollTo(scrollTo, targetElement, tooltipLayer) {
    if (!this._options.scrollToElement) return;

    if (scrollTo === 'tooltip') {
      var rect = tooltipLayer.getBoundingClientRect();
    } else {
      var rect = targetElement.element.getBoundingClientRect();
    }

    if (!_elementInViewport(targetElement.element)) {
      var winHeight = _getWinSize().height;
      var top = rect.bottom - (rect.bottom - rect.top);
      var bottom = rect.bottom - winHeight;

      if (top < 0 || targetElement.element.clientHeight > winHeight) {
        window.scrollBy(0, rect.top - ((winHeight / 2) -  (rect.height / 2)) - this._options.scrollPadding);

      } else {
        window.scrollBy(0, rect.top - ((winHeight / 2) -  (rect.height / 2)) + this._options.scrollPadding);
      }
    }
  }

  function _removeShowElement() {
    var elms = document.querySelectorAll('.introjs-showElement');

    for (var i = 0, l = elms.length; i < l; i++) {
      var elm = elms[i];
      _removeClass(elm, /introjs-[a-zA-Z]+/g);
    }
  }

  function _setShowElement(targetElement) {
    if (targetElement.element instanceof SVGElement) {
      var parentElm = targetElement.element.parentNode;

      while (targetElement.element.parentNode != null) {
        if (!parentElm.tagName || parentElm.tagName.toLowerCase() === 'body') break;

        if (parentElm.tagName.toLowerCase() === 'svg') {
          _setClass(parentElm, 'introjs-showElement introjs-relativePosition');
        }

        parentElm = parentElm.parentNode;
      }
    }

    _setClass(targetElement.element, 'introjs-showElement');

    var currentElementPosition = _getPropValue(targetElement.element, 'position');
    if (currentElementPosition !== 'absolute' &&
        currentElementPosition !== 'relative' &&
        currentElementPosition !== 'fixed') {
      _setClass(targetElement.element, 'introjs-relativePosition')
    }

    var parentElm = targetElement.element.parentNode;
    while (parentElm != null) {
      if (!parentElm.tagName || parentElm.tagName.toLowerCase() === 'body') break;

      var zIndex = _getPropValue(parentElm, 'z-index');
      var opacity = parseFloat(_getPropValue(parentElm, 'opacity'));
      var transform = _getPropValue(parentElm, 'transform') || _getPropValue(parentElm, '-webkit-transform') || _getPropValue(parentElm, '-moz-transform') || _getPropValue(parentElm, '-ms-transform') || _getPropValue(parentElm, '-o-transform');
      if (/[0-9]+/.test(zIndex) || opacity < 1 || (transform !== 'none' && transform !== undefined)) {
        parentElm.className += ' introjs-fixParent';
      }

      parentElm = parentElm.parentNode;
    }
  }

  function _setClass(element, className) {
    if (element instanceof SVGElement) {
      var pre = element.getAttribute('class') || '';

      element.setAttribute('class', pre + ' ' + className);
    } else {
      element.className += ' ' + className;
    }
  }

  function _removeClass(element, classNameRegex) {
    if (element instanceof SVGElement) {
      var pre = element.getAttribute('class') || '';

      element.setAttribute('class', pre.replace(classNameRegex, '').replace(/^\s+|\s+$/g, ''));
    } else {
      element.className = element.className.replace(classNameRegex, '').replace(/^\s+|\s+$/g, '');
    }
  }
  function _getPropValue (element, propName) {
    var propValue = '';
    if (element.currentStyle) { 
      propValue = element.currentStyle[propName];
    } else if (document.defaultView && document.defaultView.getComputedStyle) { 
      propValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(propName);
    }

    if (propValue && propValue.toLowerCase) {
      return propValue.toLowerCase();
    } else {
      return propValue;
    }
  }

  function _isFixed (element) {
    var p = element.parentNode;

    if (!p || p.nodeName === 'HTML') {
      return false;
    }

    if (_getPropValue(element, 'position') == 'fixed') {
      return true;
    }

    return _isFixed(p);
  }

  function _getWinSize() {
    if (window.innerWidth != undefined) {
      return { width: window.innerWidth, height: window.innerHeight };
    } else {
      var D = document.documentElement;
      return { width: D.clientWidth, height: D.clientHeight };
    }
  }

  function _elementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      (rect.bottom+80) <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }

  function _addOverlayLayer(targetElm) {
    var overlayLayer = document.createElement('div'),
        styleText = '',
        self = this;

    overlayLayer.className = 'introjs-overlay';

    if (!targetElm.tagName || targetElm.tagName.toLowerCase() === 'body') {
      styleText += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
      overlayLayer.setAttribute('style', styleText);
    } else {
      var elementPosition = _getOffset(targetElm);
      if (elementPosition) {
        styleText += 'width: ' + elementPosition.width + 'px; height:' + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
        overlayLayer.setAttribute('style', styleText);
      }
    }

    targetElm.appendChild(overlayLayer);

    overlayLayer.onclick = function() {
      if (self._options.exitOnOverlayClick == true) {
        _exitIntro.call(self, targetElm);
      }
    };

    setTimeout(function() {
      styleText += 'opacity: ' + self._options.overlayOpacity.toString() + ';';
      overlayLayer.setAttribute('style', styleText);
    }, 10);

    return true;
  }

  function _removeHintTooltip() {
    var tooltip = this._targetElement.querySelector('.introjs-hintReference');

    if (tooltip) {
      var step = tooltip.getAttribute('data-step');
      tooltip.parentNode.removeChild(tooltip);
      return step;
    }
  }

  function _populateHints(targetElm) {
    var self = this;
    this._introItems = [];

    if (this._options.hints) {
      for (var i = 0, l = this._options.hints.length; i < l; i++) {
        var currentItem = _cloneObject(this._options.hints[i]);

        if (typeof(currentItem.element) === 'string') {
          currentItem.element = document.querySelector(currentItem.element);
        }

        currentItem.hintPosition = currentItem.hintPosition || this._options.hintPosition;
        currentItem.hintAnimation = currentItem.hintAnimation || this._options.hintAnimation;

        if (currentItem.element != null) {
          this._introItems.push(currentItem);
        }
      }
    } else {
      var hints = targetElm.querySelectorAll('*[data-hint]');

      if (hints.length < 1) {
        return false;
      }

      for (var i = 0, l = hints.length; i < l; i++) {
        var currentElement = hints[i];

        var hintAnimation = currentElement.getAttribute('data-hintAnimation');

        if (hintAnimation) {
          hintAnimation = (hintAnimation == 'true');
        } else {
          hintAnimation = this._options.hintAnimation;
        }

        this._introItems.push({
          element: currentElement,
          hint: currentElement.getAttribute('data-hint'),
          hintPosition: currentElement.getAttribute('data-hintPosition') || this._options.hintPosition,
          hintAnimation: hintAnimation,
          tooltipClass: currentElement.getAttribute('data-tooltipClass'),
          position: currentElement.getAttribute('data-position') || this._options.tooltipPosition
        });
      }
    }

    _addHints.call(this);

    if (document.addEventListener) {
      document.addEventListener('click', _removeHintTooltip.bind(this), false);
      window.addEventListener('resize', _reAlignHints.bind(this), true);
    } else if (document.attachEvent) { 
      document.attachEvent('onclick', _removeHintTooltip.bind(this));
      document.attachEvent('onresize', _reAlignHints.bind(this));
    }
  }

  function _reAlignHints() {
    for (var i = 0, l = this._introItems.length; i < l; i++) {
      var item = this._introItems[i];

      if (typeof (item.targetElement) == 'undefined') continue;

      _alignHintPosition.call(this, item.hintPosition, item.element, item.targetElement)
    }
  }

  function _hideHint(stepId) {
    _removeHintTooltip.call(this);
    var hint = this._targetElement.querySelector('.introjs-hint[data-step="' + stepId + '"]');

    if (hint) {
      hint.className += ' introjs-hidehint';
    }

    if (typeof (this._hintCloseCallback) !== 'undefined') {
      this._hintCloseCallback.call(this, stepId);
    }
  }

  function _hideHints() {
    var hints = this._targetElement.querySelectorAll('.introjs-hint');

    if (hints && hints.length > 0) {
      for (var i = 0; i < hints.length; i++) {
        _hideHint.call(this, hints[i].getAttribute('data-step'));
      }
    }
  }

  function _showHints() {
    var hints = this._targetElement.querySelectorAll('.introjs-hint');

    if (hints && hints.length > 0) {
      for (var i = 0; i < hints.length; i++) {
        _showHint.call(this, hints[i].getAttribute('data-step'));
      }
    } else {
      _populateHints.call(this, this._targetElement);
    }
  };

  function _showHint(stepId) {
    var hint = this._targetElement.querySelector('.introjs-hint[data-step="' + stepId + '"]');

    if (hint) {
      hint.className = hint.className.replace(/introjs\-hidehint/g, '');
    }
  };

  function _removeHints() {
    var hints = this._targetElement.querySelectorAll('.introjs-hint');

    if (hints && hints.length > 0) {
      for (var i = 0; i < hints.length; i++) {
        _removeHint.call(this, hints[i].getAttribute('data-step'));
      }
    }
  };
  function _removeHint(stepId) {
    var hint = this._targetElement.querySelector('.introjs-hint[data-step="' + stepId + '"]');

    if (hint) {
      hint.parentNode.removeChild(hint);
    }
  };

  function _addHints() {
    var self = this;

    var oldHintsWrapper = document.querySelector('.introjs-hints');

    if (oldHintsWrapper != null) {
      hintsWrapper = oldHintsWrapper;
    } else {
      var hintsWrapper = document.createElement('div');
      hintsWrapper.className = 'introjs-hints';
    }

    for (var i = 0, l = this._introItems.length; i < l; i++) {
      var item = this._introItems[i];

      if (document.querySelector('.introjs-hint[data-step="' + i + '"]'))
        continue;

      var hint = document.createElement('a');
      _setAnchorAsButton(hint);

      (function (hint, item, i) {
        hint.onclick = function(e) {
          var evt = e ? e : window.event;
          if (evt.stopPropagation)    evt.stopPropagation();
          if (evt.cancelBubble != null) evt.cancelBubble = true;

          _showHintDialog.call(self, i);
        };
      }(hint, item, i));

      hint.className = 'introjs-hint';

      if (!item.hintAnimation) {
        hint.className += ' introjs-hint-no-anim';
      }

      if (_isFixed(item.element)) {
        hint.className += ' introjs-fixedhint';
      }

      var hintDot = document.createElement('div');
      hintDot.className = 'introjs-hint-dot';
      var hintPulse = document.createElement('div');
      hintPulse.className = 'introjs-hint-pulse';

      hint.appendChild(hintDot);
      hint.appendChild(hintPulse);
      hint.setAttribute('data-step', i);

      item.targetElement = item.element;
      item.element = hint;

      _alignHintPosition.call(this, item.hintPosition, hint, item.targetElement);

      hintsWrapper.appendChild(hint);
    }

    document.body.appendChild(hintsWrapper);

    if (typeof (this._hintsAddedCallback) !== 'undefined') {
      this._hintsAddedCallback.call(this);
    }
  }
  function _alignHintPosition(position, hint, element) {
    var offset = _getOffset.call(this, element);
    var iconWidth = 20;
    var iconHeight = 20;

    switch (position) {
      default:
      case 'top-left':
        hint.style.left = offset.left + 'px';
        hint.style.top = offset.top + 'px';
        break;
      case 'top-right':
        hint.style.left = (offset.left + offset.width - iconWidth) + 'px';
        hint.style.top = offset.top + 'px';
        break;
      case 'bottom-left':
        hint.style.left = offset.left + 'px';
        hint.style.top = (offset.top + offset.height - iconHeight) + 'px';
        break;
      case 'bottom-right':
        hint.style.left = (offset.left + offset.width - iconWidth) + 'px';
        hint.style.top = (offset.top + offset.height - iconHeight) + 'px';
        break;
      case 'middle-left':
        hint.style.left = offset.left + 'px';
        hint.style.top = (offset.top + (offset.height - iconHeight) / 2) + 'px';
        break;
      case 'middle-right':
        hint.style.left = (offset.left + offset.width - iconWidth) + 'px';
        hint.style.top = (offset.top + (offset.height - iconHeight) / 2) + 'px';
        break;
      case 'middle-middle':
        hint.style.left = (offset.left + (offset.width - iconWidth) / 2) + 'px';
        hint.style.top = (offset.top + (offset.height - iconHeight) / 2) + 'px';
        break;
      case 'bottom-middle':
        hint.style.left = (offset.left + (offset.width - iconWidth) / 2) + 'px';
        hint.style.top = (offset.top + offset.height - iconHeight) + 'px';
        break;
      case 'top-middle':
        hint.style.left = (offset.left + (offset.width - iconWidth) / 2) + 'px';
        hint.style.top = offset.top + 'px';
        break;
    }
  }

  function _showHintDialog(stepId) {
    var hintElement = document.querySelector('.introjs-hint[data-step="' + stepId + '"]');
    var item = this._introItems[stepId];

    if (typeof (this._hintClickCallback) !== 'undefined') {
      this._hintClickCallback.call(this, hintElement, item, stepId);
    }

    var removedStep = _removeHintTooltip.call(this);

    if (parseInt(removedStep, 10) == stepId) {
      return;
    }

    var tooltipLayer = document.createElement('div');
    var tooltipTextLayer = document.createElement('div');
    var arrowLayer = document.createElement('div');
    var referenceLayer = document.createElement('div');

    tooltipLayer.className = 'introjs-tooltip';

    tooltipLayer.onclick = function (e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      else {
        e.cancelBubble = true;
      }
    };

    tooltipTextLayer.className = 'introjs-tooltiptext';

    var tooltipWrapper = document.createElement('p');
    tooltipWrapper.innerHTML = item.hint;

    var closeButton = document.createElement('a');
    closeButton.className = 'introjs-button';
    closeButton.innerHTML = this._options.hintButtonLabel;
    closeButton.onclick = _hideHint.bind(this, stepId);

    tooltipTextLayer.appendChild(tooltipWrapper);
    tooltipTextLayer.appendChild(closeButton);

    arrowLayer.className = 'introjs-arrow';
    tooltipLayer.appendChild(arrowLayer);

    tooltipLayer.appendChild(tooltipTextLayer);

    this._currentStep = hintElement.getAttribute('data-step');

    referenceLayer.className = 'introjs-tooltipReferenceLayer introjs-hintReference';
    referenceLayer.setAttribute('data-step', hintElement.getAttribute('data-step'));
    _setHelperLayerPosition.call(this, referenceLayer);

    referenceLayer.appendChild(tooltipLayer);
    document.body.appendChild(referenceLayer);

    _placeTooltip.call(this, hintElement, tooltipLayer, arrowLayer, null, true);
  }

  function _getOffset(element) {
    var elementPosition = {};

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    if (element instanceof SVGElement) {
      var x = element.getBoundingClientRect()
      elementPosition.top = x.top + scrollTop;
      elementPosition.width = x.width;
      elementPosition.height = x.height;
      elementPosition.left = x.left + scrollLeft;
    } else {
      elementPosition.width = element.offsetWidth;

      elementPosition.height = element.offsetHeight;

      var _x = 0;
      var _y = 0;
      while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
        _x += element.offsetLeft;
        _y += element.offsetTop;
        element = element.offsetParent;
      }
      elementPosition.top = _y;
      elementPosition.left = _x;
    }

    return elementPosition;
  }

  function _getProgress() {
    var currentStep = parseInt((this._currentStep + 1), 10);
    return ((currentStep / this._introItems.length) * 100);
  }


  function _mergeOptions(obj1,obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }

  var introJs = function (targetElm) {
    if (typeof (targetElm) === 'object') {
      return new IntroJs(targetElm);

    } else if (typeof (targetElm) === 'string') {
      var targetElement = document.querySelector(targetElm);

      if (targetElement) {
        return new IntroJs(targetElement);
      } else {
        throw new Error('There is no element with given selector.');
      }
    } else {
      return new IntroJs(document.body);
    }
  };

  introJs.version = VERSION;

  introJs.fn = IntroJs.prototype = {
    clone: function () {
      return new IntroJs(this);
    },
    setOption: function(option, value) {
      this._options[option] = value;
      return this;
    },
    setOptions: function(options) {
      this._options = _mergeOptions(this._options, options);
      return this;
    },
    start: function () {
      _introForElement.call(this, this._targetElement);
      return this;
    },
    goToStep: function(step) {
      _goToStep.call(this, step);
      return this;
    },
    addStep: function(options) {
      if (!this._options.steps) {
        this._options.steps = [];
      }

      this._options.steps.push(options);

      return this;
    },
    addSteps: function(steps) {
      if (!steps.length) return;

      for(var index = 0; index < steps.length; index++) {
        this.addStep(steps[index]);
      }

      return this;
    },
    goToStepNumber: function(step) {
      _goToStepNumber.call(this, step);

      return this;
    },
    nextStep: function() {
      _nextStep.call(this);
      return this;
    },
    previousStep: function() {
      _previousStep.call(this);
      return this;
    },
    exit: function(force) {
      _exitIntro.call(this, this._targetElement, force);
      return this;
    },
    refresh: function() {
      _refresh.call(this);
      return this;
    },
    onbeforechange: function(providedCallback) {
      if (typeof (providedCallback) === 'function') {
        this._introBeforeChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onbeforechange was not a function');
      }
      return this;
    },
    onchange: function(providedCallback) {
      if (typeof (providedCallback) === 'function') {
        this._introChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onchange was not a function.');
      }
      return this;
    },
    onafterchange: function(providedCallback) {
      if (typeof (providedCallback) === 'function') {
        this._introAfterChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onafterchange was not a function');
      }
      return this;
    },
    oncomplete: function(providedCallback) {
      if (typeof (providedCallback) === 'function') {
        this._introCompleteCallback = providedCallback;
      } else {
        throw new Error('Provided callback for oncomplete was not a function.');
      }
      return this;
    },
    onhintsadded: function(providedCallback) {
      if (typeof (providedCallback) === 'function') {
        this._hintsAddedCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onhintsadded was not a function.');
      }
      return this;
    },
    onhintclick: function(providedCallback) {
      if (typeof (providedCallback) === 'function') {
        this._hintClickCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onhintclick was not a function.');
      }
      return this;
    },
    onhintclose: function(providedCallback) {
      if (typeof (providedCallback) === 'function') {
        this._hintCloseCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onhintclose was not a function.');
      }
      return this;
    },
    onexit: function(providedCallback) {
      if (typeof (providedCallback) === 'function') {
        this._introExitCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onexit was not a function.');
      }
      return this;
    },
    onbeforeexit: function(providedCallback) {
      if (typeof (providedCallback) === 'function') {
        this._introBeforeExitCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onbeforeexit was not a function.');
      }
      return this;
    },
    addHints: function() {
      _populateHints.call(this, this._targetElement);
      return this;
    },
    hideHint: function (stepId) {
      _hideHint.call(this, stepId);
      return this;
    },
    hideHints: function () {
      _hideHints.call(this);
      return this;
    },
    showHint: function (stepId) {
      _showHint.call(this, stepId);
      return this;
    },
    showHints: function () {
      _showHints.call(this);
      return this;
    },
    removeHints: function () {
      _removeHints.call(this);
      return this;
    },
    removeHint: function (stepId) {
      _removeHint.call(this, stepId);
      return this;
    },
    showHintDialog: function (stepId) {
      _showHintDialog.call(this, stepId);
      return this;
    }
  };

  exports.introJs = introJs;
  return introJs;
}));
