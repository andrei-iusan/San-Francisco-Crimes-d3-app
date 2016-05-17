# San-Francisco-Crimes-d3-app

 ## Summary 

This is an overview of criminal activity in San Francisco from January 2003 
to December 2015. It shows the variation of the total number of crimes per day
for the period mentioned. This is a very general overview, more insight can be
found by reading my exploratory analysis of the same dataset: 
[San Francisco Crimes Investigation](https://s3.amazonaws.com/andrei-iusan-ud-dand/P4_-_San_Francisco_Crimes_-_Andrei_Iusan.html)

## Design

I chose a simple line plot for the number of crimes. The line is smoothed over
a period of 30 days. I added the smoothing because there are a lot of data 
points and the variability is quite high.

My first attempt was to show the proportion of solved crimes, and to 
superimpose the individual values as dim colored circles, on top of a line
plot of the average proportion of solfed crimes.

After the first feedback I decided it would be much clearer to start with the
number of crimes and let the user swich to the normalized version of the plot.

## Feedback

For first sketch (index_1.html, the version can also be traced using Github):
---

My post (for version 1):

>Hi all,
>
>I made a first draft of my P6 project. So far it's just a static plot. 
>I would appreciate any feedback you could give me.
>
>I would like to know your reaction to the following questions:
>
>1. Is the data clearly presented?
>2. Is the data of interest? (Or would you like to see for instance the total
>number of crimes rather than the percentage?)
>3. Is the presentation visually appealing? What would you style differently?
>4. How would you improve the visualization? (Any thoughts that you have and
>did not mention in the previous answers)
>
>You can of course make any other remarks, the questions are just guidelines.
>Here's my visualization (draft, alpha v 1.0):
>
>bitly.com/1QEqLFy
>
>Thank you!﻿

Reply from Ron Rihoo

>1. Yes, but I only have one question: what are all the dots for? Other than
>that, the data seems to be clearly presented. I know the location; the time
>frame; that it's about crime being solved; that it's in percentage and not
>quantity.
>2. I would like to see both percentage and quantity. I don't know why.
>I suppose it is interesting.
>3. I think that it currently appears like a very quick presentation of
>information. Perhaps it's in an early stage and you'll be adding more to it.
>4. Too early to say, since it's static right now. But how about indicating the
>type of crime? Because it's a bit confusing that crime is not being solved 
>as much as before; given that one would assume forensics techniques and 
>technology should have dramatically improved in that time-frame.
>
>In summary, I could definitely see a story being told. Recently, crime hasn't
>been solved as much as it was being solved before, which is shocking. Since
>technology has significantly improved, I anticipate that forensics gear and
>techniques should have improved as well.
>
>Questions that come to my mind after seeing this (just for extra feedback):
>funding issues? Bad management? Difficulty employing enough skilled workers?
>Or did a type of crime increase that didn't necessarily require forensics,
>but was difficult to solve?

For version 2:
---

My post:

>Hi all,
>I made a first working version of my P6 visualization. You can find it here:
>bitly.com/1QEqLFy
>
>Please share any thoughts regarding the visualization.
>
>You can use the following questions if it helps, or provide feedback as you
>find suited.
>
>What do you notice in the visualization?
>What questions do you have about the data?
>What relationships do you notice?
>What do you think is the main takeaway from this visualization?
>Is there something you don’t understand in the graphic?

Reply:

Rebecca Mayer
>Hi +Andrei Iusan , nice plot. The normalization view adds to the story 
>and the transition from raw to normalized looks good. I found the trend
>in the data a little hard to make out because there's so much variance.
>Maybe a smoothing or a trend line would help.

Dharit Parikh
>Hey Andrei, it seems from the visualization that there is some kind of 
>pattern in the graph. Maybe there are some months each year where crime
>rate increases/decreases. It will be interesting to see that, if it's 
>true. Other than that I agree with what has been said above.

## Resources

- Udacity course: Data Visualization with D3.js
- Interactive Data Visualization for the Web: http://chimera.labs.oreilly.com/books/1230000000345/index.html
- Mozilla Developer Network:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
  - https://developer.mozilla.org/en/docs/Web/SVG
- Update line: http://bl.ocks.org/d3noob/7030f35b72de721622b8
- w3schools: http://www.w3schools.com/
