import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import {
	toWidget,
	toWidgetEditable
} from '@ckeditor/ckeditor5-widget/src/utils'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'
import {
	InsertAudioBoxCommand
} from './insertaudiocommand'

export default class InsertAudioEditing extends Plugin {

	static get requires() {
		return [Widget]
	}

	init() {
		this._defineSchema()
		this._defineConverters()

		// this.editor.commands.add('insertAudioBox', new InsertAudioBoxCommand(this.editor))
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register('audioBox', {
			isObject: true,
			allowWhere: '$block',
			allowAttributes: ['data-audio'],
		})
		
		schema.register('audioButton', {
			isLimit: true,
			allowIn: 'audioBox',
			allowContentOf: '$root'
		})

		schema.register('audio', {
			allowIn: 'audioBox',
			allowAttributes: ['id', 'src', 'type'],
			isBlock: true,
			isObject: true
		})

		schema.addChildCheck((context, childDefinition) => {
			if (context.endsWith('audioBox') && childDefinition.name == 'audioBox') {
				return false
			}
		})
	}

	_defineConverters() {
		const conversion = this.editor.conversion

		conversion.for('upcast').elementToElement({
			model: 'audioBox',
			view: {
				name: 'div',
				classes: 'audio-button'
			}
		})

		conversion.for('dataDowncast').elementToElement({
			model: 'audioBox',
			view: {
				name: 'div',
				classes: 'audio-button'
			}
		})

		conversion.for('editingDowncast').elementToElement({
			model: 'audioBox',
			view: (modelElement, { writer: viewWriter }) => {

				const section = viewWriter.createContainerElement('div', { class: 'audio-button'})

				return toWidget(section, viewWriter, {
					label: 'Audio widget',
					hasSelectionHandler: true
				})
			}
		})

		conversion.for('upcast').elementToElement({
			model: 'audioButton',
			view: {
				name: 'div',
				classes: 'button-wrap'
			}
		})

		conversion.for('dataDowncast').elementToElement({
			model: 'audioButton',
			view: {
				name: 'div',
				classes: 'button-wrap'
			}
		})

		conversion.for('editingDowncast').elementToElement({
			model: 'audioButton',
			view: (modelElement, { writer: viewWriter }) => {

				const section = viewWriter.createEditableElement('div', {class:'button-wrap'})

				return toWidgetEditable(section, viewWriter, {
					label: 'Audio button widget'
				})
			}
		})

		conversion.elementToElement({
			model: 'audio',
			view: {
				name: 'audio'
			}
		})

		let attrkeys = ['data-audio', 'id', 'src', 'type']

		for (let a = 0; a < attrkeys.length; a++) {
			conversion.for('downcast').attributeToAttribute(({
				model: attrkeys[a],
				view: attrkeys[a],
				converterPriority: 'low'
			}));
			conversion.for('upcast').attributeToAttribute({
				view: attrkeys[a],
				model: attrkeys[a],
				converterPriority: 'low'
			});
		}

	}
}