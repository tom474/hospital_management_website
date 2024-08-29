import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const instance = axios.create({
	baseURL: "http://localhost:4000"
});

export default instance;
