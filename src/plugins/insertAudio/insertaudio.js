import InsertAudioEditing from './insertaudioediting'
import InsertAudioUI from './insertaudioui'

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default class InsertAudio extends Plugin {
	static get requires() {
		return [InsertAudioEditing, InsertAudioUI]
	}
}