'use strict';

var React = require('react');

//editors
var numEditor = require('../editors/NumberInputEditor');
var BoolEditor = require('../editors/BoolEditor');
var JsonEditor = require('../editors/DocEditor');
var colorEditor = require('../editors/ColorPickerEditor');
var dropDownEditor = require('../editors/DropDownEditor');
var htmlEditor = require('../editors/HtmlEditor');

//external widgets with more controls
var ReactBootstrap = require('react-bootstrap');
var rd3 = require('react-d3');
var Griddle = require('griddle-react');

var WidgetFactory = (function () {

    var widgets = {
        'TextBoxInput': require('../widgets/TextBoxInput'),
        'CheckBoxInput': require('../widgets/CheckBoxInput'),
        'TextBox': require('../widgets/TextBox'),
        'ValueBox': require('../widgets/ValueBox'),
        'HtmlBox':require('../widgets/HtmlRenderer'),
        'ImageBox':require('../widgets/ImageBox'),
        'TinyMceEditor':require('../widgets/HtmlRenderer'),
        'React.Griddle':Griddle,
        'react-inlinesvg':require('react-inlinesvg')
        //'SnapSvgBox':require('../widgets/SnapSvgBox')
        //'Reacticon':Reacticon
    }

    var bootstrapWidgets =['Input','Button', 'Panel','Glyphicon','Tooltip'];
    _.each(bootstrapWidgets,function(widgetName){
        var name = 'ReactBootstrap.' + widgetName;
        widgets[name] = ReactBootstrap[widgetName];
    });

    _.each(['LineChart','BarChart','AreaChart','Treemap','PieChart','ScatterChart','CandleStickChart'], function(name){
        widgets['ReactD3.' + name] = rd3[name];
    });

    var getProperties = function() {

        var styleProps = {
            name: 'style',
            items: [
                {name: 'top',editor:numEditor},
                {name: 'left',editor:numEditor}]
        };
        var sizeProps = [
            {name: 'width', editor:numEditor},
            {name: 'height', editor:numEditor},
        ];

        var fontProps = {
            name: 'font',
            items: [
                {name: 'name'},
                {name: 'color', editor:colorEditor},
                {name: 'size', editor:numEditor},
                {name: 'bold', editor: BoolEditor},
                {name: 'italic', editor: BoolEditor},
                {name: 'underline', editor: BoolEditor}
            ]
        }

        var commonProps = [{name: 'name'},styleProps];
        var commonPropsSizes = [{name: 'name'},{
            name: 'style',
            items: styleProps.items.concat(sizeProps)
        }];

        var glyphs = ['asterisk','plus','euro','eur','minus'];
        var placement = ['left','right','bottom','top'];
        var typeOptions = ['text','table','image','code','slides'];
        var bsStyles = ['default','primary','success','info','warning','danger'];
        var bsSizes = ['large','medium','small','xsmall']
        return {
            'Container':commonPropsSizes,
            'Repeater':commonPropsSizes.concat([{name:'Binding'}]),
            'CheckBoxInput':commonProps.concat([{name: 'checked',label: 'DefaultChecked', editor:numEditor},{name:'label', args:{defaultValue:'Label'}},{name:'Binding'}]),
            'TextBoxInput': commonProps.concat([{name:'value',label:'DefaultValue'},{name:'label',args:{defaultValue:'Label'}},{name:'Binding'}]),
            'TextBox': commonProps.concat([{name:'content', args:{defaultValue:'Type your text'}},fontProps]),
            'ValueBox':commonProps.concat([{name:'emptyValue',args:{defaultValue:'---'}},{name:'Binding'},fontProps]),
            'ImageBox':commonProps.concat([{name:'url',args:{defaultValue:'https://raw.githubusercontent.com/rsamec/business-rules-engine/master/form_logo.jpg'}},{name:'width',editor:numEditor},{name:'height',editor: numEditor}]),
            'ReactD3.LineChart':commonProps.concat([{name:'data',editor:JsonEditor},{name:'width',editor:numEditor},{name:'height',editor: numEditor},{name:'title'}]),
            'ReactD3.ScatterChart':commonProps.concat([{name:'data',editor:JsonEditor},{name:'width',editor:numEditor},{name:'height',editor: numEditor},{name:'title'}]),
            'ReactD3.BarChart':commonProps.concat([{name:'data',editor:JsonEditor},{name:'width',editor:numEditor},{name:'height',editor: numEditor},{name:'title'}]),
            'ReactD3.AreaChart':commonProps.concat([{name:'data',editor:JsonEditor},{name:'width',editor:numEditor},{name:'height',editor: numEditor},{name:'title'}]),
            'ReactD3.PieChart':commonProps.concat([{name:'data',editor:JsonEditor},{name:'width',editor:numEditor},{name:'height',editor: numEditor},{name:'title'}]),
            'ReactD3.Treemap':commonProps.concat([{name:'data',editor:JsonEditor},{name:'width',editor:numEditor},{name:'height',editor: numEditor},{name:'title'}]),
            'HtmlBox':commonProps.concat([{name:'content',label:'Html', editor:htmlEditor,args:{defaultValue:'Type your content'}},{name:'columnCount',editor:numEditor}]),
            'TinyMceEditor':commonProps.concat([{name:'content',label:'Html', editor:htmlEditor},{name:'columnCount',editor:numEditor}]),
            'React.Griddle':commonProps.concat([{name:'showFilter',editor: BoolEditor},{name:'showSettings',editor: BoolEditor},{name:'Binding'},{name:'results',editor:JsonEditor}]),
            'ReactBootstrap.Button':commonProps.concat([{name:'bsStyle',editor:dropDownEditor, args:{options:bsStyles.map(function(g){ return {value:g,label:g}}),defaultValue:'primary'}},{name:'bsSize',editor:dropDownEditor, args:{options:bsSizes.map(function(g){ return {value:g,label:g}}),defaultValue:'medium'}},{name:'content',args:{defaultValue:'button'}}]),
            'ReactBootstrap.Input': commonProps.concat([{name:'type',args:{defaultValue:'text'}},{name:'placeholder',args:{defaultValue:'type your text'}},{name:'label',args:{defaultValue:'Label'}},{name:'help'},{name:'value'},{name:'Binding'}]),
            'ReactBootstrap.Panel': commonProps.concat([ {name:'number'}, {name:'header',args:{defaultValue:'Header'}}, {name:'content',args:{defaultValue:'type your content'}}]),
            'ReactBootstrap.Glyphicon':commonProps.concat([{name:'glyph',editor:dropDownEditor, args:{options:glyphs.map(function(g){ return {value:g,label:g}}),defaultValue:'asterisk'}}]),
            'ReactBootstrap.Tooltip':commonProps.concat([{name:'placement', editor:dropDownEditor,args:{options:placement.map(function(x) {return {value:x,label:x}})}}, {name:'positionLeft',editor:numEditor}, {name:'positionTop',editor:numEditor}, {name:'arrowOffsetLeft',editor:numEditor},{name:'arrowOffsetTop',editor:numEditor},{name:'content'}]),
            'react-inlinesvg':commonProps.concat([{name: 'src',args:{defaultValue:'http://upload.wikimedia.org/wikipedia/commons/8/8a/Bicycle_diagram-en.svg'}}])
            //'SnapSvgBox':commonPropsSizes.concat([{name:'width',editor:numEditor},{name:'height',editor: numEditor},{name:'headline'},{name:'htmlRibbonText'},{name:'cssRibbonText'},{name:'jsRibbonText'}]),
            //'Reacticon':commonProps.concat([{name: 'height', editor:numEditor},{name: 'width', editor:numEditor},{name: 'type', editor:dropDownEditor,options:typeOptions.map(function(g){ return {value:g,label:g}})},{name:'label'}, {name: 'bgColor', editor:colorEditor}, {name: 'primaryColor', editor:colorEditor},{name: 'strokeColor', editor:colorEditor},{name:'animate', editor:BoolEditor},{name:'progress', editor:BoolEditor},{name:'isProcessing', editor:BoolEditor}]),
        }
    }

    var properties = getProperties();

    return {
        getWidgetProperties: function(name){
            var result = properties[name];
            return result!==undefined?result:[];
        },
        getWidgets:function(){
            return widgets;
        }
    }

})();

module.exports = WidgetFactory;