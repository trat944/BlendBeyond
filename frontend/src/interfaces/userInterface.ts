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
  createAt: Date
  updateAt: Date
}

export interface Book {
  author: string;
  name:   string;
}

export interface Song {
  artist: string;
  name:   string;
}