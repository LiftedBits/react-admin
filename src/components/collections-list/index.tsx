import React from "react"
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Paper,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { Collection } from "../../config/upayaa"

interface CollectionListItemProps {
  collection: Collection
}

const CollectionListItem = ({ collection }: CollectionListItemProps) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <AddIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <collection.icon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={collection.title}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "text.primary", display: "inline" }}
            >
              {collection.description}
            </Typography>
            {" — I'll be in your neighborhood doing errands this…"}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

interface CollectionListProps {
  collections: Collection[]
}

const CollectionsList = ({ collections }: CollectionListProps) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Collections
      </Typography>
      <Paper>
        <List dense={true}>
          {collections.map((collection, i) => (
            <React.Fragment>
              <CollectionListItem key={i} collection={collection} />
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default CollectionsList
