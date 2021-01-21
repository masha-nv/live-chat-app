//add new chat objects to the chat collection
//provide real time updates
//update username when person types into the username input field
//update chatrooms when user switches the rooms;

class Chatroom {
  constructor(room, username = "anon") {
    this.room = room;
    this.username = localStorage.getItem("username") || username;
    this.chats = db.collection("chats");
    this.unsub;
  }
  async addChat(message) {
    //format a chat obj
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callback(change.doc.data());
            console.log("new chat added");
          } else if (change.type === "removed") {
            console.log("chat removed");
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    this.unsub && this.unsub();
  }
}
