const { regcmd, imitate, types, getcommands, close_input, batch_input } = require("./app")
const { join } = require('path')
const ytdl = require('ytdl-core');
const fs = require('fs');
const { UUIDGenerator, AsciiCoder, FileHandler, CustomCoder, PassWordsGenerator, OtherHandling, Unicode } = require("./lib/good-utility");
const { ENC, DND } = require("./lib/binary");

regcmd('ascii-encode', (p) => imitate(types.scolor)([['#ffdd99']], `${AsciiCoder.encode(p.argsRaw)}`), 'Encode ascii text', ['(Text)'])

regcmd('ascii-decode', (p) => imitate(types.scolor)([['#ffdd99']], `${AsciiCoder.decode(p.argsRaw)}`), 'Decode ascii text', ['(Text)'])

regcmd('ascii-encode-f', (p) => imitate(types.scolor)([['#ffdd99']], `${AsciiCoder.encode(new FileHandler(`../${p.argsRaw}`).getFile())}`), 'Encode ascii text from file', ['[FileName]'])

regcmd('ascii-decode-f', (p) => imitate(types.scolor)([['#ffdd99']], `${AsciiCoder.decode(new FileHandler(`../${p.argsRaw}`).getFile())}`), 'Decode ascii text from file', ['[FileName]'])

regcmd('ascii-encode-s', (p) => {
    const file = new FileHandler(`../${p.argsRaw}`); file.writeFile(AsciiCoder.encode(file.getFile())); 
    imitate(types.scolor)([['#ffdd99']], `Encode saved succesfully to ${p.args[0]} file`)
}, 'Encode ascii text on file and save', ['[FileName]'])

regcmd('ascii-decode-s', (p) => { 
    const file = new FileHandler(`../${p.argsRaw}`); 
    file.writeFile(AsciiCoder.encode(file.getFile())); 
    imitate(types.scolor)([['#ffdd99']], `Encode saved succesfully to ${p.args[0]} file`) 
}, 'Decode ascii text on file and save', ['[FileName]'])

regcmd('encode', (p) => imitate(types.scolor)([['#ffdd99']], new CustomCoder(p.args[0].toLowerCase() == 'auto' ? undefined : new FileHandler(`../${p.args[0]}`)).encode(p.argsRaw.substring(p.args[0].length + 1))), 'Encode file with custom unicodes', ['[FileName (Unicode) / "auto"]', '[Text]'])

regcmd('decode', (p) => imitate(types.scolor)([['#ffdd99']], new CustomCoder(p.args[0].toLowerCase() == 'auto' ? undefined : new FileHandler(`../${p.args[0]}`)).decode(p.argsRaw.substring(p.args[0].length + 1))), 'Decode file with custom unicodes', ['[FileName (Unicode) / "auto"]', '[Text]'])

regcmd('encode-f', (p) => imitate(types.scolor)([['#ffdd99']], new CustomCoder(p.args[0].toLowerCase() == 'auto' ? undefined : new FileHandler(`../${p.args[0]}`).getFile()).encode(new FileHandler(`../${p.argsRaw.substring(p.args[0].length + 1)}`).getFile())), 'Encode file with custom unicodes from file', ['[FileName (Unicode) / "auto"]', '[FileName]'])

regcmd('decode-f', (p) => imitate(types.scolor)([['#ffdd99']], new CustomCoder(p.args[0].toLowerCase() == 'auto' ? undefined : new FileHandler(`../${p.args[0]}`).getFile()).decode(new FileHandler(`../${p.argsRaw.substring(p.args[0].length + 1)}`).getFile())), 'Decode file with custom unicodes from file', ['[FileName (Unicode)] / "auto"]', '[FileName]'])

regcmd('encode-s', (p) => { 
    const file = new FileHandler(`../${p.argsRaw.substring(p.args[0].length + 1)}`); 
    file.writeFile(new CustomCoder(p.args[0].toLowerCase() == 'auto' ? undefined : new FileHandler(`../${p.args[0]}`).getFile()).encode(file.getFile())); 
    imitate(types.scolor)([['#ffdd99']], `Encoded with unicode from ${p.args[0]} file, and saved encoded text to ${p.argsRaw.substring(p.args[0].length + 1)}`)
}, 'Encode on file and save changes with custom unicodes', ['[FileName (Unicode) / "auto"]', '[FileName]'])

regcmd('decode-s', (p) => {
    const file = new FileHandler(`../${p.argsRaw.substring(p.args[0].length + 1)}`); 
    file.writeFile(new CustomCoder(p.args[0].toLowerCase() == 'auto' ? undefined : new FileHandler(`../${p.args[0]}`).getFile()).decode(file.getFile())); 
    imitate(types.scolor)([['#ffdd99']], `Decoded with unicode from ${p.args[0]} file, and saved decoded text to ${p.argsRaw.substring(p.args[0].length + 1)}`) 
}, 'Decode on file and save changes with custom unicodes', ['[FileName (Unicode) / "auto"]', '[FileName]'])

regcmd('binary-decode-f', (p) => {
    let a = DND(p.args[1], p.args[0]);
    imitate(types.scolor)([['#ffdd99']], a.toString().trim() == '#incorrect' ? 'Password incorrect, try again' : a)
}, 'Decode file with binary system', ['[FileName]', '[Password]'])

regcmd('binary-decode-s', (p) => {
    let a = DND(p.args[1], p.args[0]);
    let b = a.toString().trim() == '#incorrect' ? false : true
    imitate(types.scolor)([['#ffdd99']], !b ? 'Password incorrect, try again' : 'Saving decoded file..')
    if (b) new FileHandler(`../${p.args[0]}`).writeFile(a)
}, 'Decode binary file', ['[FileName]', '[Password]'])

regcmd('binary-encode-s', (p) => {
    ENC(new FileHandler(`../${p.args[0]}`).getFile(), p.argsRaw.substring(p.args[0].length + 1), p.args[0]);
    imitate(types.scolor)([['#ffdd99']], `Binary file with name ${p.args[0]} saved with password ${p.args[1]}`) 
}, 'Encode file with binary and save', ['[FileName]', '[Password]'])

regcmd('binary-encode-c', (p) => {
    ENC(p.argsRaw.substring(p.args[0].length + p.args[1].length + 2), p.args[1], p.args[0]);
    imitate(types.scolor)([['#ffdd99']], `Encoded file ${p.args[0]} with password ${p.args[1]} saved`)
}, 'Create file with any text with binary encode', ['[FileName]', '[Password]', '(AnyText)'])

regcmd('uuid-v0', () => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid0.auto()}`), 'Generates UUID by Version 0', [])

regcmd('uuid-v0-c', (p) => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid0.custom(p.args[0], p.args[1])}`), 'Generates UUID by Version 0, but custom parameters', ['[Date Now]', '[Timezone Offset]'])

regcmd('uuid-v1', () => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid1.auto()}`), 'Generates UUID by Version 1', [])

regcmd('uuid-v1-c', (p) => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid1.custom(p.argsRaw)}`), 'Generates UUID by Version 1, but custom parameters', ['(Date Now)'])

regcmd('uuid-v2', () => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid2.auto()}`), 'Generates UUID by Version 2', [])

regcmd('uuid-v2-c', (p) => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid2.custom(p.argsRaw)}`), 'Generates UUID by Version 2, but custom parameters', ['(Date Now)'])

regcmd('uuid-v3', () => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid3.auto()}`), 'Generates UUID by Version 3', [])

regcmd('uuid-v3-c', (p) => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid3.custom(p.argsRaw)}`), 'Generates UUID by Version 3, but custom parameters', ['(Secret (Any))'])

regcmd('uuid-v4', () => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid4.auto()}`), 'Generates UUID by Version 4', [])

regcmd('uuid-v4-c', (p) => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid4.custom(p.argsRaw)}`), 'Generates UUID by Version 4, but custom parameters', ['(Number)'])

regcmd('uuid-v5', () => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid5.auto()}`), 'Generates UUID by Version 5', [])

regcmd('uuid-v5-c', (p) => imitate(types.scolor)([['#ffdd99']], `${UUIDGenerator.uuid5.custom(p.argsRaw)}`), 'Generates UUID by Version 5, but custom parameters', ['(Secret (Any))'])

regcmd('password-all', (p) => imitate(types.scolor)([['#ffdd99']], PassWordsGenerator.all(p.argsRaw)), 'Generate random password by all symbols', ['[Length]'])

regcmd('password-numbers', (p) => imitate(types.scolor)([['#ffdd99']], PassWordsGenerator.numbers(p.argsRaw)), 'Generate random password by numbers', ['[Length]'])

regcmd('password-numwords', (p) => imitate(types.scolor)([['#ffdd99']], PassWordsGenerator.numbersAndWords(p.args[0], p.args[1] === 'auto' ? undefined : p.args[1] === 'false' ? false : true)), 'Generate random password by numbers and words', ['[Length]', '[Upper (true/false/auto)]'])

regcmd('password-words', (p) => imitate(types.scolor)([['#ffdd99']], PassWordsGenerator.symbols(p.args[0], p.args[1] === 'auto' ? undefined : p.args[1])), 'Generate random password by words', ['[Length]', '[Upper (true/false/auto)]'])

regcmd('shuffle-text', (p) => imitate(types.scolor)([['#ffdd99']], OtherHandling.shuffleString(p.args[0].toLowerCase() === 'unicode' ? Unicode : ip.argsRaw.substring(p.args[0].length + 1))), 'Randomize all symbols in text', ['[Unicode / Any]', '(Any)'])

regcmd('reverse-text', (p) => imitate(types.scolor)([['#ffdd99']], p.argsRaw.split('').reverse().join('')), 'Randomize all symbols in text', ['(Any)'])

regcmd('create-file', (p) => { new FileHandler(`../${p.args[0]}`).createFile(p.argsRaw.substring(p.args[0].length + 1)); imitate(types.scolor)([['#ffdd99']], `File by name ${p.args[0]} created`) }, 'Create new file with data', ['[FileName]', '(Data)'])

regcmd('remove-file', (p) => { new FileHandler(`../${p.argsRaw}`).deleteFile(); imitate(types.scolor)([['#ffdd99']], `File by name ${p.args[0]} deleted`) }, 'Delete file', ['[FileName]'])

regcmd('exists-file', (p) => imitate(types.scolor)([['#ffdd99']], new FileHandler(`../${p.argsRaw}`).existsFile() ? `Yes, file by name ${p.args[0]} exists` : `No, file by name ${p.args[0]} not exists`), 'Delete file', ['[FileName]'])

regcmd('edit-file', (p) => { const file = new FileHandler(`../${p.args[0]}`); new FileHandler(`../${p.argsRaw.substring(p.args[0].length + 1)}`).createFile(file.getFile()); file.deleteFile() }, 'Edit file data', ['[FileName]', '[NewFileName]'])

regcmd('qr-code', (p) => new FileHandler(`../${p.args[0]}`).QRCode(p.argsRaw.substring(p.args[0].length + 1)) != 1 ? imitate(types.scolor)([['#ffdd99']], `QR Code saved to file ${p.args[0]} with text "${p.argsRaw.substring(p.args[0].length + 1)}"`) : void 0, 'Generates QR Code image from your text', ['[FileName]', '(Text)'])

regcmd('download-youtube', (p) => { if (new FileHandler(`../${p.args[1].mp4}`).existsFile()) return imitate(types.error)(`File ${p.args[1]}.mp4 already exists`); const Stream = ytdl(p.args[0], {quality: 'highestaudio'}); const Video = fs.createWriteStream(`${p.args[1]}.mp4`); Stream.pipe(Video); Stream.on('end', () => console.log(`Downloaded and saved on: ${join(__dirname, `${p.args[1]}.mp4`)}`)); Stream.on('error', (err) => imitate(types.error)(err.message)) }, 'Download video from youtube by link', ['[Link]', '[FileName]'])

close_input.forEach((a => regcmd(a, () => {}, 'Default close command', [], true)))

batch_input.forEach((a => regcmd(a, () => {}, 'Default execute command', ['[Command]'], true)))
