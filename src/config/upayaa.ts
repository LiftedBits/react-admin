import ArticleIcon from "@mui/icons-material/Article"
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel"
import TagIcon from "@mui/icons-material/Tag"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import React from "react"
import { GridRenderCellParams } from "@mui/x-data-grid"
import { renderImage, renderLink } from "../functions/custom-render"

export type Collection = {
  title: string
  description: string
  key: string
  icon: typeof ArticleIcon
  cols: {
    field: string
    headerName: string
    // flex: number
    renderCell?: (params: GridRenderCellParams) => React.ReactNode
    type?: "string" | "singleSelect" | "dateTime"
    valueGetter?: (params: GridRenderCellParams) => any
  }[]
}

export const collections: Record<string, Collection> = {
  blogs: {
    title: "Blogs",
    description: "Read our latest blogs",
    key: "blogs",
    icon: ArticleIcon,
    cols: [
      { field: "title", headerName: "Title" },
      { field: "description", headerName: "Description" },
      {
        field: "url",
        headerName: "URL",
        renderCell: (params) => renderLink(params),
      },
      {
        field: "created_at",
        headerName: "Created At",
        type: "dateTime",
        valueGetter: (params) => {
          console.log(typeof params)
          const dateStr = String(params)
          const date = new Date(dateStr)
          return date
        },
        renderCell: (params: GridRenderCellParams<Date>) => {
          return params.value ? params.value.toLocaleString() : ""
        },
      },
      {
        field: "image_url",
        headerName: "Image URL",
        renderCell: (params) => renderImage(params),
      },
    ],
  },
  featured_blogs: {
    title: "Featured Blogs",
    description: "Read our featured blogs",
    key: "featured_blogs",
    icon: ViewCarouselIcon,
    cols: [
      { field: "title", headerName: "Title" },
      { field: "url", headerName: "URL" },
      { field: "created_at", headerName: "Created At" },
      { field: "image_url", headerName: "Image URL" },
    ],
  },
  social_media_posts: {
    title: "Social Media Posts",
    description: "Check out our social media posts",
    key: "social_media_posts",
    icon: TagIcon,
    cols: [
      { field: "title", headerName: "Title" },
      { field: "platform", headerName: "Platform" },
      { field: "created_at", headerName: "Created At" },
      { field: "post_url", headerName: "Post URL" },
    ],
  },
  subscribers: {
    title: "Subscribers",
    description: "View our subscribers",
    key: "subscribers",
    icon: NewspaperIcon,
    cols: [
      { field: "title", headerName: "Title" },
      { field: "email", headerName: "Email" },
      { field: "name", headerName: "Name" },
      { field: "phone_number", headerName: "Phone Number" },
    ],
  },
}

export const API_URL =
  "http://127.0.0.1:5001/upayaa-website-backend/us-central1/api/"

export type Blog = {
  created_at: string
  description: string
  image_url: string
  title: string
  url: string
}

export type FeaturedBlog = {
  created_at: string
  image_url: string
  title: string
  url: string
}

export type SocialMediaPost = {
  created_at: string
  post_url: string
  platform: "YouTube" | "Instagram" | "Facebook"
  title: string
}

export type User = {
  joined_at: string
  email: string
  name: string
  phone_number: string
}
