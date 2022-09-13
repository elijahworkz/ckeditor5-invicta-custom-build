import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import TriggerSelector from './triggerselector';
import InsertImageCommand from './insertimage';

export default class InsertImage extends Plugin {
	init() {
		const editor = this.editor;
		
		editor.commands.add( 'triggerImageSelector', new TriggerSelector( editor ) );
		editor.commands.add( 'insertImage', new InsertImageCommand( editor ) );

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