import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertImageCommand extends Command {
	
	constructor(editor) {
		super(editor)
	}
	
	execute({image_url, image_alt}) {
		const model = this.editor.model
		const selection = model.document.selection
		
		
		model.change(writer => {
			
			const imageElement = writer.createElement('imageBlock', {
				src: image_url,
				alt: image_alt
			});

			editor.model.insertContent(imageElement, selection);

		})
	}
}