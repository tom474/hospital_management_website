import instance from "./index";

export const getDataAPI = async (url) => {
	const res = await instance.get(`${url}`);
	return res;
};

export const postDataAPI = async (url, post) => {
	const res = await instance.post(`${url}`, post);
	return res;
};

export const putDataAPI = async (url, post) => {
	const res = await instance.put(`${url}`, post);
	return res;
};

export const deleteDataAPI = async (url, post) => {
	const res = await instance.delete(`${url}`, post);
	return res;
};
