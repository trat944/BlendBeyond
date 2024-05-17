export interface User {
  id:            number;             
  name:          string;
  surname:       string;
  email:         string;
  birthdate:     Date;
  age:           number;
  password:      string;
  city:          string;
  sex:           string;
  lookingFor:    string;
  pictureId:     string;
  pictureUrl:    string;
  likedUsers:    LikedUsers[];
  likedBy:       LikedUsers[];
  dislikedUsers: DislikedUsers[];
  dislikedBy:    DislikedUsers[];
  foodImage:     string;
  song:          Song;
  book:          Book;
  place:         string;
  destination:   string;
  bucketlList:   { [key: string]: string };
  createAt: Date
  updateAt: Date
}

export interface LikedUsers {
  id: string,
  fromId: string,
  toId: string,
  createdAt: string
}

export interface DislikedUsers {
  id: string,
  fromId: string,
  toId: string,
  createdAt: string
}

export interface Book {
  author: string;
  name:   string;
}

export interface Song {
  artist: string;
  name:   string;
}