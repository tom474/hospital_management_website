import { useQuery, useMutation } from "@tanstack/react-query";
import { getDataAPI, postDataAPI, putDataAPI } from "./apiRequest";

export const useGetData = (url, key) => {
	const { data, isPending } = useQuery({
		queryKey: key,
		queryFn: () => getDataAPI(url)
	});

	return { data, isPending };
};

export const usePostData = ({ onSuccess }) => {
	const { mutate, isPending } = useMutation({
		mutationFn: postDataAPI,
		onSuccess: onSuccess
	});

	return { mutate, isPending };
};

export const usePutData = ({ onSuccess }) => {
	const { mutate, isPending } = useMutation({
		mutationFn: putDataAPI,
		onSuccess: onSuccess
	});

	return { mutate, isPending };
};
