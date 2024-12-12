export type Action = {
  label: string
  action: string
}

export type Field<Type> = {
  name: string
  label: string
  type: Type
  read_api: string
  update_api: string
  delete_api: string
  create_api: string
}
