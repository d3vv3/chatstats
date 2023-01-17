/**
 * @jest-environment jsdom
 */

import { fail } from 'assert';

import { mockTestPolarizedByContacts } from '../__utils__/utils';

import { getMessageCount, getCharCount, getWordCount } from '../modules/visualization/toolset';
  
  
test("Count messages" , () => {
    const polarizeByContacts = mockTestPolarizedByContacts();
    const messageCount = getMessageCount(polarizeByContacts);
    if (Object.keys(messageCount).length !== 3) fail("Expected each contact (3)");
    if (!Number.isInteger(Object.values(messageCount)[0])) fail("Expected message count to be a number");
    // console.info("Message count works fine");
});


test("Count words" , () => {
    const polarizeByContacts = mockTestPolarizedByContacts();
    const wordCount = getWordCount(polarizeByContacts);
    if (Object.keys(wordCount).length !== 3) fail("Expected each contact (3)");
    if (!Number.isInteger(Object.values(wordCount)[0])) fail("Expected word count to be a number");
    // console.info("Word count works fine");
});

test("Count characters" , () => {
    const polarizeByContacts = mockTestPolarizedByContacts();
    const charCount = getCharCount(polarizeByContacts);
    if (Object.keys(charCount).length !== 3) fail("Expected each contact (3)");
    if (!Number.isInteger(Object.values(charCount)[0])) fail("Expected character count to be a number");
    // console.info("Character count works fine");
});