import { Spinner } from 'spin.js';
import './styles.css';

const opts = {
    lines: 15, // The number of lines 
    length: 20, // The length of line
    width: 4, // The line thickness
    radius: 15, // The radius of the circle
    scale: 1.95, // Scales overall size of the spinner
    corners: 0.4, // Corner roundness (0..1)
    speed: 1.9, // Rounds per second
    rotate: 0, // The rotation offset
    // animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    // animation: 'spinner-line-fade-quick', // The CSS animation 
    direction: 2, // 1: clockwise, -1: counterclockwise
    color: '#f36c12', // CSS color 
    fadeColor: 'transparent', // CSS color or array of colors
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 10000, // The z-index 
    className: 'spinner', // The CSS class of spinner
    position: 'absolute', // Element positioning
};

const target = document.querySelector('#spin');

const spinner = new Spinner(opts);
const startSpin = () => spinner.spin(target);
const stopSpin = () => spinner.stop();

export { startSpin, stopSpin };

