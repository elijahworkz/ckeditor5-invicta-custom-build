import Command from '@ckeditor/ckeditor5-core/src/command';

export default class SelectResourceLink extends Command {
	
	execute() {
		
		if (typeof window.Invicta !== 'undefined') {
			Invicta.emit('ckeditor-insert-link');
		}
		
		// For dev purposes
		//document.dispatchEvent(new Event('ckeditor-insert-link'))
		
	}
}