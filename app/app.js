// CODE VERSION #1.0.1
// UPDATED TIME 06 03 24

const { execSync } = require('child_process');
const { createInterface } = require('readline');
const { say } = require('./lib/colors');
const events = require('events');

//------ variables
const batch_input = ['bat']
const close_input = ['close']
const AppEvents = new events()

//------ main functions
var rl = createInterface({ input: process.stdin, output: process.stdout, prompt: '' }).on('line', a => a.trim() === '' ? imitate(types.void)() : a.trim()[0] === '/' ? imitate(types.command)(a.trim().substring(1)) : batch_input.includes(a.trim().split(' ')[0].toLowerCase()) ? imitate(types.batch)(a.trim().substring(a.trim().split(' ')[0].length + 1)) : close_input.includes(a.trim().split(' ')[0].toLowerCase()) ? imitate(types.close)() : imitate(types.input)()).on('close', () => imitate(types.close)());
const types = { 'command': 1, 'void': 2, 'input': 3, 'close': 4, 'batch': 5, 'error': 6, 'scolor': 7 };
const RLInterface = new class geometry_dash { set = (Rl) => rl = Rl; get = () => rl }();
const imit_command = (input) => AppEvents.emit('command', input.trim());
const imit_void = () => AppEvents.emit('void', void 0);
const imit_input = (input) => AppEvents.emit('input', input);
const imit_close = () => { AppEvents.emit('close', void 0); setTimeout(() => { process.exit(1) }, 100) }
const imit_batch = (input) => execSync(input);
const imit_say = (colors, text) => new say(text, colors[0], colors[1])
const imit_error = (error) => error === undefined ? imitate(types.scolor)([['#ff0000']], '[Code] Invalid error argument!') : imitate(types.scolor)([['#ff0000']], `[Error] ${error}`);
const imitate = (type) => type === 1 ? imit_command : type === 2 ? imit_void : type === 3 ? imit_input : type === 4 ? imit_close : type === 5 ? imit_batch : type === 6 ? imit_error : type === 7 ? imit_say : imit_error;

//------ commands creator
const commands = {};
AppEvents.on('command', (input) => { const [name, ...args] = input.split(/\s+/); if (commands[name]) { if (commands[name].args.length > 0 && commands[name].args.length > input.split(' ').length - 1) return imitate(types.error)('Write all arguments'); commands[name].func({ name, argsRaw: args.join(' '), args })} else imitate(types.error)(`Command ${name || '[void]'} not found, try again`) });
AppEvents.on('register-command', ({ name, func, desc, args, show, allargs }) => commands[name] = { name, func, desc, args, show, allargs });
const regcmd = (cmdname, func, desc, args, show, allargs) => AppEvents.emit('register-command', { name: cmdname ?? 'undefined', func: func ?? function() {}, desc: desc ?? [], args: args ?? [], show: show ?? false, allargs: allargs ?? true})
const getcommands = () => commands
const setcommands = (newcommands) => commands = newcommands
imitate(types.scolor)([['#ddffdd']], 'Welcome to my app, write /help to show commands list')

//------ start
module.exports = { regcmd, getcommands, setcommands, /**/ types, imitate, RLInterface, AppEvents, /**/ batch_input, close_input }
process.stdin.setNoDelay(true)
regcmd('help', (params) => { const arr = [`\n----- Commands, count (${Object.keys(getcommands()).length}) and (${close_input.length + batch_input.length}) dev`]; Object.values(getcommands()).forEach(cmd => arr.push(`${cmd.show === false ? '/' : ''}${cmd.name}${cmd.args.length ? ' ' + cmd.args.join(' ') : ''}${cmd.desc ? ` >> ${cmd.desc}` : ''}`)); arr.push(' '); imitate(types.scolor)([['#add8e6']], arr.join('\n')) }, 'Help command')
require('./script')