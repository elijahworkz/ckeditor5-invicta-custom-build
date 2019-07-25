import Plugin from  '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import AudioIcon from './play-circle.svg'

export default class InsertAudioUI extends Plugin {
	init() {

		const editor = this.editor
		const t = editor.t
		
		editor.ui.componentFactory.add('insertAudio', locale => {
			const command = editor.commands.get('insertAudioBox')

			const buttonView = new ButtonView(locale)

			buttonView.set({
				label: t('Audio Button'),
				icon: AudioIcon,
				tooltip: true
			})

			buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

			this.listenTo(buttonView, 'execute', () => editor.execute('insertAudioBox'))
				

			return buttonView;
		})
	}
}