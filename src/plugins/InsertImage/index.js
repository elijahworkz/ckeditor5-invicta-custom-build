import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class InsertImage extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add('insertImage', () => {
			const button = new ButtonView();

			button.set({
				label: 'Insert image',
				icon: imageIcon,
				tooltip: true
			});

			// Callback executed once the image is clicked.
			button.on('execute', () => {

				editor.model.change(writer => {

					if (typeof window.Invicta !== 'undefined') {
						Invicta.emit('ckeditor-insert-image');
					}
					
					// For local dev
					// document.dispatchEvent(new Event('ckeditor-insert-image'))

					document.addEventListener('ckeditor-image-selected', (e) => {
						
						
						const imageElement = writer.createElement('imageBlock', {
							src: e.detail.image_url,
							alt: e.detail.image_alt
						});

						editor.model.insertContent(imageElement, editor.model.document.selection);

					}, false);

				});

			});

			return button;
		});
	}
}