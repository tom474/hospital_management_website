import { useQuery } from "@tanstack/react-query";
import { getDataAPI } from "./apiRequest";

export const useGetData = (url, key) => {
	const { data, isPending } = useQuery({
		queryKey: key,
		queryFn: () => getDataAPI(url)
	});

	return { data, isPending };
};
