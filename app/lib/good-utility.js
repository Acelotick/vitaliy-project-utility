/*
 * MIT License
 * Copyright (c) [2024] [Vitaliy Karpov]
 */

const fs = require('fs');
const { join } = require('path')
const zlib = require('zlib')
const qr = require('qr-image')

//-------------------------
// Ascii Coder
//-------------------------

class AsciiCoder {
    decode = (any) => String.fromCharCode(...any.split(' '));
    encode = (txt) => Array.from(txt, char => char.charCodeAt(0)).join(' ');
}; exports.AsciiCoder = new AsciiCoder()

//-------------------------
// Custom Coder
//-------------------------

class CustomCoder {
    constructor(unicode) {
        this.list = unicode === undefined ? '`' + `ABCDEFGHIJKLMNOPQRSTUVWXYZабвгдежзийклмнопрстуфхцчшщъыьэюя abcdefghijklmnopqrstuvwxyzАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890-=!@#$%^&*()_+[]{}|;':",./<>?~\\` : unicode
        this.encodelist = Object.fromEntries([...this.list].map((a, b) => [a, b]));
        this.decodelist = Object.fromEntries(Object.entries(this.encodelist).map(([a, b]) => [b, a]));
    }
    encode = text => [...text.split('\n')].map(line => [...line].map(a => this.encodelist[a]).join(' ')).join('\n')
    decode = text => text.split('\n').map(line => line.split(' ').map(a => this.decodelist[a]).join('')).join('\n')
}; exports.CustomCoder = CustomCoder

//-------------------------
// Password Generator
//-------------------------

class PassWordsGenerator {
    numbersAndWords = (length, uppercase) => Array.from({ length }, () => (function (a) { return Math.random() < 0.5 ? String.fromCharCode(Math.random() * ((a ? 90 : 122) - (a ? 65 : 97) + 1) + (a ? 65 : 97)) : String.fromCharCode(Math.random() * 10 + 48) })(uppercase === undefined ? Math.random() < 0.5 : uppercase)).join('')
    symbols = (length, uppercase) => { let a = Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + (Math.random() < 0.5 ? 65 : 97))).join(''); return uppercase === undefined ? a : uppercase === false ? a.toLowerCase() : a.toUpperCase() }
    numbers = (length) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
    all = (length) => Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 36) + (Math.random() < 0.5 ? 65 : 48))).join('')
}; exports.PassWordsGenerator = new PassWordsGenerator()

//-------------------------
// UUID Generator
//-------------------------

class UUIDGenerator {
    uuid0 = {
        auto: function(){return `${((BigInt(Date.now()) << BigInt(60)) | (BigInt(new Date().getTimezoneOffset()) << BigInt(46)) | (BigInt(0) << BigInt(45)) | BigInt('0x' + '00:00:00:00:00:00'.replace(/:/g, ''))).toString(16).padStart(32, '0').replace(/^(.{8})(.{4})(.{3})(.{1})(.{3})(.{12})/, '$1-$2-0$3-$4-$5')}`},
        custom: function(date_now, timezone_offset){return `${((BigInt(date_now) << BigInt(60)) | (BigInt(timezone_offset) << BigInt(46)) | (BigInt(0) << BigInt(45)) | BigInt('0x' + '00:00:00:00:00:00'.replace(/:/g, ''))).toString(16).padStart(32, '0').replace(/^(.{8})(.{4})(.{3})(.{1})(.{3})(.{12})/, '$1-$2-0$3-$4-$5')}`}
    }
    uuid1 = {
        auto: function(){return `${Date.now().toString(16).slice(6)}-${Date.now().toString(16).slice(3, 6)}-1${Date.now().toString(16).slice(1, 3)}-${Math.floor(Math.random() * 10000).toString(16).padStart(4, '0')}-000000000000`},
        custom: function(date_now_array){return `${date_now_array[0].toString(16).slice(6)}-${date_now_array[1].toString(16).slice(3, 6)}-1${date_now_array[2].toString(16).slice(1, 3)}-${Math.floor(Math.random() * 10000).toString(16).padStart(4, '0')}-000000000000`}
    }
    uuid2 = {
        auto: function(){return (Date.now() + Math.random() * 1e4).toString(16).replace('.', '') + '000000000'},
        custom: function(date_now){return (date_now + Math.random() * 1e4).toString(16).replace('.', '') + '000000000'}
    }
    uuid3 = {
        auto: function(){return require('crypto').createHash('md5').update('6ba7b810-9dad-11d1-80b4-00c04fd430c8' + 'example').digest('hex').replace(/(.{8})(.{4})(.{3})(.{1})(.{3})(.{12})/, '$1-$2-3$3-a$4$5-$6')},
        custom: function(secret){return require('crypto').createHash('md5').update(secret).digest('hex').replace(/(.{8})(.{4})(.{3})(.{1})(.{3})(.{12})/, '$1-$2-3$3-a$4$5-$6')}
    }
    uuid4 = {
        auto: function(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => (Math.random() * 16 | 0).toString(16))},
        custom: function(number){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => (Math.random() * number | 0).toString(16));}
    }
    uuid5 = {
        auto: function(){return require('crypto').createHash('sha1').update('6ba7b810-9dad-11d1-80b4-00c04fd430c8' + 'example').digest('hex').replace(/(.{8})(.{4})(.{3})(.{1})(.{3})(.{12})/, '$1-$2-3$3-a$4$5-$6')},
        custom: function(secret){return require('crypto').createHash('sha1').update(secret).digest('hex').replace(/(.{8})(.{4})(.{3})(.{1})(.{3})(.{12})/, '$1-$2-3$3-a$4$5-$6')}
    }
}; exports.UUIDGenerator = new UUIDGenerator()

//-------------------------
// File Handler
//-------------------------

class FileHandler {
  constructor(path) { this.path = join(__dirname, path); }
  createFile = data => fs.writeFileSync(this.path, data ?? '', 'utf-8');
  deleteFile = () => fs.unlinkSync(this.path);
  writeFile = data => fs.writeFileSync(this.path, data, 'utf-8');
  getFile = () => fs.readFileSync(this.path, 'utf-8');
  appendToStartOfFile = data => fs.appendFileSync(this.path, data + '\n', 'utf-8');
  appendLineToEndOfFile = data => fs.appendFileSync(this.path, '\n' + data, 'utf-8');
  deleteLastLine = () => {
    const lines = fs.readFileSync(this.path, 'utf-8').split('\n');
    lines.pop();
    fs.writeFileSync(this.path, lines.join('\n'), 'utf-8');
  };
  getPath = () => this.path;
  deleteLineByIndex = index => {
    const lines = fs.readFileSync(this.path, 'utf-8').split('\n');
    lines.splice(index, 1);
    fs.writeFileSync(this.path, lines.join('\n'), 'utf-8');
  };
  rewriteLineByIndex = (index, data) => {
    const lines = fs.readFileSync(this.path, 'utf-8').split('\n');
    lines[index] = data;
    fs.writeFileSync(this.path, lines.join('\n'), 'utf-8');
  };
  getLineCount = () => fs.readFileSync(this.path, 'utf-8').split('\n').length ?? 0;
  getStringFromFileByLineIndex = index => {
    const lines = fs.readFileSync(this.path, 'utf-8').split('\n');
    return (index > 1 && index <= lines.length) ? lines[index - 1] : false;
  };
  findLinesByLength = (length, comparator) => fs.readFileSync(this.path, 'utf-8').split('\n').filter(line => comparator(line, length));
  findLinesGreaterThanLength = length => this.findLinesByLength(length, (line, length) => line.length > length);
  findLinesLessThanLength = length => this.findLinesByLength(length, (line, length) => line.length < length);
  hasLineWithPrefix = (prefix, method) => fs.readFileSync(this.path, 'utf-8').split('\n').some(line => method(line, prefix));
  hasLineStartWith = prefix => this.hasLineWithPrefix(prefix, (line, prefix) => line.startsWith(prefix));
  hasLineEndsWith = prefix => this.hasLineWithPrefix(prefix, (line, prefix) => line.endsWith(prefix));
  existsFile = () => fs.existsSync(this.path);
  compressFile = (newfile) => fs.writeFileSync(newfile || this.path, zlib.deflateSync(fs.readFileSync(this.path)));
  decompressFile = (newfile) => fs.writeFileSync(newfile || this.path, zlib.inflateSync(fs.readFileSync(this.path)));
  QRCode = (text) => qr.image(text, {type: 'png'}).pipe(fs.createWriteStream(this.path));
}; exports.FileHandler = FileHandler

//-------------------------
// Other Utility
//-------------------------

const ports = Array.from({ length: 65535 }, (_, index) => index + 1)

class OtherHandling {
    getAllPortsArray = () => ports
    shuffleString = text => [...text].sort(() => Math.random() - 0.5).join('');
    combineArraysInArray = arrays => [].concat(...arrays)
    arrayToString = array => array.join('\n');
}; exports.OtherHandling = new OtherHandling()

exports.Unicode = '`' + `ABCDEFGHIJKLMNOPQRSTUVWXYZабвгдежзийклмнопрстуфхцчшщъыьэюя abcdefghijklmnopqrstuvwxyzАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890-=!@#$%^&*()_+[]{}|;':",./<>?~\\`