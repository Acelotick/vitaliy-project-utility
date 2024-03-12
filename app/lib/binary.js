const crypto = require('crypto');
const zlib = require('zlib');
const fs = require('fs');

/**
 * @param {String} _0 Encoded text to binary
 * @param {String} _1 Password (secret) for binary
 * @param {String} _2 Path to your file
 */
const ENC=(_0,_1,_2)=>{const 𝕚=crypto.randomBytes(16),𝕔=crypto.createCipheriv('aes-256-gcm',crypto.scryptSync(_1,'salt',32),𝕚);let 𝖊=𝕔.update(_0,'utf-8','hex');𝖊+=𝕔.final('hex');const 𝖌=𝕔.getAuthTag(),𝖉=zlib.gzipSync(Buffer.from(`${𝕚.toString('hex')}:${𝖌.toString('hex')}:${𝖊}`,'utf-8'));fs.writeFileSync(_2,𝖉)};

/**
 * @param {String} _1 Password (secret) for binary
 * @param {String} _0 Path to your file
 * @returns {String} String, ("#incorrect" if password incorrect)
 */
const DND=(_1,_0)=>{const[𝕙,𝕥,𝑒]=zlib.gunzipSync(fs.readFileSync(_0)).toString('utf-8').split(':'),𝑛=crypto.createDecipheriv('aes-256-gcm',crypto.scryptSync(_1,'salt',32),Buffer.from(𝕙,'hex')).setAuthTag(Buffer.from(𝕥,'hex'));let 𝑟=𝑛.update(𝑒,'hex','utf-8');try{return 𝑟+=𝑛.final('utf-8')}catch{return '#incorrect'}};

module.exports = { ENC, DND }