// Constructor function for creating ScrollVideo instances
function ScrollVideo(elem) {
  // Get the video and canvas elements within the provided elem
  const video = elem.querySelector('video')
  const canvas = elem.querySelector('canvas')

  // Get the 2D rendering context for the canvas
  const ctx = canvas.getContext('2d')

  // Initialize variables for video duration and seeking state
  let videoDuration = 0.001
  let seeked = true

  // Function to update the video duration when it changes
  function setVideoDuration() {
    console.log('ondurationchange')
    videoDuration = video.duration
  }

  // Function that loops for smooth video scrolling effect
  function loop() {
    // Request animation frame to continuously call the loop function
    requestAnimationFrame(loop)
    console.log(requestAnimationFrame(loop))

    // Check if seeking is allowed
    if (seeked) {
      seeked = false // Set seeked to false to prevent continuous seeking

      // Get scroll information
      const { scrollHeight, clientHeight, scrollTop } = document.body
      const maxScroll = scrollHeight - clientHeight
      const scrollProgress = scrollTop / Math.max(maxScroll, 1)

      // Set canvas dimensions to match the video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Calculate and set the video time based on scroll position
      if (!isNaN(video.duration)) {
        video.currentTime = video.duration * scrollProgress
        // console.log(video.currentTime)
      }

      // Clear the canvas and draw the video frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    }
  }

  // Initialize the video player
  function init() {
    // Set the loop function to start playing the video on canplay event
    video.oncanplay = loop

    // Set initial video time for scrolling
    video.currentTime = 0.001

    // Initialize the observer for seeking
    initObserver()
  }

  // Function to handle seeking events
  function initObserver() {
    video.addEventListener('seeked', () => {
      seeked = true // Allow seeking when the video has seeked
    })
  }

  // Expose the init function as a public method
  return {
    init,
  }
}

// Get all elements with class 'canvas-wrapper'
const components = document.querySelectorAll('.canvas-wrapper')

// Create ScrollVideo instances for each element and initialize
components.forEach((item) => {
  const component = ScrollVideo(item)
  component.init()
})
