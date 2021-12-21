# ACNH Jukebox

**A Web app for playing K.K. Slider jams like in Animal Crossing: New Horizons**

Started as a little side-project to play around with Next.js and boy am I hooked! Also the art and music of this game is too good to NOT get lost in. Enjoy!  
— Jason, Dec 2021

## Live Deployment
[Click here](https://acnhjukebox.vercel.app/) to visit the live site.

## Under the hood
This app uses [ACNH API](https://acnhapi.com/) for music data.  
It's a Next.js app written with TypeScript and SCSS, set up from [this starter](https://github.com/redimpulz/nextjs-typescript-starter).  

## To Do, maybe
💭 Prune Next page props  
💭 Determine loop times for more songs  
💭 Background waves  
💭 Load to scroll location of last played song  
💭 Play random song, button similar to in-game buttons  
💭 Play/Pause button? Or 'scroll to current song' button?  
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
- The will be running on `http://localhost:3000`