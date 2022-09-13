import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import LinkIcon from './link-icon.svg';
import AddResourceLink from './addresourcelink'
import TriggerSelector from './triggerselector'

export default class ResourceLinkUi extends Plugin {
	
	init() {
		const editor = this.editor
		
		editor.commands.add( 'triggerResourceSelector', new TriggerSelector( editor ) );
		editor.commands.add( 'addResourceLink', new AddResourceLink( editor ) );
		
		editor.ui.componentFactory.add('resourceLink', () => {
			const button = new ButtonView();
			
			button.set({
				label: 'Insert resource link',
				icon: LinkIcon,
				tooltip: true
			});
			
			this.listenTo(button, 'execute', () => editor.execute('triggerResourceSelector'))
			
			return button;
		})
	}
}