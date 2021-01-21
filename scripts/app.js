//queries
const list = document.querySelector(".chat-list");
const chatForm = document.querySelector(".new-chat");
const nameForm = document.querySelector(".new-name");
const nameUpdateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

//adding chats to firebase/firestroe and updating the DOM
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chatForm.message.value.trim();
  chatroom.addChat(message).then(() => chatForm.reset());
});

//updating the name
nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = nameForm.name.value.trim();
  chatroom.updateName(newName);
  nameForm.reset();
  nameUpdateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => {
    nameUpdateMssg.innerText = "";
  }, 3000);
});

//updating the room
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear(list);
    chatroom.updateRoom(e.target.id);
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});

//class instances
const chatroom = new Chatroom("general");
const chatUI = new ChatUI(list);

//
chatroom.getChats((data) => chatUI.render(data));
