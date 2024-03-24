/**
 * Practice Session Algorithm:
 *
 * Example: [hi, bye, why, cry, tie, dye, lie, my, sigh, wifi]
 *
 * The algorithm will work in sessions, meaning it will take a portion
 * of the word set to first study, rather than studying everything at once.
 *
 * users will practice cards, if they do well those cards will trickle through each partition
 * if users had a difficult time with a partition, the partition will repeat with the cards that were difficult,
 * until they get them to move on to the next partition.
 *
 * during this session, the user's correct answers for a card determines their mastery level.
 * this will be determined by an exponential curved function that normalizes
 * users can only affect their mastery level in a session 16 hours a part from the last session to stop them from spamming.
 * 0.) using a set[] of cards, if less than 16 hours from last session, record the start time and enable grading
 * 1.) Create a partition[] is made
 * 2.) The user practices those cards
 * 3.) Cards studied well popped from partition[] pushed to the bleed[] array,
 *     Cards that are difficult stay in the partition[]
 *     Once the partition[] is empty we may create the next partition[]
 *          - Bleed[]: stacks a single partition, and queues each partition, i.e.,
 *            e.g., say our first sessions was [hi, bye, why], I had a hard time with 'hi' and did well with bye and why
 *            bleed[]: ["bye","why","hi"] //pushed in this order
 *            my next partition is [cry, tie, dye], I do well with 'cry' and 'dye' but have a hard time with 'tie'
 *            bleed[]: ['cry','dye',"bye","why",'tie',"hi"]
 *            notice how cry and die go to the back of the queue while cry and dye move to the back.
 *            each partition will pop one element off from bleed
 *            bleed[] could be thought of as an importance heap queue
 *            the difficult words staying closer near the front of the heap
 *            though it's important to have a good weight to each of the difficult words don't hog the front of the queue
 *            so that words studied well are also studied represented not to far from when they were last studied
 *            bleed should exist as a heap that grows with next card that's needed to be studied. 
 *            so when the user comes back to a session where they've already studied all the cards, the importance heap
 *            will act as the set[]. set[] is used to populate bleed[] for which the partition[] will use to test the 
 *            user for long term memory. 
 *            cards studied well live closer to the bottom of the heap, while difficult ones live near the top. 
 *
 * 4.) Create the next partition[] and include a popped element of bleed[]
 * 5.) continue from 1.) until there are no more cards.
 *      - Cases:
 *             * If there are less elements than the partition calls for
 *               in set[] fill the remaining partition with bleed[] elements
 *             * if the bleed[] set is empty the practice session is over
 * 6.) when restarting the session, do not grade mastery if the start time of the session is less than 16 hours from the last
 *     in this indefinite session, the card studied goes back into the importance heap queue with it's importance level. 
 * X.) There is a function that checks the last time studied and the time of today if >= 24 hours when the user enters the page
 *     the function applies a decay to the Grade calculation to each card, there is a floor parameter
 *     that can be altered to stop the decay from being too great
 *
 * Algorithm Parameters:
 * s[]: contains the set of cards
 * p[]: partition
 * b[]: bleed, a heap structure that determines the next card to study
 * h: number of cards that (h)ave been studied, serves as index
 * 
 * P(x: s[]): determines partition based on number of cards and cards stuck on
 * G(x: s[n]): determines grade for a card 
 * 
 * Playlist Parameters:
 * l: last started session, rewritten every new started session >= 16hours from last 
 * 
 * Card Parameters:
 * g: grade for a card showing level of mastery, > 0 implies it has been studied
 * 
 * 
 *
 * 
 *
 * g: (grade) cards must remember how well they've been studied, which would also implied if they've been studied
 *
 */

import { useContext } from "react";
import FlashcardContext from "../../../utils/contexts/LibraryContext";

const sessionAlgorithm = () => {
    const { currPlaylist } = useContext(FlashcardContext);
    
    const createPartition = (n: number) => {
        // Create the partition logic here
        const partition = [];
        // Assuming 's' is your source array of flashcards
        for (let i = 0; i < n; i++) {
            // Add logic to select flashcards and push them to the partition
            const flashcard = currPlaylist?.playlist[i]; // Example logic
            partition.push(flashcard);
        }
        return partition;
    };
    
    const canGrade = () => {
        // Assuming lastSession is a timestamp in milliseconds
        const lastSession = currPlaylist?.lastSession || 0; // Replace with the actual way you get this timestamp
        const currentTime = Date.now();
      
        // 16 hours in milliseconds
        const sixteenHoursInMilliseconds = 16 * 60 * 60 * 1000;
      
        // Calculate the difference
        const timeDifference = currentTime - lastSession;
      
        // Check if the difference is less than or equal to 16 hours
        return timeDifference <= sixteenHoursInMilliseconds;
    };
      
      
    const isAbleToGrade = canGrade();
    const n = 5; // The number of cards to study
    let partition = [];
    
    //possible start for loop
    if (!partition.length) {
        partition = createPartition(n);
    }


    
};

export default sessionAlgorithm;


