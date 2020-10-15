const {
  getPolarizedChat,
} = require("../../../modules/visualization/polarizer.js");

testChatObject = {
  chat: "Test chat",
  messages: [
    {
      date: Date("1999-08-21T01:20"),
      from: "Tester 1",
      media_type: null,
      photo: null,
      text: "This is a test message 1",
      type: "message",
    },
    {
      date: Date("1999-08-21T01:21"),
      from: "Tester 2",
      media_type: null,
      photo: null,
      text: "This is test message 2",
      type: "message",
    },
    {
      date: Date("1999-08-21T01:22"),
      from: "Tester 3",
      media_type: null,
      photo: null,
      text: "This is test message 3",
      type: "message",
    },
    {
      date: Date("1999-08-21T01:23"),
      from: "Tester 1",
      media_type: null,
      photo: null,
      text: "This is test message 4",
      type: "message",
    },
  ],
};

test("Polarizer contact chat", () => {
  expect(getPolarizedChat(testChatObject)).toBe({
    "Tester 1": [
      {
        date: Date("1999-08-21T01:20"),
        from: "Tester 1",
        media_type: null,
        photo: null,
        text: "This is a test message 1",
        type: "message",
      },
      {
        date: Date("1999-08-21T01:23"),
        from: "Tester 1",
        media_type: null,
        photo: null,
        text: "This is test message 4",
        type: "message",
      },
    ],
    "Tester 2": [
      {
        date: Date("1999-08-21T01:21"),
        from: "Tester 2",
        media_type: null,
        photo: null,
        text: "This is test message 2",
        type: "message",
      },
    ],
    "Tester 3": [
      {
        date: Date("1999-08-21T01:22"),
        from: "Tester 3",
        media_type: null,
        photo: null,
        text: "This is test message 3",
        type: "message",
      },
    ],
  });
});
