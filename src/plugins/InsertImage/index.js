import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class InsertImage extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add('insertImage', locale => {
			const view = new ButtonView(locale);

			view.set({
				label: 'Insert image',
				icon: imageIcon,
				tooltip: true
			});

			// Callback executed once the image is clicked.
			view.on('execute', () => {

				editor.model.change(writer => {

					if (typeof window.lpm !== 'undefined') {
						lpm.$bus.$emit('ckeditor-insert-image');
					}

					document.addEventListener('ckeditor-image-selected', (e) => {

						const imageElement = writer.createElement('image', {
							src: e.detail.image_url
						});

						editor.model.insertContent(imageElement, editor.model.document.selection);

					}, false);

				});

			});

			return view;
		});
	}
}