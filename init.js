const mongoose = require('mongoose')
let Post = require("./models/posts.js");
const Answer = require('./models/answers.js');

main()
.then(()=>{
    console.log("connected to database");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whyNot');
}

let posts = [
  {
    "question": "What is the best way to learn JavaScript?",
    "description": "Looking for resources and tips to master JavaScript.",
    "img": {
      "url": "https://source.unsplash.com/random/300x200?coding",
      "filename": "coding1.jpg"
    },
    "votes": [],
    "tags": ["JavaScript", "programming", "learning"],
    "answers": [],
    "owner": "67b09987880cfcb16174ce49",
    "createdAt": "Sat Feb 15 2025 19:14:03 GMT+0900"
  },
  {
    "question": "How to cook the perfect pasta?",
    "description": "Any tips for making pasta like a pro?",
    "img": {
      "url": "https://source.unsplash.com/random/300x200?pasta",
      "filename": "pasta1.jpg"
    },
    "votes": [],
    "tags": ["cooking", "pasta", "food"],
    "answers": [],
    "owner": "67b09987880cfcb16174ce49",
    "createdAt": "Sat Feb 15 2025 19:14:03 GMT+0900"
  },
  {
    "question": "What are the benefits of meditation?",
    "description": "Interested in starting meditation and want to know its benefits.",
    "img": {
      "url": "https://source.unsplash.com/random/300x200?meditation",
      "filename": "meditation1.jpg"
    },
    "votes": [],
    "tags": ["meditation", "wellness", "health"],
    "answers": [],
    "owner": "67b09987880cfcb16174ce49",
    "createdAt": "Sat Feb 15 2025 19:14:03 GMT+0900"
  },
  {
    "question": "How to improve your photography skills?",
    "description": "Tips and tricks to take better photos.",
    "img": {
      "url": "https://source.unsplash.com/random/300x200?photography",
      "filename": "photography1.jpg"
    },
    "votes": [],
    "tags": ["photography", "skills", "tips"],
    "answers": [],
    "owner": "67b09987880cfcb16174ce49",
    "createdAt": "Sat Feb 15 2025 19:14:03 GMT+0900"
  },
  {
    "question": "What is the best way to stay fit?",
    "description": "Looking for advice on staying fit and healthy.",
    "img": {
      "url": "https://source.unsplash.com/random/300x200?fitness",
      "filename": "fitness1.jpg"
    },
    "votes": [],
    "tags": ["fitness", "health", "exercise"],
    "answers": [],
    "owner": "67b09987880cfcb16174ce49",
    "createdAt": "Sat Feb 15 2025 19:14:03 GMT+0900"
  },
  {
    "question": "How to start a successful blog?",
    "description": "Advice and tips for starting a blog that people will read.",
    "img": {
      "url": "https://source.unsplash.com/random/300x200?blogging",
      "filename": "blogging1.jpg"
    },
    "votes": [],
    "tags": ["blogging", "writing", "online"],
    "answers": [],
    "owner": "67b09987880cfcb16174ce49",
    "createdAt": "Sat Feb 15 2025 19:14:03 GMT+0900"
  },
  {
    "question": "What are the must-read books of 2025?",
    "description": "Looking for book recommendations for this year.",
    "img": {
      "url": "https://source.unsplash.com/random/300x200?books",
      "filename": "books1.jpg"
    },
    "votes": [],
    "tags": ["books", "reading", "recommendations"],
    "answers": [],
    "owner": "67b09987880cfcb16174ce49",
    "createdAt": "Sat Feb 15 2025 19:14:03 GMT+0900"
  },
  {
    "question": "How to travel on a budget?",
    "description": "Tips and tricks for traveling without breaking the bank.",
    "img": {
      "url": "https://source.unsplash.com/random/300x200?travel",
      "filename": "travel1.jpg"
    },
    "votes": [],
    "tags": ["travel", "budget", "tips"],
    "answers": [],
    "owner": "67b09987880cfcb16174ce49",
    "createdAt": "Sat Feb 15 2025 19:14:03 GMT+0900"
  },
  {
    "question": "What are the best practices for remote work?",
    "description": "Advice for working efficiently from home.",
    "img": {
      "url": "https://source.unsplash.com/random/300x200?remotework",
      "filename": "remotework1.jpg"
    },
    "votes": [],
    "tags": ["remotework", "productivity", "tips"],
    "answers": [],
    "owner": "67b09987880cfcb16174ce49",
    "createdAt": "Sat Feb 15 2025 19:14:03 GMT+0900"
  },
  {
    "question": "How to learn a new language quickly?",
    "description": "Techniques and resources for fast language learning.",
    "img": {
      "url": "https://source.unsplash.com/random/300x200?language",
      "filename": "language1.jpg"
    },
    "votes": [],
    "tags": ["language", "learning", "tips"],
    "answers": [],
    "owner": "67b09987880cfcb16174ce49",
    "createdAt": "Sat Feb 15 2025 19:14:03 GMT+0900"
  }
]



  

async function insertData() {
    await Post.deleteMany({});

    Post.insertMany(posts)
    .then(()=>{
        console.log("data inserted successfully");
    })
    .catch((err)=>{
        console.log(err);
    })
}

let answers = [
  {
    "intuition": "It's essential to understand the difference between basic and advanced techniques.",
    "explanation": "By focusing on the core concepts, we can build a strong foundation and advance from there.",
    "img": {
      "url": "https://plus.unsplash.com/premium_vector-1730127163758-5e2a1b4ad2a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFuaW1hdGVkJTIwcHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D",
      "filename": "image1.jpg"
    },
    "reference": ["math", "basic", "education"],
    "createdAt": "1741632000000",
    "author": "67adf4d16f6eb6c50e0aae24",
    "votes": ["67adf4d16f6eb6c50e0aae24"]
  },
  {
    "intuition": "Think about how automation can save both time and effort.",
    "explanation": "Automation tools help us complete tasks faster and with less human error, improving overall productivity.",
    "img": {
      "url": "https://plus.unsplash.com/premium_vector-1730127163758-5e2a1b4ad2a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFuaW1hdGVkJTIwcHJvZmlzZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D",
      "filename": "image2.jpg"
    },
    "reference": ["productivity", "efficiency", "tools"],
    "createdAt": "1741536000000",
    "author": "67adf4d16f6eb6c50e0aae24",
    "votes": ["67adf4d16f6eb6c50e0aae24"]
  },
  {
    "intuition": "Understanding the structure of data is crucial in software development.",
    "explanation": "By analyzing data structures, we can optimize our code to be more efficient and easier to maintain.",
    "img": {
      "url": "https://plus.unsplash.com/premium_vector-1730127163758-5e2a1b4ad2a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFuaW1hdGVkJTIwcHJvZmlzZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D",
      "filename": "image3.jpg"
    },
    "reference": ["development", "code", "optimization"],
    "createdAt": "1741432000000",
    "author": "67adf4d16f6eb6c50e0aae24",
    "votes": ["67adf4d16f6eb6c50e0aae24"]
  },
  {
    "intuition": "Security should always be a priority when developing applications.",
    "explanation": "Building secure systems not only protects data but also ensures the integrity of the entire system.",
    "img": {
      "url": "https://plus.unsplash.com/premium_vector-1730127163758-5e2a1b4ad2a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFuaW1hdGVkJTIwcHJvZmlzZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D",
      "filename": "image4.jpg"
    },
    "reference": ["security", "development", "data"],
    "createdAt": "1741328000000",
    "author": "67adf4d16f6eb6c50e0aae24",
    "votes": ["67adf4d16f6eb6c50e0aae24"]
  },
  {
    "intuition": "It's important to stay updated with new trends in technology.",
    "explanation": "By keeping up with new technologies, we can apply the latest tools and methods to improve our projects.",
    "img": {
      "url": "https://plus.unsplash.com/premium_vector-1730127163758-5e2a1b4ad2a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFuaW1hdGVkJTIwcHJvZmlzZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D",
      "filename": "image5.jpg"
    },
    "reference": ["trends", "technology", "innovation"],
    "createdAt": "1741224000000",
    "author": "67adf4d16f6eb6c50e0aae24",
    "votes": ["67adf4d16f6eb6c50e0aae24"]
  }
];


// async function insertData() {
//   await Answer.deleteMany({});

//   Answer.insertMany(answers)
//   .then(()=>{
//       console.log("data inserted successfully");
//   })
//   .catch((err)=>{
//       console.log(err);
//   })
// }

insertData();
