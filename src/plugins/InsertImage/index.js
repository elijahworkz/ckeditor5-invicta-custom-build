import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import SelectImage from './selectimage';
import InsertImageCommand from './insertimage';

export default class InsertImage extends Plugin {
	init() {
		const editor = this.editor;
		
		editor.commands.add( 'invictaSelectImage', new SelectImage( editor ) );
		editor.commands.add( 'invictaInsertImage', new InsertImageCommand( editor ) );

		editor.ui.componentFactory.add('insertImage', () => {
			const button = new ButtonView();

			button.set({
				label: 'Insert Image',
				icon: imageIcon,
				tooltip: true
			});

			// Callback executed once the image is clicked.
			button.on('execute', () => editor.execute('triggerImageSelector'));

			return button;
		});
	}
}