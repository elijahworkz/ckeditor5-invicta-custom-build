import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

import InsertImage from './plugins/InsertImage'
import ResourceLink from './plugins/ResourceLink/resourcelink';
// import InsertAudio from './plugins/insertAudio/insertaudio'


export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
	Underline,
	BlockQuote,
	Heading,
	InsertImage,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	MediaEmbed,
	// InsertAudio,
	Link,
	ResourceLink,
	List,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	Font,
	Alignment,
	SourceEditing,
	RemoveFormat,
	Superscript,
	Subscript
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'undo',
			'|',
			'heading',
			'|',
			'bold',
			'italic',
            'underline',
			'fontColor',
			'fontSize',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'|',
			'alignment',
			'link',
			'|',
			'insertImage',
			'resourceLink',
			'|',
			'mediaEmbed',
			'insertTable',
			'|',
			'subscript',
			'superscript',
			'removeFormat',
			'sourceEditing'
		]
	},
	image: {
		toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:block', 'imageStyle:alignRight'],
		styles: [
			'full',
			'alignLeft',
			'alignRight'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	link: {
		addTargetToExternalLinks: true,
		decorators: {
			openInNewTab: {
				mode: 'manual',
				label: 'Open in a new tab',
				attributes: {
					target: '_blank',
					rel: 'noopener noreferrer'
				}
			}
		}
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};