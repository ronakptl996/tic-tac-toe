import "dotenv/config";
import { createClient } from "redis";
import IORedis from "ioredis";
export type RedisClientType = ReturnType<typeof createClient>;
let redisClient: any;

// let redisClient: any;
let redisPub: any;
let redisSub: any;

let redisData: any = {
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  password: "",
  database: Number(process.env.REDIS_PUB_SUB_DB),
};

const redisConnection = async () => {
  try {
    // redisClient = IORedis.createClient();

    // redisClient = createClient({
    //   socket: {
    //     host: process.env.REDIS_HOST,
    //     port: Number(process.env.REDIS_PORT),
    //   },
    //   password: "",
    //   database: Number(process.env.REDIS_PUB_SUB_DB),
    // });

    redisClient = createClient(redisData);

    redisClient.connect();

    redisClient.on("ready", () => {
      console.log(">> Redis Connected!");
    });

    redisClient.on("error", (error: any) => {
      console.log(`Redis Connection ${error}`);
    });

    const pubSubOptions: any = {
      host: process.env.REDIS_PUB_SUB_HOST,
      port: Number(process.env.REDIS_PUB_SUB_PORT),
      password: process.env.REDIS_PUB_SUB_PASSWORD,
      db: Number(process.env.REDIS_PUB_SUB_DB),
    };
    redisPub = new IORedis(pubSubOptions);
    redisSub = new IORedis(pubSubOptions);

    redisPub.on("error", (error: any) => {
      console.log(`Redis pub ${error}`);
    });

    redisPub.on("ready", () => {
      console.log("redis pub connection sucessfully..");
    });
    redisSub.on("error", (error: any) => {
      console.log(`Redis Sub ${error}`);
    });

    redisSub.on("connect", () => {
      console.log("redis Sub connection sucessfully..");
    });
  } catch (error) {
    console.log(`redis connection ${error}`);
  }
};

export { redisConnection, redisClient, redisPub, redisSub, redisData };
