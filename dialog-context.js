define(['plugins/dialog','jquery','foundation'], function(dialog,$,Foundation) {
	var initialFoundationRevealSettings = {};

// this is just a copy of the default dialog, made to work with foundation
dialog.addContext('reveal', {
		removeDelay: 200,
		/**
		 * In this function, you are expected to add a DOM element to the tree which will serve as the "host" for the modal's composed view. You must add a property called host to the modalWindow object which references the dom element. It is this host which is passed to the composition module.
		 * @method addHost
		 * @param {Dialog} theDialog The dialog model.
		 */
		addHost: function(theDialog) {
			var body = $('body');

			var host = $('<div class="reveal-modal medium" data-reveal></div>')
				.css({
					'z-index': dialog.getNextZIndex()
				})
				.appendTo(body);

			theDialog.host = host.get(0);

			// This will probably create problems with nested modals
			// or dialogs
			$(document).on('close', '[data-reveal]', function removeHost(){
				$(document).off('close', removeHost);

				// This is to prevent the node from being removed before the
				// animation completes
				setTimeout(function(){
					ko.removeNode(theDialog.host);
				}, 500);
			});

		},
		/**
		 * This function is expected to remove any DOM machinery associated with the specified dialog and do any other necessary cleanup.
		 * @method removeHost
		 * @param {Dialog} theDialog The dialog model.
		 */
		removeHost: function(theDialog) {
			$(theDialog.host).foundation('reveal','close');

			// Restore original Foundation reveal settings changed in compositionComplete
			$.extend(Foundation.libs.reveal.settings, initialFoundationRevealSettings);
		},
		attached: function(view) {

			//To prevent flickering in IE8, we set visibility to hidden first, and later restore it
			//$(view).css("visibility", "hidden");
		},
		/**
		 * This function is called after the modal is fully composed into the DOM, allowing your implementation to do any final modifications, such as positioning or animation. You can obtain the original dialog object by using `getDialog` on context.model.
		 * @method compositionComplete
		 * @param {DOMElement} child The dialog view.
		 * @param {DOMElement} parent The parent view.
		 * @param {object} context The composition context.
		 */
		compositionComplete: function(child, parent, context) {
			var revealSettings = context.model.revealSettings;

			// Modify Foundations reveal settings
			if(revealSettings){
				$.each(revealSettings, function(prop, value){
					initialFoundationRevealSettings[prop] = Foundation.libs.reveal.settings[prop];
				});

				$.extend(Foundation.libs.reveal.settings, revealSettings);
			}

			$(parent).foundation('reveal', 'open');
		}
	});
	return;
});