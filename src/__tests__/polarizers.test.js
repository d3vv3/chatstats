/**
 * @jest-environment jsdom
 */


import { fail } from 'assert';

import { mockTestParsedChat, mockTestPolarizedByContacts } from '../__utils__/utils';

import { polarizeByContacts, polarizeByDay, polarizeByMonth, polarizeByHour } from "../modules/visualization/polarizers";
import { chatReplies } from '../modules/visualization/toolset';


test("Aggregate by contacts" , () => {
    const chat = mockTestParsedChat();
    const polarizedChat = polarizeByContacts(chat);
    if (Object.keys(polarizedChat).length !== 3) fail("Expected 3 keys in the chat and found none");
    if (polarizedChat[Object.keys(polarizedChat)[0]].length !== 10) fail("Expected 5 messages on each contact");
    // console.info("Polarize by contacts works fine")
});


test("Aggregate by month" , () => {
  const polarizeByContacts = mockTestPolarizedByContacts();
  const polarizedMonths = polarizeByMonth(polarizeByContacts);
  if (polarizedMonths.months.length === 0) fail("Expected at least one month");
  // console.info("Polarize by months works fine")
});


test("Aggregate by day" , () => {
  const polarizeByContacts = mockTestPolarizedByContacts();
  const polarizedDay = polarizeByDay(polarizeByContacts);
  if (polarizedDay.days.length !== 7) fail("Expected at least 1 weekday");
  // console.info("Polarize by weekdays works fine")
});

test("Aggregate by hour" , () => {
  const polarizeByContacts = mockTestPolarizedByContacts();
  const polarizedHour = polarizeByHour(polarizeByContacts);
  if (polarizedHour.hours.length !== 24) fail("Expected 24 hours");
  // console.info("Polarize by hour works fine")
});

test("Aggregate by conversation" , () => {
  const chat = mockTestParsedChat();
  const aggregateByConversation = chatReplies(chat);
  if (aggregateByConversation.length === 0) fail("Expected at least a starter message");
  // console.info("Polarize by contacts works fine")
});