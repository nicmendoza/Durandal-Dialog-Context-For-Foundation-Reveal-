Durandal-Dialog-Context-For-Foundation-Reveal-
==============================================

A dialog context for Durandal that opens up a Foundation Reveal modal dialog.

Add the optional class "autoclose" to your dialog view to close when the blockout is clicked or when the escape key is pressed

Usage Example
=============

	// This will show a dialog in the reveal context.

    dialog.show('dialogs/myDialog',{setting: 'value'}, 'reveal');

    // OR

    dialog.showReveal('dialogs/myDialog',{setting: 'value'});

 The above will work, assuming you are using Durandal, that your dialog is in the "dialogs" directory usign standard location conventions, and that you have Foundation Reveal's js and css set up properly