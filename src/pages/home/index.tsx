import CollectionsList from "../../components/collections-list"
import { collections } from "../../config/upayaa"

export default function Home() {
  return <CollectionsList collections={Object.values(collections)} />
}
