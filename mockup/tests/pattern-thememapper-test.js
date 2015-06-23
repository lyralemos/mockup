define([
  'expect',
  'sinon',
  'jquery',
  'pat-registry',
  'mockup-patterns-thememapper',
], function(expect, sinon, $, registry, RuleBuilderView ) {
  'use strict';

  window.mocha.setup('bdd');
  $.fx.off = true;

/* ==========================
   TEST: Thememapper
  ========================== */

  describe('Thememapper', function () {

    beforeEach(function() {
      this.$el = $('' +
        '<div>' +
        '  <div class="pat-thememapper"' +
        ' data-pat-thememapper=\'filemanagerConfig:{"actionUrl":"/filemanager-actions"}; ' +
        ' themeUrl: "/theme_url";\'>'  +
        '  </div>' +
        '</div>').appendTo('body');
    });
    afterEach(function() {
      this.$el.remove();
    });

    it('Setup components', function() {
      expect($('.pat-filemanager', this.$el).length > 0).to.be.equal(false);
      // initialize pattern
      registry.scan(this.$el);

      this.clock = sinon.useFakeTimers();
      this.clock.tick(1000);
      expect($('.pat-filemanager', this.$el).length > 0).to.be.equal(true);
      expect($('#mapper', this.$el).length > 0).to.be.equal(true);
      expect($('#showinspectors', this.$el).length > 0).to.be.equal(true);
      expect($('#buildrule', this.$el).length > 0).to.be.equal(true);
      expect($('#previewtheme', this.$el).length > 0).to.be.equal(true);
      expect($('#fullscreenEditor', this.$el).length > 0).to.be.equal(true);
      expect($('#helpbutton', this.$el).length > 0).to.be.equal(true);
      expect($('#inspectors', this.$el).length > 0).to.be.equal(true);
      expect($('.container', this.$el).length > 0).to.be.equal(true);

      //This one is added after clicking the "fullscreen" button
      expect($('.closeeditor', this.$el).length === 0).to.be.equal(true);
    });

    it('Test buttons', function() {
      registry.scan(this.$el);

      this.clock = sinon.useFakeTimers();
      this.clock.tick(1000);

      expect($('.closeeditor', this.$el).length === 0).to.be.equal(true);
      expect($('.container', this.$el).hasClass('fullscreen')).to.be.equal(false);
      $('#fullscreenEditor', this.$el).click();
      expect($('.container', this.$el).hasClass('fullscreen')).to.be.equal(true);
      expect($('.closeeditor', this.$el).length > 0).to.be.equal(true);

      $('.closeeditor', this.$el).click();
      expect($('.container', this.$el).hasClass('fullscreen')).to.be.equal(false);
      expect($('.closeeditor', this.$el).length === 0).to.be.equal(true);

      expect($('#inspectors', this.$el).is(':visible')).to.be.equal(false);
      $('#showinspectors', this.$el).click();
      expect($('#inspectors', this.$el).is(':visible')).to.be.equal(true);
      $('#showinspectors', this.$el).click();
      expect($('#inspectors', this.$el).is(':visible')).to.be.equal(false);
    });
  });
});
