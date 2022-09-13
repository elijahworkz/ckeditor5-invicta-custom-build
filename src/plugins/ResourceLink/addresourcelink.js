import Command from '@ckeditor/ckeditor5-core/src/command';

import { toMap } from 'ckeditor5/src/utils';

export default class AddResourceLink extends Command {
	
	constructor(editor) {
		super(editor)
	}
	
	execute({resource_url, resource_title}) {
		const model = this.editor.model
		const selection = model.document.selection
		
		
		model.change(writer => {
			
			if (selection.isCollapsed) {
				const position = selection.getFirstPosition()
	
				const attributes = toMap(selection.getAttributes())
				
				attributes.set('linkHref', resource_url)
			
				const { end: positionAfter } = model.insertContent(
					writer.createText(resource_title, attributes), position)
			
				writer.setSelection(positionAfter)
				
				writer.removeSelectionAttribute('linkHref')
			
			} else {
				const ranges = model.schema.getValidRanges(selection.getRanges(), 'linkHref')
				console.log(selection.getRanges(), ranges)
				
				const allowedRanges = []
				
				for (const element of selection.getSelectedBlocks()) {
					if (model.schema.checkAttribute(element, 'linkHref')) {
						allowedRanges.push(writer.createRangeOn(element))
					}
				}
				
				const rangesToUpdate = allowedRanges.slice()
				
				for (const range of ranges) {
					if (this._isRangeToUpdate(range, allowedRanges)) {
						rangesToUpdate.push(range)
					}
				}
				
				for (const range of rangesToUpdate) {
					writer.setAttribute('linkHref', resource_url, range)
				}				
			}
		})
	}
	
	_isRangeToUpdate( range, allowedRanges ) {
		for ( const allowedRange of allowedRanges ) {
			// A range is inside an element that will have the `linkHref` attribute. Do not modify its nodes.
			if ( allowedRange.containsRange( range ) ) {
				return false;
			}
		}

		return true;
	}
}