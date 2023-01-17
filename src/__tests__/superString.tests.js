/**
 * @jest-environment jsdom
 */

import { fail } from 'assert';

import { mockTestPolarizedByContacts } from '../__utils__/utils';

import { getSuperStrings } from '../modules/visualization/helpers';


test("Create super string from all messages from each contact" , () => {
    const polarizeByContacts = mockTestPolarizedByContacts();
    const superStrings = getSuperStrings(polarizeByContacts);
    if (Object.keys(superStrings).length !== 3) fail("Expected a super string for each contact");
    if (typeof Object.values(superStrings)[0] !== "string") fail("Expected super string to be a string");
    // console.info("Super string works fine");
});