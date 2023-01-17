/**
 * @jest-environment jsdom
 */

import { fail } from 'assert';

import { mockSuperString, mockWordList } from '../__utils__/utils';

import { getWordList, getWordRepetition } from '../modules/visualization/helpers';
  
  
test("Word lists" , () => {
    const superString = mockSuperString();
    const wordList = getWordList(superString);
    if (Object.keys(wordList).length !== 3) fail("Expected each contact (3)");
    if (Object.values(wordList)[0].length === 0) fail("Expected to have some words");
    // console.info("Word list");
});

test("Word repetition" , () => {
    const wordList = mockWordList();
    const wordRepetition = getWordRepetition(wordList);
    if (Object.keys(wordRepetition).length === 0) fail("Expected some words to be repeated");
    if (!Number.isInteger(Object.values(wordRepetition)[0])) fail("Expected word repetition to be a number");
    // console.info("Words repetition");
});