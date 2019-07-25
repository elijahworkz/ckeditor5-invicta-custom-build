import Command from '@ckeditor/ckeditor5-core/src/command'

export class InsertAudioBoxCommand extends Command {
	execute() {
		this.editor.model.change(writer => {

			if (typeof window.lpm !== 'undefined') {
				lpm.$bus.$emit('ckeditor-insert-image');
			}

			document.dispatchEvent(new Event('ckeditor-insert-audio'));

			document.addEventListener('ckeditor-audio-selected', (e) => {
				this.editor.model.change(writer => {
					let audioid = 'audio' + Math.random();
					const audioBox = writer.createElement('audioBox', {
						'data-audio': audioid
					})
					const audio = writer.createElement('audio', {
						id: audioid,
						src: e.detail,
						type: 'audio/mpeg'
					})


					const imageElement = writer.createElement('image', {
						src: 'https://lp.rosenhebrewschool.com/Content/images/Audio_icon.png'
					})
					const textElement = writer.createElement('paragraph', { class: 'text'})

					writer.append(imageElement, audioBox)
					writer.append(textElement, audioBox)
					writer.appendText('Enter your text here', textElement)
					writer.append(audio, audioBox)

					this.editor.model.insertContent(audioBox, this.editor.model.document.selection)
				})
			}, false);
		})
	}

	refresh() {
		const model = this.editor.model
		const selection = model.document.selection
		const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'audioBox')

		this.isEnabled = allowedIn !== null
	}
}