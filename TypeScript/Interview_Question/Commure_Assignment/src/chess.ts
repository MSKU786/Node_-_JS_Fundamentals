import axios from 'axios';

console.log('Interview Setup');

/*
The Problem

Use https://lichess.org/api. No auth needed when using the public APIs! 

1. List the top 50 classical chess players and print their usernames.
2. For the top classical chess player, get their rating history over the last 30 days.
3. Now, create a CSV that shows the rating history for all 50 top classical chess players, for the last 30 days.
    1. The first column should be the player’s username.
    2. The 2nd column should be the player’s rating 30 days ago.
    3. The 3rd colu

*/

interface User {
  id: string;
  name: string;
  title: string;
}

interface GameData {
  name: string;
  points: PointsStructure[];
}

interface PointsStructure {
  year: number;
  month: number;
  day: number;
  rating: number;
}
interface PointsStructure {
  year: number;
  month: number;
}

let baseUrl = 'https://lichess.org/api';
// player/top/{nb}/{perfType}
const fetchTopNPlayers = async (nb: number, perfType: string) => {
  try {
    const response = await axios.get(`${baseUrl}/player/top/${nb}/${perfType}`);
    let users = response?.data?.users;
    if (!users) {
      throw new Error('Users not found');
    }
    // users = users.map(user => {id: user.id, name: user.username, title: user.title })
    printUsers(users);
    return users;
  } catch (err) {
    console.log(err);
  }
};

function getDateNDaysAgo(n: number) {
  let currentDate = new Date(); // Get the current date and time
  currentDate.setDate(currentDate.getDate() - n); // Subtract 'n' days from the current date
  return currentDate; // Return the new Date object
}

const lastNDaysRating = async (
  username: string,
  perfType: string,
  n: number
) => {
  try {
    console.log('line number 70');
    const response = await axios.get(
      `${baseUrl}/user/${username}/rating-history`
    );
    const data = response.data;
    //  console.log(data);
    //console.log(data);
    let prefData;
    for (let d of data) {
      if (d.name === perfType) {
        prefData = d;
      }
      console.log(d.name);
    }

    //console.log('Line number 81', prefData);
    return fetchNDaysRating(n, prefData);
  } catch (err) {}
};

const fetchNDaysRating = (n: number, prefData: GameData) => {
  let date = getDateNDaysAgo(n);
  //console.log(prefData, n);
  const cyear = date.getFullYear();
  const cmonth = date.getMonth();
  const cday = date.getDate();

  prefData.points.sort((b: any, a: any) => {
    if (a[0] != b[0]) return a[0] - b[0];
    else if (a[1] != b[1]) return a[1] - b[1];
    else return a[2] - b[2];
  });

  //console.log(prefData);

  for (let i = 0; i < prefData.points.length; i++) {
    let { year, month, day, rating } = prefData.points[i];

    if (year >= cyear && month >= cmonth && day >= cday) {
      continue;
    } else {
      if (i === 0) {
        return null;
      }
      return prefData.points[i - 1];
    }
  }
};

const printUsers = (users: any) => {
  for (let user of users) {
    console.log(user?.username);
  }
};

async function main() {
  const users = await fetchTopNPlayers(10, 'classical');
  // console.log(users);
  for (let user of users) {
    const ans = await lastNDaysRating(user.username, 'Classical', 60);
    console.log(ans);
  }
}

main();
