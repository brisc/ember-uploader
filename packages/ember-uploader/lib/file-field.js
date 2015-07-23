var deprecate = Ember.deprecate;
var set = Ember.set;
var on = Ember.on;

export default Ember.TextField.extend(Ember.Evented, {
  type: 'file',
  attributeBindings: ['multiple'],
  multiple: false,
  change: function(e) {
    var input = e.target;
    var files = Ember.$.extend(true, {}, input.files);
    if (!Ember.isEmpty(files)) {
      this.trigger('filesDidChange', files);
      set(this, 'files', files); // to be removed in future release, needed for `files` observer to continue working
    }
    // reset input
    input.value = null;
    return false;
  },

  _deprecateFileObserver: on('init', function() {
    var hasFilesObserver = this.hasObserverFor('files');

    deprecate('Observing the `files` attr is deprecated, use `filesDidChange` instead.', !hasFilesObserver);
  })
});
