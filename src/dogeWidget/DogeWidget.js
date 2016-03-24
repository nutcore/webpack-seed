import $ from 'jquery';
import './style.scss';
import template from './template.html';

export default class DogeWidget {

    constructor() {}

    render(node) {
        $(node).append(template);
    }

}
