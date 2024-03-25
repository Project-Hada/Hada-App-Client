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
 *          
 *     - Bleed[]: stacks a single partition, and queues each partition, i.e.,
 *            e.g., say our first sessions was [hi, bye, why], I had a hard time with 'hi' and did well with bye and why
 *            bleed[]: ["bye","why","hi"] //pushed in this order
 *            my next partition is [cry, tie, dye], I do well with 'cry' and 'dye' but have a hard time with 'tie'
 *            bleed[]: ['cry','dye',"bye","why",'tie',"hi"]
 * 
 *            notice how cry and die go to the back of the queue while cry and dye move to the back.
 *            each partition will pop one element off from bleed
 *            bleed[] could be thought of as an importance heap queue
 * 
 *            the difficult words staying closer near the front of the heap
 *            though it's important to have a good weight to each of the difficult words don't hog the front of the queue
 *            so that words studied well are also studied represented not to far from when they were last studied
 *            
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
 * Z.) Simple Implementation:
 *          to determine a card's position during play
 *          example [hi, bye, why, cry, tie, dye]
 *          - hi.fail() send at most 3 spaces away
 *          [bye, why, hi, cry, tie, dye]
 *          - bye.pass() send at most 5 away 
 *          [why, hi, cry, tie, dye, bye]
 *          - why.pass()
 *          ....
 *          pass()
 *              will mark a card, 3 passing marks in a row to be removed from queue
 *              - pass: with 0 fails, send to back of queue
 *                otherwise send 5 spaces away if possible
 *          fail() allowed 3 strikes, if 3 strikes place at top of queue in bleed,
 *                 each strike allows
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

import React, { useContext } from "react";
import FlashcardContext from "../../../utils/contexts/LibraryContext";
import { FlashCardType, PlaylistType } from "../../../utils/types";

class Session {
  private currPlaylist: PlaylistType | null;
  private partition: FlashCardType[] = [];
  private bleedIndex: number = 0;

  constructor() {
    this.currPlaylist = useContext(FlashcardContext).currPlaylist;
  }

   /**
   * Determines if the user is able to grade based on the time since the last session.
   * @returns {boolean} True if grading is possible, false otherwise.
   */
  private canGrade(): boolean {
    const lastSession = this.currPlaylist?.lastSession || 0;
    const currentTime = Date.now();
    const sixteenHoursInMilliseconds = 16 * 60 * 60 * 1000;
    const timeDifference = currentTime - lastSession;
    return timeDifference <= sixteenHoursInMilliseconds;
  }

    /**
   * Creates a partition of flashcards to be studied in a session.
   * @param n - The number of flashcards to include in the partition.
   */
  private createPartition(n: number): void {
    this.bleedIndex = this.currPlaylist?.bleedArray.length || 0;
    const totalFlashcards = Object.keys(this.currPlaylist!.playlist).length;

    for (let i = 0; i < n && this.bleedIndex < totalFlashcards; i++) {
      const flashcardKey = Object.keys(this.currPlaylist!.playlist)[this.bleedIndex];
      const flashcard = this.currPlaylist!.playlist[flashcardKey];
      this.partition.push(flashcard);
      this.bleedIndex++;
    }
  }

   /**
   * Starts a new practice session by creating an initial partition of flashcards.
   * @param n - The number of flashcards to study in the session.
   * @returns {FlashCardType[]} The partition of flashcards for the session.
   */
  public startSession(n: number): FlashCardType[] {
    this.createPartition(n);
    return this.partition;
  }

  /**
   * e.g., say our first partition was [hi, bye, why], I had a hard time with 'hi' and did well with bye and why
   *       bleed[]: ["bye","why","hi"] //pushed in this order
   *       my next partition is [cry, tie, dye], I do well with 'cry' and 'dye' but have a hard time with 'tie'
   *       bleed[]: ['cry','dye',"bye","why",'tie',"hi"]
   * 
   */

  /**
   * Scenario: [hi, bye, why] i: 0
   * Check cards
   *
   */
  public pass(i: number): void {
    
  }

  public fail(i: number): void {

  }

  public next(): void {

  }
}

// Usage example:
// const sessionAlg = new SessionAlgorithm();
// sessionAlg.startSession(5);



