#! /usr/bin/env node

console.log('此脚本为数据库填充一些测试藏书、作者、藏书种类、藏书类型。将数据库地址作为参数，比如：populatedb mongodb://your_username:your_password@your_dabase_url。');

// 从命令行取得参数
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('错误：需要指定一个合法的 MongoDB URL 作为第一个参数。');
  return;
}

const async         = require('async');
const User          = require('./server/models/UserModel');
const Member        = require('./server/models/Member');
const Comment       = require('./server/models/Comment');
const RetroTime     = require('./server/models/retrotime')
const Team     = require('./server/models/team')


const mongoose      = require('mongoose');
const mongoDB       = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise    = global.Promise;

const db            = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

const users         = [];

function userCreate(username,password,name,team,cb) {
  const user = new User({
    username:username,
    password:password,
    name:name,
    team:team
  });

  user.save( err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('xinjian user：' + user);
    users.push(user);
    cb(null, user);
  });
}

function teamCreate(team,showComment,cb){
  const team1 = new Team({
    team:team,
    showComment:showComment
  });

  team1.save( err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('xinjian user：' + team1);
    users.push(team1);
    cb(null, team1);
  });
}

function retrotimeCreate(team,type,url,cb) {
  const retrotime = new RetroTime({
    team:team,
    type:type,
    url:url
  });

  retrotime.save( err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('xinjian user：' + retrotime);
    users.push(retrotime);
    cb(null, retrotime);
  });
}


function memberCreate(team,username,cb) {
  const member = new Member({
    team:team,
    username:username
  });

  member.save( err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('xinjian user：' + member);
    users.push(member);
    cb(null, member);
  });
}

function commentCreate(retro,username,comment,commentdetail,category,star,cb) {
  const comment1 = new Comment({
    retro:retro,
    username:username,
    comment:comment,
    commentD:commentdetail,
    category:category,
    star:star
  });

  comment1.save( err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('xinjian user：' + comment1);
    users.push(comment1);
    cb(null, comment1);
  });
}

function createretrotimes(cb){
  async.parallel([
    callback => retrotimeCreate(
      'ctu3',
      'A01',
      'xxxx',
      callback
    )
  ], cb); // 可选回调
}

function createTeams(cb){
  async.parallel([
    callback => teamCreate(
      'ctu3',
      'ok',
      callback
    ),
  ],cb);
}

function createComments(cb){
  async.parallel([
    callback => commentCreate(
      'retro1',
      'test1',
      'comment1',
      'I think we are doing so great',
      'good',
      3,
      callback
    ),
    callback => commentCreate(
      'retro1',
      'test2',
      'comment1',
      'I think we are doing so great, but let us try more',
      'good',
      3,
      callback
    ),
    callback => commentCreate(
      'retro1',
      'test3',
      'comment1',
      'I think we are doing so great, yes yes yes',
      'good',
      3,
      callback
    )
  ], cb); // 可选回调
}

function createUsers(cb) {
  async.parallel([
    callback => userCreate(
      'YANGLING2',
      'sap123456',
      'ling',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'ZHANGSTEV0',
      'sap123456',
      'steve',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'ZHAODAN1',
      'sap123456',
      'dan',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'LIHARR',
      'sap123456',
      'charis',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'LIUZOE',
      'sap123456',
      'zoe',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'QUQ',
      'sap123456',
      'wei',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'XUNE',
      'sap123456',
      'neil',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'YUANCO',
      'sap123456',
      'cooper',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'KEB',
      'sap123456',
      'bin',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'XUDE',
      'sap123456',
      'demi',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'LIHARR',
      'sap123456',
      'harry',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'YANGVIVI0',
      'sap123456',
      'vivian',
      'ctu3',
      callback
    ),
    callback => userCreate(
      'TANGLIN',
      'sap123456',
      'lin',
      'ctu3',
      callback
    )
  ], cb); // 可选回调
}


function createMembers(cb) {
  async.parallel([
    callback => memberCreate(
      'ctu3',
      'LIHARR',
      callback
    ),
    callback => memberCreate(
      'ctu3',
      'ZHAODAN1',
      callback
    ),
    callback => memberCreate(
      'ctu3',
      'ZHANGSTEV0',
      callback
    )
  ], cb); // 可选回调
}

async.series (
  [
    // createUsers,
    // createMembers
    // createComments,
    // createretrotimes
    createTeams
  ],
  // 可选回调
  (err, results) => {
    console.log(
      err ?
      '最终错误：' + err :
      '藏书副本：' 
    );
    // 操作完成，断开数据库连接
    db.close();
  }
);
