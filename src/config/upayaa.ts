import ArticleIcon from "@mui/icons-material/Article"
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel"
import TagIcon from "@mui/icons-material/Tag"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import { GridColDef } from "@mui/x-data-grid"
import { renderImage, renderLink } from "../functions/custom-render"

export type Collection = {
  title: string
  description: string
  key: string
  fields: Field[]
  icon: typeof ArticleIcon
  cols: GridColDef[]
}

export type Field = {
  key: string
  type:
    | "text"
    | "string"
    | "number"
    | "date"
    | "image"
    | "select"
    | "phone_number"
  label: string
  options?: string[]
}

export const collections: Record<string, Collection> = {
  blogs: {
    title: "Blogs",
    description: "Used to render blog cards on the blog page",
    key: "blogs",
    fields: [
      // { key: "created_at", type: "string" },
      { key: "title", type: "string", label: "Title" },
      { key: "description", type: "string", label: "Description" },
      { key: "image_url", type: "image", label: "Thumbnail Image" },
      { key: "url", type: "string", label: "URL" },
    ],
    icon: ArticleIcon,
    cols: [
      { field: "title", headerName: "Title", editable: true, flex: 1 },
      {
        field: "description",
        headerName: "Description",
        editable: true,
        flex: 1,
      },
      {
        field: "url",
        headerName: "URL",
        renderCell: (params) => renderLink(params),
        editable: true,
        flex: 1,
      },
      // {
      //   field: "created_at",
      //   headerName: "Created At",
      //   type: "dateTime",
      //   ...getDateRenderProps(),
      //   editable: true, flex:1,
      // },
      {
        field: "image_url",
        headerName: "Image URL",
        renderCell: (params) => renderImage(params),
        editable: true,
        flex: 1,
      },
    ],
  },
  featured_blogs: {
    title: "Featured Blogs",
    description:
      "Used to render the featured blogs on the carousel on the blog page",
    key: "featured_blogs",
    fields: [
      // { key: "created_at", type: "string" },
      { key: "title", type: "string", label: "Title" },
      { key: "image_url", type: "image", label: "Thumbnail Image" },
      { key: "url", type: "string", label: "URL" },
    ],
    icon: ViewCarouselIcon,
    cols: [
      { field: "title", headerName: "Title", editable: true, flex: 1 },
      {
        field: "url",
        headerName: "URL",
        renderCell: (params) => renderLink(params),
        editable: true,
        flex: 1,
      },
      // {
      //   field: "created_at",
      //   headerName: "Created At",
      //   ...getDateRenderProps(),
      //   editable: true, flex:1,
      // },
      {
        field: "image_url",
        headerName: "Image URL",
        renderCell: (params) => renderImage(params),
        editable: true,
        flex: 1,
      },
    ],
  },
  social_media_posts: {
    title: "Social Media Posts",
    description: "Used to render social media post cards on the blog page",
    key: "social_media_posts",
    fields: [
      // { key: "created_at", type: "string" },
      { key: "title", type: "string", label: "Title" },
      { key: "post_url", type: "string", label: "Post URL" },
      {
        key: "platform",
        type: "select",
        options: ["YouTube", "Instagram", "Facebook"],
        label: "Platform",
      },
    ],
    icon: TagIcon,
    cols: [
      { field: "title", headerName: "Title", editable: true, flex: 1 },
      {
        field: "platform",
        headerName: "Platform",
        type: "singleSelect",
        valueOptions: ["YouTube", "Instagram", "Facebook"],
        editable: false,
        flex: 1,
      },
      // {
      //   field: "created_at",
      //   headerName: "Created At",
      //   ...getDateRenderProps(),
      //   editable: true, flex:1,
      // },
      {
        field: "post_url",
        headerName: "Post URL",
        renderCell: (params) => renderLink(params),
        editable: true,
        flex: 1,
      },
    ],
  },
  subscribers: {
    title: "Subscribers",
    description: "News letter subscribers",
    key: "subscribers",
    fields: [
      // { key: "created_at", type: "string" },
      { key: "email", type: "string", label: "Email" },
      { key: "name", type: "string", label: "Name" },
      { key: "phone_number", type: "phone_number", label: "Phone Number" },
    ],
    icon: NewspaperIcon,
    cols: [
      { field: "email", headerName: "Email", editable: true, flex: 1 },
      { field: "name", headerName: "Name", editable: true, flex: 1 },
      {
        field: "phone_number",
        headerName: "Phone Number",
        editable: true,
        flex: 1,
      },
      // { field: "created_at", headerName: "Joined at", editable: true, flex:1 },
    ],
  },
}

// export const API_URL =
//   "http://127.0.0.1:5001/upayaa-website-backend/us-central1/api/"

export const API_URL =
  "https://us-central1-upayaa-website-backend.cloudfunctions.net/api/"

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
