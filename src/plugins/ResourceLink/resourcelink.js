import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

import ResourceLinkCommand from './addresourcelink'
import ResourceLinkUi from './resourcelinkui'

export default class ResourceLink extends Plugin {
	static get requires() {
		return [ResourceLinkUi]
	}
	

}