import axios from "axios";

const server = 'http://localhost:3000/';

export async function getSeminars() {
  const res = await axios.get(server + 'seminars');
  return res.data
}

export async function deleteSeminar(id: string) {
  const res = await axios.delete(server + `seminars/${id}`);
  return res.data
}

export async function changeSeminar(changes: {title: string, description: string}, id: number) {
  const res = await axios.patch(server + `seminars/${id}`, changes);
  return res.data
}