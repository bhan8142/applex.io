const {ShardingManager} = require('discord.js');
const config = require('./config.json');

const shards = new ShardingManager("./index.js", {
    token: process.env.TOKEN,
    totalShards:"auto"
});
shards.on("shardCreate", shard =>{
    console.log(`[READY] ${new Date().toString().split(" ",5).join(" ")} Launched Shard #${shard.id}`);
});
shards.spawn(shards.totalShards, 10000)

process.on('unhandledRejection', error => {
  if (error.code === '10008' || error.code === '10062') return;
  console.log(error.stack);
});
process.on('uncaughtException', (err, origin) => {
  console.log(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err, origin);
});

process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise, reason);
});