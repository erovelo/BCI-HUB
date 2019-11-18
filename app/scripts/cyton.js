//const fs = require('fs'); // Para escribir en archivos
const Cyton = require('@openbci/cyton');
const ourBoard = new Cyton();
let streamCallback = undefined;

/**
 * Devuelve un array con los dispositivos OpenBCI conectados al ordenador
 * @param {function} callback
 */
function CytonGetPorts(callback) {
    ourBoard.listPorts().then(allPorts => {
        if(allPorts){
            console.log(allPorts);
            // Obtenemos puertos que tengan un puerto valido
            const ports = allPorts.filter(p => p.serialNumber != undefined);
            if(callback != undefined) callback(ports);
        }
    })
}

/**
 * @returns {boolean} Si está conectado a un dispositivo o emulador, devuelve true
 */
function CytonIsConnected() {
    return ourBoard.isConnected();
}

// Devuelve si está transmitiendo Cyton
function CytonIsStreaming() {
    return ourBoard.isStreaming();
}

// Devuelve si está simulando a la tarjeta Cyton
function CytonIsSimulating(){
    return ourBoard.isSimulating();
}

function CytonGetNumberOfChannels() {
    return ourBoard.numberOfChannels();
}

// Se conecta a la tarjeta Cyton
function CytonConnect(portName, onSample, callback){
    ourBoard.connect(portName).then(() => {
        if(onSample != undefined) {
            ourBoard.on('sample', onSample);
            streamCallback = onSample;
        }
        if(callback != undefined) callback(ourBoard.isConnected());
    });
}

function CytonStartStreaming(callback) {
    ourBoard.streamStart();
    ourBoard.on('sample', streamCallback);
    
    if(callback != undefined) callback(ourBoard.isStreaming());
}

function CytonStopStreaming(callback) {
    ourBoard.streamStop();
    if(callback != undefined) callback(!ourBoard.isStreaming());
}

function CytonDisconnect(callback) {
    ourBoard.disconnect().then(() => {
        if(callback != undefined) callback(!ourBoard.isConnected());        
    })
}