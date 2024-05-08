export interface User {
  id:            number;             
  name:          string;
  surname:       string;
  email:         string;
  birthdate:     Date;
  password:      string;
  city:          string;
  pictureId:     string;
  pictureUrl:    string;
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