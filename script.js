document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle")
  const body = document.body
  const servicesContainer = document.getElementById("servicesContainer")
  const eventSearch = document.getElementById("eventSearch")
  const eventsGrid = document.getElementById("eventsGrid")

  // Dark mode toggle
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")
  })

  // Services horizontal scroll
  let isScrolling = false
  let scrollDirection = 1 // 1 for right, -1 for left
  const scrollSpeed = 1

  function autoScroll() {
    if (!isScrolling) return

    servicesContainer.scrollLeft += scrollSpeed * scrollDirection

    if (servicesContainer.scrollLeft >= servicesContainer.scrollWidth - servicesContainer.clientWidth) {
      scrollDirection = -1
    } else if (servicesContainer.scrollLeft <= 0) {
      scrollDirection = 1
    }

    requestAnimationFrame(autoScroll)
  }

  servicesContainer.addEventListener("mouseenter", () => {
    isScrolling = false
  })

  servicesContainer.addEventListener("mouseleave", () => {
    isScrolling = true
    autoScroll()
  })

  isScrolling = true
  autoScroll()

  // Events data
  const events = [
    {
      id: 1,
      title: "Summer Exhibition",
      date: "July 15, 2023",
      description: "Join us for our annual summer photography showcase",
      image:
        "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Uz-SA_2eYoCeBCyrezYMrw.png",
    },
    {
      id: 2,
      title: "Photography Workshop",
      date: "August 5, 2023",
      description: "Learn advanced techniques from our expert photographers.",
      image:
        "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Uz-SA_2eYoCeBCyrezYMrw.png",
    },
    {
      id: 3,
      title: "Street Photography Walk",
      date: "August 20, 2023",
      description: "Explore urban photography with our guided city tour",
      image:
        "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Uz-SA_2eYoCeBCyrezYMrw.png",
    },
  ]

  // Render events
  function renderEvents(eventsToRender) {
    eventsGrid.innerHTML = ""
    eventsToRender.forEach((event) => {
      const eventCard = document.createElement("div")
      eventCard.classList.add("event-card")
      eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <div class="event-card-content">
                    <h3>${event.title}</h3>
                    <p class="event-date">${event.date}</p>
                    <p>${event.description}</p>
                </div>
            `
      eventsGrid.appendChild(eventCard)
    })
  }

  // Initial render
  renderEvents(events)

  // Event search
  eventSearch.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filteredEvents = events.filter(
      (event) => event.title.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm),
    )
    renderEvents(filteredEvents)
  })
})

