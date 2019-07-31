import InsertAudioEditing from './insertaudioediting'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

import AudioIcon from './play-circle.svg'

export default class InsertAudio extends Plugin {
	static get requires() {
		return [InsertAudioEditing]
	}
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add('insertAudio', locale => {
			const view = new ButtonView(locale);

			view.set({
				label: 'Insert Audio Button',
				icon: AudioIcon,
				tooltip: true
			});

			// Callback executed once the image is clicked.
			view.on('execute', () => {


				if (typeof window.lpm !== 'undefined') {
					lpm.$bus.$emit('ckeditor-insert-audio');
				}
				// document.dispatchEvent(new Event('ckeditor-insert-audio'));

				document.addEventListener('ckeditor-audio-selected', (e) => {
					editor.model.change(writer => {
						let audioid = 'audio' + Math.random();
						const audioBox = writer.createElement('audioBox', {
							'data-audio': audioid
						})
						const audioButton = writer.createElement('audioButton', {
							class: 'button-wrap'
						})
						const audio = writer.createElement('audio', {
							id: audioid,
							src: e.detail.media_url,
							type: 'audio/mpeg'
						})

						const imageElement = writer.createElement('image', {
							src: e.detail.icon
						})
						writer.append(imageElement, audioButton)

						const textElement = writer.createElement('paragraph', {
							class: 'text'
						})

						writer.append(audioButton, audioBox)
						writer.append(audio, audioBox)

						writer.append(textElement, audioButton)
						writer.appendText('Enter your text here', textElement)

						editor.model.insertContent(audioBox, editor.model.document.selection)

					});
				}, false);


			});


			return view;
		});
	}
}