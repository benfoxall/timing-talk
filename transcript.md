# Transcript

This is going to be informative - we’re going to talk about javascript.

## var now = new Date

You can find out what time it is in javascript, by using the Date object.

## now.whatever()

This gives you access to a heap of methods that give you access to the different properties of the date.  You can access the year, month, day, minute, second, millisecond.

## now.getTime()

You can access milliseconds since 1970 - this gives you a handy base if you’re doing animations and stuff

## [complex animation] 

[cubes](http://threejs.org/examples/#webgl_interactive_particles)

Now, date kind of falls down for a couple of reasons here.

It’s a bit heavy - we don’t need to know what month it is to do this animation
Subtle one - this isn’t guaranteed to go forward, your phone clock is potentially re-adjusting, so the date could change

## ~~window.performance.now()

Performance.now solves these problems, it’s really lightweight and it starts when the page is requested, rather than UTC, so it can always go forward.  This is also nice to be able to see when your users actually interact with your site.

[show decimal]

It’s also a higher resolution than Date, which is pretty mental, and probably useful for something.

## interval

```js
setInterval(draw, 17)

function draw(){
  var now = window.performance.now()
	// …
}
```

Another thing that we have to do is decide when to update an animation.

Browsers can handle 60 frames a second, which works out at 17 milliseconds.

Though, this actually give us some problems.  When the browser is minimised, or you’re on a different tab - this will still run. And, you’re not guaranteed to hit the rendering of a frame in your browser - a user might be scrolling just as you fire this and you’ll block them. [THINK ABOUT HOW TO WORD THIS BETTER].

## rAF

```js
requestAnimationFrame(draw)

function draw(now){
	// …
}
```

So, request animation frame is cool. It schedules a function to be called when the browser is drawing the next frame - so you won’t be drawing when the window is hidden or block the user from doing something.

```js
requestAnimationFrame(draw)

function draw(){
  requestAnimationFrame(draw)
	// …
}
```

And once you’ve started drawing the new frame, you can request to draw in the next one.

Our animations are performant, and awesome. Javascript doesn’t get in the way of your experience

# JS <3’s you

Right.  That’s the learning done - let’s do some stuff with it.

—

# A,B,C

Press these at very specific times



# TIME DRIFT



# Thanks





