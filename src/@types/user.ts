export type CollectionUser = {
  uid: string;
  username: string;
}

export type User = {
  uid: string;
  name: string;
  username: string;
  follow: CollectionUser;
  thumbnail: string;
}