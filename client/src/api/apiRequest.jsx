import instance from "./index";

export const getDataAPI = async (url) => {
	const res = await instance.get(`${url}`);
	return res.data;
};

export const postDataAPI = async ({ url, post }) => {
	const res = await instance.post(`${url}`, post);
	return res.data;
};

export const putDataAPI = async ({ url, post }) => {
	const res = await instance.put(`${url}`, post);
	return res.data;
};

export const deleteDataAPI = async (url) => {
	const res = await instance.delete(`${url}`);
	return res.data;
};
