define(['plugins/dialog','jquery','foundation'], function(dialog,$,Foundation) {

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
			var blockout = $('<div class="reveal-modal-bg"></div>')
				.css({
					'z-index': dialog.getNextZIndex(),
					'display' : 'block'
				})
				.appendTo(body);

			var host = $('<div class="reveal-modal"></div>')
				.css({
					'z-index': dialog.getNextZIndex()
				})
				.appendTo(body);

			theDialog.host = host.get(0);
			theDialog.blockout = blockout.get(0);


			// escape key
			$(window).on('keyup', function(e) {
				if(e.keyCode === 27 && $(theDialog.host).find('.autoclose').length){
					theDialog.close();
				}
			});

			$('body').on('click', theDialog.blockout, function(e) {
				if (e.target === theDialog.blockout && $(theDialog.host).find('.autoclose').length ) {
					theDialog.close();
				}
			});

		},
		/**
		 * This function is expected to remove any DOM machinery associated with the specified dialog and do any other necessary cleanup.
		 * @method removeHost
		 * @param {Dialog} theDialog The dialog model.
		 */
		removeHost: function(theDialog) {

			Foundation.libs.reveal.close(theDialog.host);

			setTimeout(function() {
				ko.removeNode(theDialog.host);
				ko.removeNode(theDialog.blockout);
			}, this.removeDelay);
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
			$(parent).foundation('reveal', 'open');
		}
	});
	return;
});