import { API_URL } from "../config/upayaa"

export const getList = async (collection: string) => {
  const response = await fetch(`${API_URL}${collection}`, {
    method: "GET",
    headers: {
      Authorization: `Api-Key ${process.env.VITE_APP_ADMIN_API_KEY}`,
    },
  })
  return response.json()
}

export const createItem = async (collection: string, data: any) => {
  const response = await fetch(`${API_URL}${collection}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.VITE_APP_ADMIN_API_KEY}`,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export const updateItem = async (collection: string, id: string, data: any) => {
  const response = await fetch(`${API_URL}${collection}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.VITE_APP_ADMIN_API_KEY}`,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export const deleteItem = async (collection: string, id: string) => {
  const response = await fetch(`${API_URL}${collection}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Api-Key ${process.env.VITE_APP_ADMIN_API_KEY}`,
    },
  })
  return response.json()
}

export const getSingleItem = async (collection: string, id: string) => {
  const response = await fetch(`${API_URL}${collection}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Api-Key ${process.env.VITE_APP_ADMIN_API_KEY}`,
    },
  })
  return response.json()
}

export const deleteMultipleItems = async (
  collection: string,
  ids: string[]
) => {
  const response = await fetch(`${API_URL}${collection}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.VITE_APP_ADMIN_API_KEY}`,
    },
    body: JSON.stringify({ ids }),
  })
  return response.json()
}
