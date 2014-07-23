Durandal Dialog Context For Foundation Reveal
==============================================

A dialog context for Durandal that opens up a Foundation Reveal modal dialog. Use Foundation settings to control all aspects of the Reveal dialog as usual.

Usage Example
=============

This will show a dialog in the reveal context.

    dialog.show('dialogs/myDialog',{setting: 'value'}, 'reveal');

OR

    dialog.showReveal('dialogs/myDialog',{setting: 'value'});

The above will work, assuming you are using Durandal, that your dialog is in the "dialogs" directory usign standard location conventions, and that you have Foundation Reveal's js and css set up properly

An example dialog view (hypothetically located at dialogs/myDialog.html):

    <div class="autoclose">
    	<a class="close-reveal-modal">&#215;</a>
    	I am a modal dialog!
    </div>
