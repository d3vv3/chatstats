import fs from "fs";
import path from "path";

import { faker } from '@faker-js/faker';


const loadTestChat = (name) => {
    const file = path.join("src/__mock__", name);
    // console.log(file);
    const content = fs.readFileSync(file, "utf8", function(err, data) {
        if (err) console.error(err);
        return data;
    });
    // console.log(content);
    return content;
}

function createMessageFromContact(contactName) {
    return {
      from: contactName,
      date: faker.date.past(),
      text: faker.hacker.phrase(),
      media_type: "undefined",
      type: "message"
    };
}

const mockTestParsedChat = () => {
    const chat = {name: "WhatsApp chat", messages: []};
    [faker.name.fullName(), faker.name.fullName(), faker.name.fullName()].forEach((contactName) => {
        [...Array(10).keys()].forEach(() => chat.messages.push(createMessageFromContact(contactName)));
        });
        return chat;
}
  
  
const mockTestPolarizedByContacts = () => {
    const polarizedByContacts = {};
    [faker.name.fullName(), faker.name.fullName(), faker.name.fullName()].forEach((contactName) => {
    polarizedByContacts[contactName] = [...Array(10).keys()].map(() => createMessageFromContact(contactName));
    });
    return polarizedByContacts;
}

const mockSuperString = () => {
    const superStrings = {};
    [faker.name.fullName(), faker.name.fullName(), faker.name.fullName()].forEach((contactName) => {
        superStrings[contactName] = faker.lorem.paragraph();
    });
    return superStrings;
};


const mockWordList = () => {
    const wordList = {};
    [faker.name.fullName(), faker.name.fullName(), faker.name.fullName()].forEach((contactName) => {
        wordList[contactName] = [...Array(100).keys()].map(() => faker.word.adjective())
    });
    return wordList;
};

export {
    loadTestChat,
    createMessageFromContact,
    mockTestParsedChat,
    mockTestPolarizedByContacts,
    mockSuperString,
    mockWordList
};