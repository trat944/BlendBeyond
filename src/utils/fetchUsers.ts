export interface User {
  name:          string;
  surname:       string;
  username:      string;
  email:         string;
  password:      string;
  city:          string;
  selfImage:     string;
  foodImage:     string;
  song:          Song;
  book:          Book;
  place:         string;
  destination:   string;
  bucketlList:   { [key: string]: string };
}

export interface Book {
  author: string;
  name:   string;
}

export interface Song {
  artist: string;
  name:   string;
}

export const fetchUsers = async() => {
  const response = await fetch('/src/data/users.json');
  const data: User[] = await response.json();
  return data;
}

