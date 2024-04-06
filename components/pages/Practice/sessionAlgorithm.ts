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
 * Z.) Grading (Simple Implementation):
 *          to determine a card's position during play
 *          example [hi, bye, why, cry, tie, dye]
 *          - hi.fail() send at most 3 spaces away
 *          [bye, why, hi, cry, tie, dye]
 *          - bye.pass() send at most 5 away 
 *          [why, hi, cry, tie, dye, bye]
 *          - why.pass()
 *          ....
 *          pass()
 *              will mark a card, 3 passing passes in a row to be removed from queue
 *              - pass: with 0 fails, send to back of queue
 *                otherwise send 5 spaces away if possible
 *          fail() allowed 3 fails, if 3 fails place at top of queue in bleed,
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
 * g: (grade) cards must remember how well they've been studied, which would also implied if they've been studied
 *
 */

import { FlashCardType, PlaylistType } from "../../../utils/types";
import FlashcardContext from "../../../utils/contexts/LibraryContext";
import { useContext } from "react";

export class CardNode implements ICardNode {
    card: FlashCardType | undefined;
    passes: number;
    fails: number;
    aRow: number;
    next: CardNode | null;
    actionHistory: Array<{action: 'pass' | 'fail', passes: number, fails: number}>; // Action history stack

    constructor(card?: FlashCardType, passes: number = 0, fails: number = 0, aRow: number = 0, next: CardNode | null = null) {
        this.card = card;
        this.passes = passes;
        this.aRow = aRow;
        this.fails = fails;
        this.next = next;
        this.actionHistory = []; // Initialize empty history
    }

    // Method to add an action to the history
    addActionToHistory(action: 'pass' | 'fail') {
        this.actionHistory.push({ action, passes: this.passes, fails: this.fails });
    }

    // Method to revert the last action
    undoLastAction(): void {
        const lastAction = this.actionHistory.pop();
        if (lastAction) {
            this.passes = lastAction.passes;
            this.fails = lastAction.fails;
        }
    }

    // Method to create a deep clone of the CardNode, including actionHistory.
    clone(): CardNode {
        const clonedNode = new CardNode(this.card, this.passes, this.fails, undefined);
        clonedNode.actionHistory = [...this.actionHistory]; // Assuming deep clone isn't needed for actionHistory contents
        return clonedNode;
    }

    get difficultyScore(): number {
        // An example calculation; modify this as needed.
        return this.fails - this.passes;
    }

    toString() {
        return `[${this.card?.term},${this.card?.definition}]`
    }
}

// note: keep in mind we also know if i card has been studied or not if fails and passes are 0
// make study sessions atomic safe only save one loop, if not finished do not save
export class Session {
  
    private currPlaylist: PlaylistType | null;
    private currPlaylistLength: number;
    private partitionHead: CardNode; // Represents the fake head of the linked list for partition.
    private partitionLength: number;
    private bleedQueue: CardNode; // Holds the nodes after passing, null if empty.
    private bleedLength: number; // Track the length of the bleedQueue.
    private partitionSize: number;
    private failedQueueIncrement: number; // how far a failed card gets pushed in a queue
    private passedQueueIncrement: number; // how far a passed card gets pushed in a partition
    private numNewCardsPartition: number; //number of new cards per partition
    private numOfStrikes: number; //number of strikes for bad grade and higher bleed queue priority
    private numInARow: number; //number of times they get it in a row to pass the card for partition
    private numOfLoops: number; //the number of times a user has studied their deck in one session a user has done
    private numOfStudiedInSession: number;
    private reinsertBloodQueueIncrement: number;
    private updateFlashcard; // functions from practice that update library context
    private updatePlaylist; // functions from practice that update library context
    private partitionSnapshots: Array<{
        head: CardNode,
        length: number,
        bleedLength: number,
        bleedQueueHead: CardNode // Add this property
    }> = [];

  constructor(currPlaylist: PlaylistType | null, updateFlashcard: any, updatePlaylist: any) {
    this.currPlaylist = currPlaylist;
    this.updateFlashcard = updateFlashcard;
    this.updatePlaylist = updatePlaylist;
    this.currPlaylistLength = Object.keys(this.currPlaylist!.playlist).length;
    this.partitionHead = new CardNode(); // Dummy head for partition
    this.partitionLength = 0;
    this.partitionSize = 6;
    this.numOfStrikes = 3;
    this.passedQueueIncrement = 4;
    this.numNewCardsPartition = 2;
    this.failedQueueIncrement = 2;
    this.numOfStudiedInSession = 0;
    this.reinsertBloodQueueIncrement = 4;
    this.numInARow = 2;
    this.numOfLoops = 0; //starts off -1 if session hasn't created a partition yet
    this.bleedQueue = new CardNode(); // Initialize bleedQueue with a dummy head if not present
        this.bleedLength = 0;
    if (currPlaylist && currPlaylist.bleedQueue) {
        this.IDArrayToBleedQueue(currPlaylist.bleedQueue); // Directly use the bleedQueue if it exists
        // Use the stored bleedQueueLength if available; otherwise, calculate dynamically
        this.bleedLength = currPlaylist.bleedQueue.length;
    }
  }

    public startSession(): CardNode {
    // Reset the length when starting a new session.
    this.partitionLength = 0;
    this.createPartition(); 
    return this.partitionHead;
    }

    // Method to add a card to the bleedQueue based on its difficultyScore.
    /**
   * Adds a node to the bleedQueue, sorting by difficulty.
   * @param node - The node to add to the bleedQueue.
   */
    private addToBleedQueue(node: CardNode): void {
        // Start from the dummy head
        let current = this.bleedQueue;
 
        // Since we're using a dummy head, current will never be null.
        // Sort nodes based on the difficultyScore instead of just fails.
        while (current.next && current.next.difficultyScore <= node.difficultyScore) {
            current = current.next;
        }
    
        // Insert the node into the bleedQueue, maintaining sort order by difficultyScore.
        node.next = current.next;
        current.next = node;
    
        this.bleedLength++; // Increment the length of the bleedQueue.
    }
  
    private createPartition(): void {
        this.partitionHead.next = null;
        this.partitionLength = 0;
    
        let newCardsAdded = 0;
        // Add two new cards first
        while (newCardsAdded < this.numNewCardsPartition && this.bleedLength < this.currPlaylistLength) {
            const flashcardKey = Object.keys(this.currPlaylist!.playlist)[this.bleedLength + newCardsAdded];
            if (flashcardKey) {
                const flashcard = this.currPlaylist!.playlist[flashcardKey];
                const newNode = new CardNode(flashcard);
                this.addToPartition(newNode); // Add the new card to the partition
                newCardsAdded++;
            }
        }

        
        // Then fill the rest with bleedQueue cards if available, or continue adding new cards
        for (let i = newCardsAdded; i < this.partitionSize; i++) {
            if (this.bleedQueue.next !== null) {
                // Add the next bleedQueue card to the partition
                const bleedNode = this.bleedQueue.next;
                bleedNode.aRow = 0;
                // reinsert into the queue 
                this.reinsertNodeInBleedQueue(bleedNode, this.reinsertBloodQueueIncrement);
                this.addToPartition(bleedNode); // Add to the partition
            } else {
                // No more cards in bleedQueue, add the next new card from the playlist
                const flashcardKey = Object.keys(this.currPlaylist!.playlist)[this.bleedLength + i];
                if (flashcardKey) {
                    const flashcard = this.currPlaylist!.playlist[flashcardKey];
                    const newNode = new CardNode(flashcard);
                    this.addToPartition(newNode); // Add the new card to the partition
                }
            }
        }
    }
    
    private addToPartition(node: CardNode): void {
        let current = this.partitionHead;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = node; // Append the node to the end of the partition
        this.partitionLength++; // Increment the count of nodes in the partition
    }

  /**
 * Helper method to reinsert a node in the bleed queue.
 * @param node - The card node to reinsert.
 * @param positions - The number of positions to move the card back in the bleed queue.
 */
private reinsertNodeInBleedQueue(node: CardNode, positions: number): void {
    // Ensure the node's next is cleared to avoid inadvertently linking unintended parts of the list.
    node.next = null;

    // Ensure positions are within bounds.
    positions = Math.min(positions, this.bleedLength);

    let current = this.bleedQueue; // Start from the dummy head of the bleed queue.
    
    // Find the insertion point.
    while (positions > 0 && current.next) {
        current = current.next;
        positions--;
    }

    // Insert the node into the bleed queue at the determined point.
    node.next = current.next;
    current.next = node;

    // Adjust the bleed length since we've added a node.
    this.bleedLength++;
}


  /**
   * Helper method to reinsert a node in the partition.
   * @param node - The card node to reinsert.
   * @param positions - The number of positions to move the card back in the partition.
   */
  private reinsertNode(node: CardNode, positions: number): void {
    // Ensure positions are within bounds.
    positions = Math.min(positions, this.partitionLength);

    let current = this.partitionHead;
    // Find the insertion point.
    while (positions > 0 && current.next) {
      current = current.next;
      positions--;
    }

    // Reinsert the node.
    node.next = current.next;
    current.next = node;
    this.partitionLength++;
    }

    public pass(): void {
        this.savePartitionState();
        if (!this.partitionHead.next) {
            return; // No cards to pass.
        }
        // Remove the card node from the partition.
        let passedCardNode = this.partitionHead.next;
        this.partitionHead.next = passedCardNode.next;
        passedCardNode.next = null;
        this.partitionLength--;
        passedCardNode.addActionToHistory('pass');

        // Check if the card has passed enough times to be moved to the bleedQueue.
        if (passedCardNode.aRow >= this.numInARow) {
            // If it has passed sufficiently, add it to the bleedQueue.
            this.addToBleedQueue(passedCardNode);
            this.numOfStudiedInSession++;
            if(this.numOfStudiedInSession % this.currPlaylistLength === 0) {
                this.numOfLoops++;
                this.updateState();
            }
        } else {
            // Increment the pass count for the card.
            passedCardNode.passes++;
            passedCardNode.aRow++;

            // Reinsert the card into the partition.
            this.reinsertNode(passedCardNode, this.passedQueueIncrement);
        }

        if(!this.partitionLength) {
            this.createPartition();
        }

    }

    public fail(): void {
        this.savePartitionState();
        if (!this.partitionHead.next) {
            return; // No cards to fail.
        }

        let failedCardNode = this.partitionHead.next; // The node to process.
        this.partitionHead.next = failedCardNode.next; // Remove the node from its current position.
        failedCardNode.next = null;
        this.partitionLength--;
        failedCardNode.addActionToHistory('fail');

        failedCardNode.aRow = 0; // Reset the passes due to failure.
        failedCardNode.fails++; // Increment the fails.

        if (failedCardNode.fails >= this.numOfStrikes) {
        // If the card has 3 fails, it moves to the front of the bleed queue.
        }
        // Otherwise, move it back by up to 3 spaces.
        this.reinsertNode(failedCardNode, this.failedQueueIncrement);
    
    }

    // Method to save a snapshot of the current partition state along with the bleed queue
    private savePartitionState(): void {
        const partitionClone = this.cloneLinkedList(this.partitionHead);
        const bleedQueueClone = this.cloneLinkedList(this.bleedQueue);

        // Save the cloned lists and current lengths
        this.partitionSnapshots.push({
            head: partitionClone,
            length: this.partitionLength,
            bleedLength: this.bleedLength,
            bleedQueueHead: bleedQueueClone // Save the state of the bleedQueue as well
        });
    }

    // Method to restore the last saved partition state along with the bleed queue
    public undoLastAction(): void {
        const lastSnapshot = this.partitionSnapshots.pop();
        if (lastSnapshot) {
            this.partitionHead = lastSnapshot.head;
            this.partitionLength = lastSnapshot.length;
            this.bleedQueue = lastSnapshot.bleedQueueHead; // Restore the bleedQueue
            this.bleedLength = lastSnapshot.bleedLength;
        }
    }

    // Helper method to clone a linked list
    private cloneLinkedList(head: CardNode): CardNode {
        const dummyHead = new CardNode(); // New dummy head for the cloned list
        let current = head.next; // Start from the actual first element
        let cloneCurrent = dummyHead;
        while (current) {
            cloneCurrent.next = current.clone();
            cloneCurrent = cloneCurrent.next;
            current = current.next;
        }
        return dummyHead; // Return the dummy head of the cloned list
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
     * Retrieves the first actual element of the partition linked list, bypassing the dummy head.
     * @returns The first real CardNode in the partition, or null if the partition is empty.
     */
    public getPartitionHead(): CardNode | null {
        return this.partitionHead.next;
    }

    /**
    * Gets the length of the current partition.
    * @returns {number} The number of cards in the current partition.
    */
    public getPartitionLength(): number {
        return this.partitionLength;
    }

    public getNumOfStudiedInSession(): number {
        return this.numOfStudiedInSession;
    }

    public getNumOfLoops(): number {
        return this.numOfLoops;
    }

    public getCurrPlaylistLength(): number {
        return this.currPlaylistLength;
    }

    public getAllFlashcards(): Array<FlashCardType> {
        let flashcards: Array<FlashCardType> = [];
    
        // Traverse the partition linked list
        let current = this.partitionHead.next; // Start after the dummy head
        while (current) {
            if (current.card) {
                flashcards.push(current.card); // Add the flashcard to the array
            }
            current = current.next; // Move to the next node
        }
    
        // Traverse the bleedQueue linked list
        current = this.bleedQueue.next; // Start after the dummy head
        while (current) {
            if (current.card) {
                flashcards.push(current.card); // Add the flashcard to the array
            }
            current = current.next; // Move to the next node
        }
    
        return flashcards; // Return the array of flashcards
    }    

    public bleedQueueToIDArray(): Array<String> {
        let array = [];
        let current = this.bleedQueue.next; // Start from the first actual node in the bleedQueue
        while (current !== null) {
            array.push(current.card!.id); // Add the current node to the array
            current = current.next; // Move to the next node
        }
        return array;
    }

    public IDArrayToBleedQueue(array: Array<string>): void {
        // Reset the bleedQueue and its length.
        this.bleedQueue = new CardNode(); // Reinitialize with a dummy head.
        this.bleedLength = 0; // Reset the length since we're rebuilding the queue.
    
        console.log(array.toString());
        console.log(this.currPlaylist)
        console.log("bruh")

        array.forEach(id => {
            // Assuming 'playlist' is accessible and contains all cards.
            const flashCard = this.currPlaylist?.playlist[id];
            if (flashCard) {
                // Create a new node for each flashcard.
                const newNode = new CardNode(flashCard, flashCard.passes, flashCard.fails);
                // Use addToBleedQueue to insert the node into the queue in sorted order.
                this.addToBleedQueue(newNode);
            }
        });
    }
    
    
    

    /**
     * Gets the length of the bleed queue.
     * @returns {number} The number of cards in the bleed queue.
     */
    public getBleedLength(): number {
        return this.bleedLength;
    }

    /**
     * Gets the length of the partition size.
     * @returns {number} The number of the partition size.
     */
    public getPartitionSize(): number {
        return this.partitionSize;
    }

    public updateState(): void {

        if (this.currPlaylist) {
            // Assuming currentSession can give us the updated cards and bleedQueue
            const updatedFlashcards = this.getAllFlashcards();
      
            updatedFlashcards.forEach((card) => {
              // Update each card with new passes and fails count
              this.updateFlashcard(this.currPlaylist!.id, card!.id, {
                ...card,
                passes: card.passes,
                fails: card.fails,
              });
            });
            console.log("000000000000000000!", this.bleedQueueToIDArray());
            console.log("000000000000000000!", this.bleedLength);
            console.log("9999999999999999!", this.toString());
            this.updatePlaylist(this.currPlaylist.id, {
              bleedQueue: this.bleedQueueToIDArray(),
            });
      
            console.log(this.currPlaylist.bleedQueue);
        }
    
    }



    /**
     * Generates a string representation of the current state of the SessionAlgorithm, including
     * the properties of interest and the contents of both the partition and the bleedQueue.
     * @returns A string detailing the current state and contents of the partition and bleedQueue.
     */
    public toString(): string {
        let str = `Current Playlist: ${this.currPlaylist ? 'Present' : 'Null'}\n`;
        str += `Current Playlist Length: ${this.currPlaylistLength}\n`;
        str += `Partition Length: ${this.partitionLength}\n`;
        str += `BleedQueue Length: ${this.bleedLength}\n`;
        str += `Partition Size: ${this.partitionSize}\n`;
        str += `Failed Queue Increment: ${this.failedQueueIncrement}\n`;
        str += `Passed Queue Increment: ${this.passedQueueIncrement}\n`;
        str += `New Cards Per Partition: ${this.numNewCardsPartition}\n`;
        str += `Number of Strikes: ${this.numOfStrikes}\n`;
        str += `Passes In A Row Needed: ${this.numInARow}\n`;
        str += `Number of Loops Through Deck: ${this.numOfLoops}\n`;
        str += `Number of Cards Studied In Session: ${this.numOfStudiedInSession}\n`;
    
        str += "Partition Contents: ";
        let current = this.partitionHead.next; // Skip dummy head
        while (current) {
            str += `${current.card ? current.toString() : 'Empty Node'} -> `;
            current = current.next;
        }
        str += "End\n";
    
        str += "BleedQueue Contents: ";
        current = this.bleedQueue.next; // Assuming bleedQueue also has a dummy head
        while (current) {
            str += `${current.card ? current.toString() : 'Empty Node'} -> `;
            current = current.next;
        }
        str += "End\n";
    
        // str += "Partition Snapshots: ";
        // this.partitionSnapshots.forEach((snapshot, index) => {
        //     str += `[Snapshot ${index + 1}: Length = ${snapshot.length}, BleedLength = ${snapshot.bleedLength}] `;
        // });
        // str += this.partitionSnapshots.length > 0 ? "" : "No snapshots recorded.\n";
    
        return str;
    }
    
}

export interface ICardNode {
    // Holds the flashcard data.
    card: FlashCardType | undefined;

    // Counts the number of times the card has been passed.
    passes: number;

    // Counts the number of times the card has failed.
    fails: number;

    // How many times in a row a card was correct in a partition
    aRow: number;

    // Points to the next card node in the linked list.
    next: ICardNode | null;

    // Keeps a history of actions taken on this card, along with the pass and fail counts at the time of action.
    actionHistory: Array<{
        action: 'pass' | 'fail', // The action taken ('pass' or 'fail').
        passes: number,          // The number of passes at the time of action.
        fails: number            // The number of fails at the time of action.
    }>

    // Records an action ('pass' or 'fail') to the card's history.
    addActionToHistory(action: 'pass' | 'fail'): void;

    // Removes the most recent action from the card's history.
    undoLastAction(): void;

    // Creates a copy of the card node, useful for duplicating the node without affecting the original.
    clone(): ICardNode;

    // A read-only property that calculates and returns a difficulty score based on the card's history.
    readonly difficultyScore: number;

    // Returns a string representation of the card node for easy logging or debugging.
    toString(): string;
}

// Usage example:
// const sessionAlg = new SessionAlgorithm();
// sessionAlg.startSession(5);



