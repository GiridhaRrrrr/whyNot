const counters = document.querySelectorAll('.counter')

counters.forEach(counter => {
    counter.innerText = '0'

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target')
        const c = +counter.innerText

        const increment = target / 200

        if(c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1)
        } else {
            counter.innerText = target
        }
    }

    updateCounter()
})

// autotext
const textEl = document.getElementById('autoText')
const speedEl = 1.5
const text = 'whyNOT...?'
let imageIdx = 1
let speed = 300 / speedEl

writeText()

function writeText() {
    textEl.innerText = text.slice(0, imageIdx)

    imageIdx++

    if(imageIdx > text.length) {
        imageIdx = 1
    }

    setTimeout(writeText, speed)
}

// testimony-box
const testimonialsContainer = document.querySelector('.testimonials-container')
const testimonial = document.querySelector('.testimonial')
const userImage = document.querySelector('.user-image')
const username = document.querySelector('.username')
const role = document.querySelector('.role')

const testimonials = [
  {
    name: 'Suresh M',
    position: 'Marketing',
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
    text: 'WhyNot is a fantastic platform for getting answers to all my questions. The Google signup was quick and hassle-free, and the AI integration ensures I receive accurate and reliable responses. Its my go-to resource whenever I need clarity. Highly recommended !'
  },
  {
    name: 'June Cha',
    position: 'Software Engineer',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    text:
      'WhyNot has become my go-to platform for all my queries. The seamless Google signup and the advanced AI integration make it so convenient. Its a fantastic resource for anyone looking to get clarity on any topic!',
  },
  {
    name: 'Ananya R',
    position: 'Data Entry',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'I love how easy it is to use WhyNot. The Google signup took seconds, and the AI integration feels like a superpower. Whenever Im stuck with a doubt, I know I can rely on this platform for expert advice. Highly recommend!'

  },
  {
    name: 'Priya M',
    position: 'Receptionist',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'WhyNot has revolutionized the way I get answers to my questions. The Google signup was smooth and quick, and the AI integration ensures I get high-quality, accurate responses. Its like having a personal advisor at my fingertips!'
  },
  {
    name: 'Jonathan Nunfiez',
    position: 'Graphic Designer',
    photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    text: `Signing up with Google was a breeze, and the AI integration is simply mind-blowing! I had some complex questions, and the community here provided clear, insightful answers. WhyNot is a game-changer for anyone seeking clarity!`
  },
]

let idx = 1

function updateTestimonial() {
  const { name, position, photo, text } = testimonials[idx]

  testimonial.innerHTML = text
  userImage.src = photo
  username.innerHTML = name
  role.innerHTML = position

  idx++

  if (idx > testimonials.length - 1) {
    idx = 0
  }
}

setInterval(updateTestimonial, 10000)