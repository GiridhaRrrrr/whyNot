const mongoose = require('mongoose')
let Post = require("./models/posts.js");
const Answer = require('./models/answers.js');

const url = process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connected to database");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(url);
}

const posts = [
  {
      question: "What are the impacts of climate change?",
      description: "How is climate change affecting our environment and daily lives?",
      img: {
          url: "https://images.unsplash.com/photo-1570095378004-ce65d6c2d5bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsaW1hdGUlMjBjaGFuZ2V8ZW58MHx8MHx8fDA%3D",
          filename: "climate_change.jpg",
      },
      votes: [],
      tags: ["Climate Change", "Environment"],
      answers: [],
      owner: "67b9b706398c2a0934b3af96",
      createdAt: Date.now(),
  },
  {
    question: "What are the benefits of electric vehicles?",
    description: "Discuss the advantages of using electric cars over conventional vehicles.",
    img: {
        url: "https://plus.unsplash.com/premium_photo-1664283228670-83be9ec315e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWxlY3RyaWMlMjB2ZWNoaWNsZXN8ZW58MHwwfDB8fHww",
        filename: "electric_vehicles.jpg",
    },
    votes: [],
    tags: ["Electric Vehicles", "Technology"],
    answers: [],
    owner: "67b9b706398c2a0934b3af96",
    createdAt: Date.now(),
  },
  {
      question: "How does plastic pollution impact marine life?",
      description: "Discuss the effects of plastic waste on ocean ecosystems.",
      img: {
          url: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhc3RpYyUyMHBvbGx1dGlvbnxlbnwwfHwwfHx8MA%3D%3D",
          filename: "plastic_pollution.jpg",
      },
      votes: [],
      tags: ["Plastic Pollution", "Marine Life"],
      answers: [],
      owner: "67b9b706398c2a0934b3af96",
      createdAt: Date.now(),
  },
  {
      question: "What is the significance of renewable energy sources?",
      description: "Explain the importance and benefits of using renewable energy.",
      img: {
          url: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVuZXdhYmxlJTIwZW5lcmd5fGVufDB8fDB8fHww",
          filename: "renewable_energy.jpg",
      },
      votes: [],
      tags: ["Renewable Energy", "Sustainability"],
      answers: [],
      owner: "67b9b706398c2a0934b3af96",
      createdAt: Date.now(),
  },
  {
      question: "How does urbanization affect wildlife?",
      description: "Examine the consequences of expanding urban areas on wildlife habitats.",
      img: {
          url: "https://images.unsplash.com/photo-1516628368662-4220aaf9339d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdpbGRsaWZlfGVufDB8MHwwfHx8MA%3D%3D",
          filename: "urbanization_wildlife.jpg",
      },
      votes: [],
      tags: ["Urbanization", "Wildlife"],
      answers: [],
      owner: "67b9b706398c2a0934b3af96",
      createdAt: Date.now(),
  },
  {
      question: "What are the challenges of space exploration?",
      description: "Discuss the difficulties and advancements in space exploration.",
      img: {
          url: "https://plus.unsplash.com/premium_photo-1720965218422-0ad3befa4198?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BhY2UlMjBleHBsb3Npb258ZW58MHwwfDB8fHww",
          filename: "space_exploration.jpg",
      },
      votes: [],
      tags: ["Space Exploration", "Technology"],
      answers: [],
      owner: "67b9b706398c2a0934b3af96",
      createdAt: Date.now(),
  },
  {
      question: "How does deforestation contribute to climate change?",
      description: "Analyze the relationship between deforestation and global warming.",
      img: {
          url: "https://plus.unsplash.com/premium_photo-1661814320476-721abd8135a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVmb3Jlc3RhdGlvbnxlbnwwfDB8MHx8fDA%3D",
          filename: "deforestation.jpg",
      },
      votes: [],
      tags: ["Deforestation", "Climate Change"],
      answers: [],
      owner: "67b9b706398c2a0934b3af96",
      createdAt: Date.now(),
  },
  {
      question: "What are the effects of air pollution on human health?",
      description: "Explore how air pollution impacts respiratory and overall health.",
      img: {
          url: "https://images.unsplash.com/photo-1582980752625-10783b273e2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFpciUyMHBvbGx1dGlvbnxlbnwwfDB8MHx8fDA%3D",
          filename: "air_pollution.jpg",
      },
      votes: [],
      tags: ["Air Pollution", "Health"],
      answers: [],
      owner: "67b9b706398c2a0934b3af96",
      createdAt: Date.now(),
  },
  {
      question: "How can we promote sustainable agriculture?",
      description: "Suggest ways to enhance sustainability in agricultural practices.",
      img: {
          url: "https://plus.unsplash.com/premium_photo-1661962848214-ff9e66df7810?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzdGFpbmFibGUlMjBhZ2ljdWx0dXJlfGVufDB8MHwwfHx8MA%3D%3D",
          filename: "sustainable_agriculture.jpg",
      },
      votes: [],
      tags: ["Sustainable Agriculture", "Farming"],
      answers: [],
      owner: "67b9b706398c2a0934b3af96",
      createdAt: Date.now(),
  },
  {
      question: "How do coral reefs protect coastal regions?",
      description: "Explain the role of coral reefs in safeguarding coastal areas from erosion.",
      img: {
          url: "https://images.unsplash.com/photo-1706737373590-8df9e7e2b5ed?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          filename: "coral_reefs.jpg",
      },
      votes: [],
      tags: ["Coral Reefs", "Environment"],
      answers: [],
      owner: "67b9b706398c2a0934b3af96",
      createdAt: Date.now(),
  },
];
  

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
