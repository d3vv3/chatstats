/**
 * @jest-environment jsdom
 */

import { fail } from 'assert';

import { mockTestPolarizedByContacts, mockSuperString, mockWordList } from '../__utils__/utils';

import { getWordAvg, getCharAvg } from '../modules/visualization/toolset';
  
  
test("Word average" , () => {
    // const polarizeByContacts = mockTestPolarizedByContacts();
    // const wordList = mockWordList();
    // const wordAvg = getWordAvg(polarizeByContacts, wordList);
    // if (Object.keys(wordAvg).length !== 3) fail("Expected each contact (3)");
    // if (!Number(Object.values(wordAvg)[0]) === Object.values(wordAvg)[0] && Object.values(wordAvg)[0] % 1 !== 0()) fail("Expected word average to be a float");
    // console.info("Word average works fine");
});


test("Character average" , () => {
    // const polarizeByContacts = mockTestPolarizedByContacts();
    // const superString = mockSuperString();
    // const charAvg = getCharAvg(polarizeByContacts, superString);
    // if (Object.keys(charAvg).length !== 3) fail("Expected each contact (3)");
    // if (!Number(Object.values(charAvg)[0]) === Object.values(charAvg)[0] && Object.values(charAvg)[0] % 1 !== 0()) fail("Expected word average to be a float");
    // console.info("Char average works fine");
});