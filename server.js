const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var db = require("./models");
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/greentoadPosts",
  {useNewUrlParser: true }
   //the correct db
);
//Script that I was planning on running so that the 'Points' collection would have the right locations on heroku. The problem is that I couldn't get populate and relational mongoose stuff working (it's very picky), so this is no longer necessary. We are using check in ID, which is stored in the Posts collection.
// db.Points.create(
//   {
//     id: 1,
//     name: "Trail Head",
//     image:
//       "https://violetcrowntrail.com/wp-content/uploads/2016/01/ZilkerTrailhead2-3.jpg",
//     description:
//       "The Trailhead entrance to the Greenbelt is a low-impact trail for beginner hikers. This access point is the most accessible entrance for downtown dwellers and paid parking is readily available. The trail itself is flat enough for a relaxed first-time hike, but watch out because it is also frequented by avid joggers and bikers. Four miles into the Trailhead, the path will be divided by a fork at which you can continue on the Greenbelt or diverge onto the Violet Crown Trail. This location is also considered the trailhead for the Violet Crown Trail. Once complete, the Violet Crown Trail will be 30 miles long, stretching all the way into Hays County.",
//     address: "2206 William Barton Dr.",
//     location: "08155400"
//   },
//   {
//     id: 2,
//     name: "Spyglass",
//     image:
//       "https://assets3.thrillist.com/v1/image/1746230/size/tmg-facebook_social.jpg",
//     description:
//       "Known for its proximity to Tacodeli, the Spyglass entrance is a great place to lounge post-pig-out. This app isn’t about tacos, but if you are using this access point you must stop and try this local favorite. Grab a couple of breakfast tacos and be on your way to explore. There is usually easy street parking at this access point. If you head north on the trail–or left for those directionally-challenged, Spyglass provides easy access to Campbell’s Hole, a popular swimming spot…when there’s water. After you’re done digesting your tacos you can also hit the trails or climb south to reach the Greenbelt's Enclave, a prime bouldering wall. If you’re feeling particularly energetic, go further down to Seismic Wall, a more advanced bouldering area.",
//     address: "1601 Spyglass Dr.",
//     location: "08155400"
//   },
//   {
//     id: 3,
//     name: "Barton Hills",
//     image:
//       "https://static.rootsrated.com/image/upload/s--MIxv7eHt--/t_rr_large_traditional/jilhusg8anfqowwxrvzp.jpg",
//     description:
//       "Found just north of Barton Hills Elementary School, you can access the east entrance of the Greenbelt from Barton Hills, a residential neighborhood. This entrance leads to multiple hiking trails as well as Campbell’s Hole, a popular family-friendly swimming hole. There are additional hiking trails on the east side of the creek (this is where the 12.68 miles come into play). So even if there’s no water, there’s still plenty to explore in this area.",
//     address: "2010 Homedale Dr.",
//     location: "08155400"
//   },
//   {
//     id: 4,
//     name: "Gus Fruh",
//     image:
//       "https://cmga360fitness.files.wordpress.com/2016/06/lhs-greenbelt-04.jpg",
//     description:
//       "Looking for a more adventurous swim? The Gus Fruh access point, provides access to some lesser-known, deeper swimming holes as well as a handful of climbing walls just south of the entrance. The Gus Fruh access point is also located within a residential neighborhood, so be courteous and don’t block any driveways. On most days, finding a parking spot will not be a problem. On this trail, You’ll find several great limestone climbing walls, such as Urban Assault, as you head south from this access point. Continue going south for roughly 1.4 miles and you’ll arrive at the main access point for the Barton Creek Greenbelt. ",
//     address: "2642 Barton Hills Dr.",
//     location: "08155300"
//   },
//   {
//     id: 5,
//     name: "Loop 360",
//     image:
//       "https://austinot.com/wp-content/uploads/2015/03/seismic-wall-greenbelt.jpg",
//     description:
//       "Perhaps the most popular Greenbelt access point (perhaps because it's the recommended access point by Google Maps), the Loop 360 entrance is visitor-friendly with plentiful parking and access to pretty much every trail Greenbelt has to offer. On weekends, there’s designated overflow parking in the office park. This entrance is also the main access point for the climbing destination Seismic Wall and is very popular for mountain biking. This access point is where you start to notice more mountain bikers, since from here the terrain is a lot more “fun.” On your way to the next access point at Mopac, about 1.3 miles away, you’ll run into a fork in the trail where the Violet Crown Trail and the Barton Creek Greenbelt trails divide. Continue straight to remain on the Barton Creek Greenbelt trail. ",
//     address: "3755-B Capital of TX Hwy.",
//     location: "08155300"
//   },
//   {
//     id: 6,
//     name: "Gaines",
//     image:
//       "http://2.bp.blogspot.com/-wRFiMuwwa4A/UA9ZgJG6C6I/AAAAAAAAAhg/hVdJT-ON81M/s1600/Twin+Falls+063.JPG",
//     description:
//       "This entrance is the trickiest. From Capital of Texas Highway, turn as if you’re heading south on Mopac, but instead of taking the on-ramp, remain on the frontage road. Just past the ramp, you’ll find the access point. There is no official parking lot for the Twin Falls/Gaines access point, so keep an eye out for parked cars on the side of the road. If you’re willing to go the extra mile to hike up Gaines, your reward is Twin Falls another swimming hole. This access point is great for hikers, trail runners, and mountain bikers, since the terrain is a little more diverse. Plus, it becomes less crowded from here to the last access point, which is about 2.8 miles west.",
//     address: "3918 MoPac S.",
//     location: "08155300"
//   },
//   {
//     id: 7,
//     name: "Trail's End",
//     image:
//       "https://s3-media4.fl.yelpcdn.com/bphoto/l92vAgyYrNy-vz85ObIIlw/o.jpg",
//     description:
//       "If you’re a serious, no-frills hiker, Trails End is the entrance for you. This access point leads to plenty of secluded trails ready to be explored as well as access to two hidden Greenbelt gems: the Hill of Life, which is a half-mile downhill hike from the entrance that ends at the foot of Sculpture Falls, a concealed swimming hole, perfect for a post-hike dip.",
//     address: "1710 Camp Craft Rd.",
//     location: "08155240"
//   }
// )
//   .then(function(dbUser) {
//     console.log(dbUser);
//   })
//   .catch(function(err) {
//     console.log(err.message);
//   });
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

//make sure db is correct above, run mongod - 1 window
//run server - 2 window
//then start client - 3 window
