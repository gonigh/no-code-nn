import type { SubmitParam } from "@/types/api";
import request from "./http";

const baseURL = 'http://localhost:8081';

export const submitAPI = (params: SubmitParam)=>request.post(`${baseURL}/submit`,params);

export const downloadAPI = ()=>request.get(`${baseURL}/download`,{});