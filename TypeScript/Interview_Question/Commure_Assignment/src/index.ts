import axios from 'axios';

const baseURL = 'https://www.deckofcardsapi.com/api/deck/';
const cardOrder = [
  'ACE',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'JACK',
  'QUEEN',
  'KING',
];

interface ShuffleRespone {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface Cards {
  value: string;
  suit: string;
}

async function shuffleTheCard(count: number = 1): Promise<ShuffleRespone> {
  try {
    const response = await axios.get(
      `${baseURL}/new/shuffle/?deck_count=${count}`
    );

    const newShuffledDeck = response.data;

    return newShuffledDeck;
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong!');
  }
}

async function drawCards(deckId: string, count: number = 5): Promise<Cards[]> {
  if (!deckId) {
    throw new Error('DeckId not available');
  }

  const response = await axios.get(`${baseURL}/${deckId}/draw/?count=${count}`);

  const withdrawCardsData = response.data;

  const formattedCards = withdrawCardsData?.cards?.map((card: any) => {
    return { value: card.value, suit: card.suit };
  });

  //  console.log(formattedCards);
  return formattedCards;
}

function printCards(withDrawCards: Cards[]) {
  const sortedWithdrawCards = withDrawCards.sort(
    (a, b) => cardOrder.indexOf(a.value) - cardOrder.indexOf(b.value)
  );

  for (let card of sortedWithdrawCards) {
    const { value, suit } = card;
    console.log(`${value} of ${suit}`);
  }

  return sortedWithdrawCards;
}

const runSimulation = async (deckId: string, count: number = 1) => {
  try {
    const withDrawCards = await drawCards(deckId, count);
    return withDrawCards;
  } catch {
    throw new Error('Error while fetchign the data');
  }
};

async function simulateGame(n: number = 2) {
  const { deck_id } = await shuffleTheCard();
  const playerArray: Cards[][] = Array.from({ length: n }, () => []);
  const totalCards = 52;
  const allCards = await drawCards(deck_id, totalCards);

  for (let i = 0; i < totalCards; i++) {
    const currentPlayer = i % n;
    playerArray[currentPlayer].push(allCards[i]);
    // Only check for straight if player has at least 5 cards
    if (
      playerArray[currentPlayer].length >= 5 &&
      isStraightHand(playerArray[currentPlayer])
    ) {
      console.log('Winning hand:', playerArray[currentPlayer]);
      console.log('Player', currentPlayer + 1);
      return currentPlayer + 1;
    }
  }
  console.log('No player got a straight.');
  return null;
}

const isStraightHand = (cards: Cards[]) => {
  if (cards.length < 5) return false;
  // Sort a copy, don't mutate original
  const sorted = [...cards].sort(
    (a, b) => cardOrder.indexOf(a.value) - cardOrder.indexOf(b.value)
  );
  let continousCount = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (
      cardOrder.indexOf(sorted[i].value) -
        cardOrder.indexOf(sorted[i - 1].value) ===
      1
    ) {
      continousCount += 1;
      if (continousCount === 5) return true;
    } else if (
      cardOrder.indexOf(sorted[i].value) !==
      cardOrder.indexOf(sorted[i - 1].value)
    ) {
      continousCount = 1;
    }
  }
  return false;
};

console.log(simulateGame(4));
