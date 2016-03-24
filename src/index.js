/*global require*/

import $ from 'jquery';

require.ensure([], () => {
    var GrumpyCatWidget = require('./grumpyCatWidget/GrumpyCatWidget.js').default;
    new GrumpyCatWidget().render($('body'));
},'grumpyChunk');

require.ensure([], () => {
    var DogeWidget = require('./dogeWidget/DogeWidget.js').default;
    new DogeWidget().render($('body'));
},'dogeChunk');
