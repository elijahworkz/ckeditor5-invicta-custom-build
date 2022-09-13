import Command from '@ckeditor/ckeditor5-core/src/command';

export default class TriggerSelector extends Command {
	
	execute() {
		
		if (typeof window.Invicta !== 'undefined') {
			Invicta.emit('ckeditor-insert-image');
		}
		
		// For dev purposes
		// document.dispatchEvent(new Event('ckeditor-insert-image'))
		
	}
}