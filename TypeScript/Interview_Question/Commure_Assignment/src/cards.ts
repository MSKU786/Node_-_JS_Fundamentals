import axios from 'axios';

// Constants
const BASE_URL = 'https://www.deckofcardsapi.com/api/deck/';
const CARD_ORDER = [
  'ACE', '2', '3', '4', '5', '6', '7', 
  '8', '9', '10', 'JACK', 'QUEEN', 'KING'
] as const;

type CardValue = typeof CARD_ORDER[number];
type CardSuit = 'HEARTS' | 'DIAMONDS' | 'CLUBS' | 'SPADES';

interface ShuffleResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface Card {
  value: CardValue;
  suit: CardSuit;
}

class CardGame {
  private deckId: string | null = null;

  async initializeDeck(deckCount: number = 1): Promise<void> {
    try {
      const response = await axios.get<ShuffleResponse>(
        `${BASE_URL}/new/shuffle/?deck_count=${deckCount}`
      );
      this.deckId = response.data.deck_id;
    } catch (error) {
      throw new Error(`Failed to initialize deck: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async drawCards(count: number = 1): Promise<Card[]> {
    if (!this.deckId) {
      throw new Error('Deck not initialized');
    }

    try {
      const response = await axios.get<{ cards: Card[] }>(
        `${BASE_URL}/${this.deckId}/draw/?count=${count}`
      );
      return response.data.cards;
    } catch (error) {
      throw new Error(`Failed to draw cards: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  static sortCards(cards: Card[]): Card[] {
    return [...cards].sort(
      (a, b) => CARD_ORDER.indexOf(a.value) - CARD_ORDER.indexOf(b.value)
    );
  }

  static isStraight(cards: Card[], requiredLength: number = 5): boolean {
    if (cards.length < requiredLength) return false;
    
    const sorted = this.sortCards(cards);
    const uniqueValues = [...new Set(sorted.map(card => card.value))];
    
    // Check for consecutive values
    for (let i = 0; i <= uniqueValues.length - requiredLength; i++) {
      const slice = uniqueValues.slice(i, i + requiredLength);
      const isConsecutive = slice.every((val, idx) => 
        idx === 0 || CARD_ORDER.indexOf(val) === CARD_ORDER.indexOf(slice[idx-1]) + 1
      );
      
      if (isConsecutive) return true;
    }
    
    // Special case for Ace-low straight (A-2-3-4-5)
    const lowStraightValues = ['ACE', '2', '3', '4', '5'];
    if (uniqueValues.some(val => !lowStraightValues.includes(val))) return false;
    
    return lowStraightValues.every(val => 
      uniqueValues.includes(val as CardValue)
    );
  }

  async simulateGame(playerCount: number = 2): Promise<number | null> {
    if (!this.deckId) await this.initializeDeck();
    
    const players: Card[][] = Array.from({ length: playerCount }, () => []);
    const cardsToDraw = 52;
    const requiredForStraight = 5;
    
    try {
      const allCards = await this.drawCards(cardsToDraw);
      
      for (let i = 0; i < allCards.length; i++) {
        const playerIndex = i % playerCount;
        players[playerIndex].push(allCards[i]);
        
        if (
          players[playerIndex].length >= requiredForStraight &&
          CardGame.isStraight(players[playerIndex], requiredForStraight)
        ) {
          console.log(`Player ${playerIndex + 1} wins with a straight!`);
          return playerIndex + 1;
        }
      }
      
      console.log('No player achieved a straight');
      return null;
    } catch (error) {
      console.error('Game simulation failed:', error);
      throw error;
    }
  }
}

// Example usage
(async () => {
  try {
    const game = new CardGame();
    const winner = await game.simulateGame(4);
    console.log('Winner:', winner);
  } catch (error) {
    console.error('Error:', error);
  }
})();