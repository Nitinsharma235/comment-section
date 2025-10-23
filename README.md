# Comment System App

## Description
This is a simple React-based nested comment system with functionality for adding comments, nested replies, editing, deleting, voting, sorting, and filtering by author name. Each comment supports multiple levels of replies and dynamic updates.

## Features

### Add Comments
- Users can post comments by entering their name and message.  
- Each comment is assigned a unique ID, timestamp, and vote count (starts at 0).  

### Replies (Nested Comments)
- Users can reply to any comment or reply.  
- Replies appear directly below the parent comment.  
- Supports unlimited levels of nesting.  

### Edit & Delete
- Users can edit the text of any comment or reply.  
- Comments or replies can be deleted at any level of the thread.  

### Voting System
- Each comment or reply can be upvoted or downvoted.  
- Vote counts update dynamically.  

### Sorting
- Comments can be sorted by:
  - Newest – Most recent first  
  - Oldest – Earliest first  
  - Top Voted – Most upvoted comments first  

### Filter by Author
- Users can filter comments and replies by author name using a dropdown list.  
- Displays all comments and replies written by the selected author.  

## Technologies Used
- React.js  
- JavaScript (ES6)  
- CSS  


## How It Works
1. Users type a comment and their name, then click Comment to post it.  
2. Each comment displays buttons for Reply, Edit, Delete, Upvote, and Downvote.  
3. Replies can be added to any comment or reply (nested structure).  
4. Sorting and filtering options dynamically update visible comments.  


