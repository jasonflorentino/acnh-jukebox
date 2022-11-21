# 🏝 ACNH Jukebox

**A Web app for playing K.K. Slider jams like in Animal Crossing: New Horizons**

Started as a little toy project to play around with Next.js and boy am I hooked -- Next is awesome! Also the art and music of this game are just too good NOT to get lost in. Enjoy!  

— Jason, Dec 2021

## Live Deployment
[Click here](https://acnhjukebox.vercel.app/) to visit the live site.

## Under the hood
This app uses [ACNH API](https://acnhapi.com/) for music data.  
It's a Next.js app written with TypeScript and SCSS, set up from [this starter](https://github.com/redimpulz/nextjs-typescript-starter).  

## To Do, maybe
💭 Determine loop times for more songs  
💭 Fix bug where triggering Search from keyboard enters 's' as first input  
💭 Combine Player and Search Input into same container component  
💭 Animate search tranisiton  
💭 Song name language selector  
💭 Scroll to current song' button?  
✅ Search?  
✅ Add "Actions Buttons" container  
✅ Background waves  
✅ Play random song, button similar to in-game buttons  
✅ Prune Next page props  
✅ Footer content + animate in?  
✅ Better music looping  
✅ Use different fonts  
✅ Update to Next 12  
✅ Remove Tailwind  
✅ Notify limited features on mobile browers  
✅ Works on Safari (Desktop)  
✅ Volume control (Desktop only?)  

## Run Locally
*Requires node and npm*
- Download or clone this repo.
- Install dependencies: 
  ```
  # From inside the repo directory:
  npm install
  ```
- Start the app: 
  ```
  npm run dev
  ```
- The app will be running on `http://localhost:3000`

## Contributing
First of all, thank you for your interest! Unfortunately, **I won't be actively reviewing PRs against this repo**. That said, feel free to fork it and build on it yourself! If you would like to contribute features to this one, msg me and we can get something going. 

What I would need help with is finding more loop times for the songs. The way I did it is loading up the audio file in an audio editing program, finding about when the loop should happen, and then pushing and pulling that time in the app to find which exact time works best. Kind of tedious, but worth it for my fav songs haha.
