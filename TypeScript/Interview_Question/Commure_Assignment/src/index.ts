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
  const playerArray = new Array(n).fill(null).map(() => new Array());
  let currentPlayer = 0;
  let remainingCards = 52;
  while (remainingCards > 0) {
    const hand = await runSimulation(deck_id);
    playerArray[currentPlayer] = [...playerArray[currentPlayer], hand[0]];
    console.log(
      'Player',
      currentPlayer + 1,
      'Cards',
      playerArray[currentPlayer]
    );
    if (
      playerArray[currentPlayer]?.length >= 5 &&
      isStraightHand(playerArray[currentPlayer])
    ) {
      console.log(playerArray[currentPlayer]);
      console.log('Player', currentPlayer + 1);
      return currentPlayer + 1;
    }
    currentPlayer++;
    currentPlayer = currentPlayer % n;
    remainingCards--;
  }
}

const isStraightHand = (cards: Cards[]) => {
  let continousCount = 1;

  cards.sort((a, b) => cardOrder.indexOf(a.value) - cardOrder.indexOf(b.value));

  //console.log('cards in sorted order', cards);

  for (let i = 1; i < cards.length; i++) {
    if (
      cardOrder.indexOf(cards[i].value) -
        cardOrder.indexOf(cards[i - 1].value) ===
      1
    ) {
      continousCount += 1;
    } else {
      continousCount = 1;
    }

    if (continousCount == 5) return true;
  }

  return false;
};

console.log(simulateGame(4));
