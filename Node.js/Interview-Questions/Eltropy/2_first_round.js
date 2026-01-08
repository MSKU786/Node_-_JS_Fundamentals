// Problem

// Given a list of intervals, merge all the overlapping intervals to produce a list that has only mutually exclusive intervals.

// Example 1:
// Intervals: [[1,4], [2,5], [7,9]]
// Output: [[1,5], [7,9]]
// Explanation: Since the first two intervals [1,4] and [2,5] overlap, we merged them into
// one [1,5].

// Example 2:
// Intervals: [[6,7], [2,4], [5,9]]
// Output: [[2,4], [5,9]]
// Explanation: Since the intervals [6,7] and [5,9] overlap, we merged them into one [5,9].

// Example 3:
// Intervals: [[1,4], [2,6], [3,5]]
// Output: [[1,6]]
// Explanation: Since all the given intervals overlap, we merged them into one.

// : [[1,4], [2,5], [7,9]]

// Solution:

const intervals = [
  [7, 9],
  [1, 5],
  [1, 4],
  [2, 6],
  [3, 5],
  [10, 11],
];

function mergeInterval(intervals) {
  let n = intervals.length;

  intervals.sort((a, b) => a[0] - b[0]);
  const ans = [];

  let current = intervals[0];

  for (let i = 1; i < n; i++) {
    if (intervals[i][0] <= current[1]) {
      current[1] = Math.max(current[1], intervals[i][1]);
    } else {
      ans.push(current);
      current = intervals[i];
    }
  }

  ans.push(current);
  console.log(ans);
}

mergeInterval(intervals);


/*


Design Facebook Timeline

A facebook timeline is the constantly updating list of stories in the middle of Facebook’s homepage. It includes status updates, photos, videos, links, app activity, and ‘likes’ from people, pages, and groups that a user follows on Facebook. 

Functional requirements
Newsfeed will be generated based on the posts from the people, pages, and groups that a user follows.
A user may have many friends and follow a large number of pages/groups.
Feeds may contain images, videos, or just text.
Our service should support appending new posts as they arrive to the newsfeed for all active users.


Core entities:

User:
	Id
	Name
	numberOfFriends
	

Friends : 
1 -> 2
2  -> 1
User id => userId 


Post:
	post-Id
	Content;
	User_id
           Created_at
	
Page
	Page_id
	Admin_user
	


v1/getFeed/ {

}

Feed table {
	User => {}
}


Post /v1/postContent
 {
	Content: 
}



-> post service => queue -> worker (fetch the user friend details) -> fanout this event to all the users() -> batch job => 

Ke value {
	user 1 -> [new_post_id, -post_id, post_id, post_id]
}
		
		

Hybrid approach ====> cache ()

Celebrity => {100} -> fetch the latest post()
		

