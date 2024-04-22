import { redisClient } from "../connections/redisConnection";

async function get(key: any) {
  console.log("KEY===========", key);
  let getData = await redisClient.get(key);
  console.log("redis Data", getData);
  if (getData) {
    getData = JSON.parse(getData);
    return getData;
  } else {
    return false;
  }
}

const set = async (key: any, data: any) => {
  try {
    console.log("set data ==========", data);
    return await redisClient.set(key, JSON.stringify(data));
  } catch (error) {
    console.log("redis operation set ERROR", error);
  }
};

const getDataUsingKey = async (key: any) => {
  try {
    const keys = await redisClient.keys(`${key}:*`);
    const playerData = await Promise.all(
      keys.map(async (e: any) => {
        const rawData = await redisClient.get(e);
        if (rawData) return JSON.parse(rawData);
      })
    );

    return playerData;
  } catch (error) {
    console.error("Error retrieving player data from Redis", error);
  }
};

const del = async (key: string) => {
  try {
    console.log("del data ================>>", key);
    return await redisClient.del(key);
  } catch (error) {
    console.log("redis operation set ERROR", error);
  }
};

export { get, set, getDataUsingKey, del };
