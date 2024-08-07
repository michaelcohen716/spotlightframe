import { createPublicClient, http, formatEther } from "viem";
import { baseSepolia, base } from "viem/chains";
import spotlightAbi from "./abi";
// import dotenv from "dotenv";
import axios from 'axios'
import { NeynarAPIClient } from '@neynar/nodejs-sdk';

// todo: set up env
// dotenv.config();
const apiKey = '8046353E-4ABA-4E55-B1B1-0E01E495584C'
const client = new NeynarAPIClient(apiKey);

// toggle
// const isMainnet = false;
const isMainnet = true;

// toggle
const baseUrl = isMainnet
  ? "https://spotlight-api-production-55e8.up.railway.app"
  : "https://spotlight-api-production.up.railway.app";
// const baseUrl = 'http://localhost:3001'

const SPOTLIGHT_ADDRESS_MAINNET = "0x4aBDc4cFd98fC6eaa21514AB3005F0310E255b65";
const SPOTLIGHT_ADDRESS_SEPOLIA = "0x8Ee94755A261b6022230ac1e57ECd986C9B2fAd5";

const SPOTLIGHT_ADDRESS = isMainnet
  ? SPOTLIGHT_ADDRESS_MAINNET
  : SPOTLIGHT_ADDRESS_SEPOLIA;

const publicClient = createPublicClient({
  transport: http(
    isMainnet
      ? base.rpcUrls.default.http[0]
      : baseSepolia.rpcUrls.default.http[0]
  ),
});

interface Booking {
  booked: boolean;
  bookerFid: bigint;
  bookedTimestamp: bigint;
  price: bigint;
  contentUri: string;
}

const getBooking = async (bookingId: string) => {
  const split = bookingId.split("-");
  const spotlightOwnerFid = split[0];
  const sequentialDay = split[1];

  const booking = await publicClient.readContract({
    address: SPOTLIGHT_ADDRESS,
    abi: spotlightAbi,
    functionName: "getSpotlightBooking",
    args: [spotlightOwnerFid || "", sequentialDay || ""],
  });

  return booking as Booking;
};

const fetchIpfsContent = async (uri: string) => {
  const PINATA_API_SECRET =
    "8uCrGmrCvsvhiGwr4gQhMogaTq137XZqmeGwK31hXZ4Ff64BY-QpwdVlTSI2o8G1";
  const url = `https://yellow-left-manatee-102.mypinata.cloud/ipfs/${uri}?pinataGatewayToken=${PINATA_API_SECRET}`;
  const resp = await fetch(url);
  const json = await (resp as any).json();
  return json;
};

export const fetchBooking = async (bookingId: string) => {
  const booking = await getBooking(bookingId);
  const contentUri = (booking as any).contentUri
  if (!contentUri) {
    throw new Error("Booking is not valid")
  }

  const content = await fetchIpfsContent(contentUri);
  return {
    content,
    booking
  };
};




const decodeFrameActionPayloadFromRequest = async (request: any) => {
  try {
    // use clone just in case someone wants to read body somewhere along the way
    const body = (await request
      .clone()
      .json()
      .catch(() => {
        throw new Error();
      })) as JSON;

    return body;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export const signal = async (request: any) => {
  const decoded = await decodeFrameActionPayloadFromRequest(request)
  try {
    const requestBody = {
      request: decoded,
    }
    const url = `${baseUrl}/signal`
    const response = await axios.post(url, requestBody);
    return response.data
  } catch (error) {
    console.log('error', error);
    return {
      message: 'Invalid action'
    }
  }
}

export const getCurrentSignal = async (activityId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/signal/${activityId}`);
    return response.data
  } catch (error) {
    console.log('error', error);
  }
}

export const fetchPreview = async (url: string) => {
  try {
    const requestBody = {
      url,
    };
    const response = await axios.post(`${baseUrl}/fetchPreview`, requestBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBulkUsers = async (arrayOfFids: any[]) => {
  try {
    const data = await client.fetchBulkUsers(arrayOfFids)
    return data.users
  } catch (e) {
    return e
  }
}

