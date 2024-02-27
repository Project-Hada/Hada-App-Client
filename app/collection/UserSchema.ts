export class UserSchema {
  username: String
  dateJoined: String
  ownedDecks: []

  constructor ( username : String, dateJoined : String, ownedDecks : [] ) {
    this.username = username;
    this.dateJoined = dateJoined;
    this.ownedDecks = ownedDecks;
  }
}

export const userConverter = {
  toFirestore: (user : UserSchema) => {
      return {
          username: user.username,
          dateJoined: user.dateJoined,
          ownedDeck: user.ownedDecks
          };
  },
  fromFirestore: (snapshot : any, options : any) => {
    const data = snapshot.data(options);
    return new UserSchema(data.username, data.dateJoined, data.ownedDecks);
  }
};