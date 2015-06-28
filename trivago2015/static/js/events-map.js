var map;
var service;
var infowindow;

events = load_events();

function initialize() {
  var bankok = new google.maps.LatLng(13.736717,100.203186);

  map = new google.maps.Map(document.getElementById('google-map'), {
      center: bankok,
      zoom: 9
    });

  var request = {
    location: bankok,
    radius: '10000',
    query: 'bankok grand palace' // https://developers.google.com/places/supported_types
  };

  events = load_events();
  console.log(events)

  service = new google.maps.places.PlacesService(map);

  for (var i = 0; i < events.length; i++) {
      event = events[i]
      request.query = event.location.join(separator=' ');
      console.log(request.query);

      service.textSearch(request, callback);
  }

  var places = mock_event_places()
  for (var i = 0; i < places.length; i++) {
      place = places[i];
      try {
          if (place !== null){
            callback(place, google.maps.places.PlacesServiceStatus.OK)
          }
      }
      catch(err)
      {}
  }

  //var autocomplete = new google.maps.places.Autocomplete(input);
  //autocomplete.bindTo('bounds', map);

}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      // Star
      path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
      fillColor: '#ffff00',
      fillOpacity: 1,
      scale: 0.7,
      strokeColor: '#bd8d2c',
      strokeWeight: 1
    }
  });
}

var mapdata ={};
mapdata.results = new Array();

function callback(results, status) {
  console.log(status)
  //console.log(results[0])
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      //createMarker(results[i]);
    }
    createMarker(results[0]);
    mapdata.result = results
    mapdata.results.push(results[0])
  }
}

initialize();

function load_events(){
events_data = {
	"events": [
	    {
		    "title": "Visit the Wat Arun",
			"category": [
				"Culture",
				"Sightseeing"
			],
			"location":[
				"Bangkok",
				"Wat Arun"
			],
			"username": "crazyladybug59",
			"start": "29.06.2015 14:00",
			"ende": "29.06.2015 16:00",
			"description": "After lunch we want to see the bangkok grand palace. There is a ceremony that day! ",
			"image": "wat_arun.jpg"
	    },
	    {
			"title": "Boatride on Chao Phraya river",
			"category": [
				"Culture",
				"Sightseeing"
			],
			"location":[
				"Bangkok",
				"Pak Kret Pier"
			],
			"username": "silvermeercat675",
			"start": "28.06.2015 17:00",
			"ende": "28.06.2015 18:30",
			"description": "I want to make a boat tour on the river, but it's really expansive to go alone! Maybe we go get some dinner together afterwards?",
			"image": "boatride_on_chao_phraya_river.jpg"
		},
		{
			"title": "Bike sightseeing tour",
			"category": [
				"Sightseeing",
				"Sport",
				"Exploring"
			],
			"location":[
				"Bangkok",
				"Chatuchak-Market"
			],
			"username": "redswan575",
			"start": "29.06.2015 10:00",
			"ende": "29.06.2015 17:00",
			"description": "We want to rent bikes and check out a few sights that are outside the city. Meetup is Chatuchak Market. Bring something to drink for the day",
			"image": "bike_sightseeing_tour.jpg"
		},
		{
			"title": "Eating Pho Noodle Soup in Ru Pho Bar",
			"category": [
				"Food"
			],
			"location":[
				"Bangkok",
				"Ru Pho Bar, 27E Tran Nhat Duat"
			],
			"username": "organicswan214",
			"start": "28.06.2015 18:00",
			"ende": "",
			"description": "I heard they have the best Pho in the world, who wants to try it out?",
			"image": "eating_pho_noodle_soup_in_ru_pho_bar.jpg"
		},
		{
			"title": "Fruit Shakes",
			"category": [
				"Drink"
			],
			"location":[
				"Bangkok",
				"Khlong Toey Market"
			],
			"username": "greengoose317",
			"start": "28.06.2015 13:00",
			"ende": "28.06.2015 14:00",
			"description": "They are famous here and incredibly yummy! :)",
			"image": "fruit_shakes.jpg"
		},
		{
			"title": "Visit the food market",
			"category": [
				"Food",
				"Drink",
				"Exploring"
			],
			"location": [
				"Bangkok",
				"Khlong Toey Market"
			],
			"username": "heavysnake412",
			"start": "29.06.2015 12:30",
			"ende": "29.06.2015 14:30",
			"description": "We want to try out some weird local foods, yummy!!!",
			"image": "visit_the_food_market.jpg"
		},
		{
			"title": "Guards Ceremony at the Grand Palace",
			"category": [
				"Sightseeing",
				"Culture"
			],
			"location": [
				"Bangkok",
				"Grand Palace"
			],
			"username": "heavysnake412",
			"start": "29.06.2015 11:30",
			"ende": "29.06.2015 12:00",
			"description": "We're Cathy and Bruce and want to watch the Changing of the Guards at the Grand Palace",
			"image": "guards_ceremony_at_the_grand_palace.jpg"
		},
		{
			"title": "Eat fried scorpions",
			"category": [
				"Food"
			],
			"location": [
				"Bangkok",
				"Khlong Toey Market"
			],
			"username": "heavybird310",
			"start": "28.06.2015 18:00",
			"ende": "",
			"description": "We are three awesome people from the netherlands. We wanna try out some street food before going partying",
			"image": "eat_fried_scorpions.jpg"
		},
		{
			"title": "Wat Mahatat",
			"category": [
				"Sightseeing"
			],
			"location":[
				"Bangkok",
				"Wat Mahat"
			],
			"username": "brownwolf383",
			"start": "29.06.2015 14:00",
			"ende": "",
			"description": "I want to see the Wat Mahatat, one of the most beautiful buddhist temples in Bangkok. Who's with me?",
			"image": "wat_mahatat.jpg"
		},
		{
			"title": "Temple of Emerald Buddha",
			"category": [
				"Sightseeing"
			],
			"location":[
				"Bangkok",
				"Wat Phra Kaew"
			],
			"username": "goldenmeercat766",
			"start": "29.06.2015 15:00",
			"ende": "",
			"description": "A must see! If you haven't been there yet, join us!!!",
			"image": "temple_of_emerald_buddha.jpg"
		},
		{
			"title": "Khao San Road",
			"category": [
			    "Food",
			    "Drink",
				"Sightseeing",
				"Exploring"
			],
			"location":[
				"Bangkok",
				"Khao San Road"
			],
			"username": "lazybird193",
			"start": "28.06.2015 20:00",
			"ende": "",
			"description": "Khao San Road is supposed to be really cool at night. We are four crazy dudes from Denmark, maybe you want to hang with us, go to some bars",
			"image": "khao_san_road.jpg"
		},
		{
			"title": "Clubbing Route 66",
			"category": [
			    "Party",
			    "Drink"
			],
			"location":[
				"Bangkok",
				"Route 66"
			],
			"username": "bluedog799",
			"start": "28.06.2015 23:00",
			"ende": "",
			"description": "We are 2 nice guys from Germany lookin' for some nice girls to go out tonight",
			"image": "clubbing_route_66.jpg"
		},
		{
			"title": "Wat Arun at night",
			"category": [
				"Sightseeing"
			],
			"location":[
				"Bangkok",
				"Wat Arun"
			],
			"username": "beautifulkoala673",
			"start": "29.06.2015 20:00",
			"ende": "",
			"description": "Its really beatiful at night! Join us for a few beers at the river in front of Wat Arun!",
			"image": "wat_arun_at_night.jpg"
		},
		{
			"title": "Glow Nightclub",
			"category": [
				"Drink",
				"Party",
				"Dance"
			],
			"location":[
				"Bangkok",
				"Glow"
			],
			"username": "goldenpanda599",
			"start": "29.06.2015 20:00",
			"ende": "",
			"description": "We were there yesterday and it was awesome, maybe with a few more people ist going to be even more awesome!",
			"image": "glow_nightclub.jpg"
		},
		{
			"title": "MachineHead live",
			"category": [
				"Concerts"
			],
			"location":[
				"Bangkok",
				"Centerpoint Studio"
			],
			"username": "goldenpanda599",
			"start": "08.07.2015 20:00",
			"ende": "",
			"description": "I'm coming over to Bangkok to watch MachineHead. Who's with me.",
			"image": "machinehead_live.jpg"
		},
		{
			"title": "Drink stand",
			"category": [
				"Drink"
			],
			"location":[
				"Bangkok",
				"Khao San Road"
			],
			"username": "goldenpanda599",
			"start": "28.06.2015 20:00",
			"ende": "",
			"description": "We saw this cute stand today and want to go there tonight! They got really freshly made juices there",
			"image": "drink_stand.jpg"
		},
		{
			"title": "A night in Zuma",
			"category": [
				"Drink"
			],
			"location":[
				"Bangkok",
				"Rajadamri Road"
			],
			"username": "crazypeacock983",
			"start": "28.06.2015 21:00",
			"ende": "",
			"description": "A friend told me I had to visit this bar while I'm here, but I don't want to go alone. Maybe some nice people want to join?",
			"image": "a_night_in_zuma.jpg"
		},
		{
			"title": "Chaos in Club Khaosan",
			"category": [
				"Drink"
			],
			"location":[
				"Bangkok",
				"Club Khaosan"
			],
			"username": "beautifulostrich127",
			"start": "28.06.2015 22:00",
			"ende": "",
			"description": "We are two girls from Austria looking for some handsome guys (and girls) to dance!",
			"image": "chaos_in_club_khaosan.jpg"
		},
		{
			"title": "Hike in Erawan Nationalpark",
			"category": [
				"Sport",
				"Exploring"
			],
			"location":[
				"Bangkok",
				"Erawan Nationalpark"
			],
			"username": "brownwolf383",
			"start": "29.06.2015 11:00",
			"ende": "29.06.2015 19:00",
			"description": "Me and my Boyfriend want to go Hiking in the near Erawan Nationalpark. The route is about 7km (4 miles) long. This is a very beautiful Park",
			"image": "hike_in_erawan_nationalpark.jpg"
		},
		{
			"title": "Trivago Hackathon 2015",
			"category": [
				"Party",
				"Culture"
			],
			"location":[
				"Düsseldorf",
				"Trivago Building, Bennigsen-Platz 1 "
			],
			"username": "heavyfish201",
			"start": "27.06.2015 9:00",
			"ende": "28.06.2015 18:00",
			"description": "Have fun, meet peoople, get ideas",
			"image": "trivago_hackathon_2015.jpg"
		}
	]
}
return events_data.events
}

function mock_event_places(){
var google_response = [{"formatted_address":"Wat Tha Phra, Bangkok Yai, Bangkok 10600, Thailand","geometry":{"location":{"A":13.7234,"F":100.47620000000006}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"f9adb720918210f58db69529572256c789c8aae3","name":"Wat Arun","place_id":"ChIJh4D_V1qY4jAR59Ip6yO9ZjY","reference":"CpQBkAAAAP4CUmudlSXch-V8DlsEnGUYaQ6371lmH4xxV_6knr-SUTOiicbKlAyYeo1eqR0CtXbo5jxhK6DmpYfrZ_Z6YaAtpV1My7110d7f8PUUZxdEGE1pbVmHte61DYj1lLFd4mpbvJ9uuWG2GIwZcJoN79iYGuvUUL6iN7C990bAGNG08kPW_8SW03sZtrnYHHBvjxIQjz9i_eRFf6pN7En8VuHceRoUOFW9-HVX9oTRTz9-rVZ4C0FILvs","types":["point_of_interest","establishment"],"html_attributions":[]},{"formatted_address":"17/56 ซอยสุขาประชาสรรค์ 2 แขวงบางพูด ปากเกร็ด นนทบุรี 11120, Thailand","geometry":{"location":{"A":13.928173,"F":100.50200700000005}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png","id":"47e5f58439ca5ccfdc92ffcbcb75ad060a5bbdf1","name":"Buddy Oriental Riverside Pakred","photos":[{"height":520,"html_attributions":[],"width":960}],"place_id":"ChIJDdv4qFiE4jARIkm95YX1Hy0","rating":4.1,"reference":"CoQBcgAAAA3LTGIeIVsrSzHIFVPRPXRbZeSqKFBafi-U5WmT_rn2jgB564SqZ29BiT75Js5JHpuB4MpcUFKdwP_nfIkOTaKHdlzrCxTE1-iDyZ1zL3SJnKj-nY-0Jg9H6suF1NXhMMAUyctUcdAuKehaFaWKu_yF_e6YkyPY8oBrMLkOwtUEEhC3OQ0v-AI4q0U1P020BCWNGhRkZoigQiOG4MKZVpKCvMIOrTjSQQ","types":["lodging","establishment"],"html_attributions":["Listings by <a href=\"http://www.space-miner.com/\">Space Miner</a>","Listings by <a href=\"http://www.where-in-thailand.com/\">Where In Thailand</a>","Listings by <a href=\"http://www.openrice.com/\">OpenRice</a>"]},null,{"formatted_address":"10120, Thailand","geometry":{"location":{"A":13.711075,"F":100.50885399999993}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png","id":"384883251294fb1223c0759a1fa1892033c84202","name":"Chatrium Hotel Riverside Bangkok","opening_hours":{"open_now":true,"weekday_text":[]},"photos":[{"height":945,"html_attributions":[],"width":945}],"place_id":"ChIJvaruo7-Y4jARyI6OZRkhHqU","rating":4.6,"reference":"CoQBdAAAAJxxo2Pq4esdmgJtvB1o_hCk0kBlHge2OZkLVp0N2WuPyWE26a50YEZ0kcyEfp81-ATVZBMACrED6D2oMXn06a331svdeXbomtDjx8JBPD6Lm3OEezE6u99HMqDNw3lF66ESmyp6M9OB1EhhYdJQGuF0But2GFnfek_V_lCCat4EEhAC-7Xu0BOEl-1aSuG4BXdwGhQn9ZB7igIv1sAztXM_A4k2XUb5BQ","types":["lodging","establishment"],"html_attributions":["Listings by <a href=\"http://www.where-in-thailand.com/\">Where In Thailand</a>","Listings by <a href=\"http://www.openrice.com/\">OpenRice</a>"]},{"formatted_address":"Soi Rong Ngan Yasup, Khlong Toei, Krung Thep Maha Nakhon, Thailand","geometry":{"location":{"A":13.719441,"F":100.55963199999997}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"b332add403e4ddde262cb162a84755b594ddd9f1","name":"Fresh Market Khlong Toei","place_id":"ChIJzybv5xmf4jARdrm6jKj43O4","reference":"CnRsAAAAT6ObRCxRUERJloqdAXeSYfQBcQPTLrUFbc_jq7HX-Egtpm2kkVPIEdRYXEJVhoHEeT-s9i4WYd_23bZUT6RyWeXrOHA_FSA6nWiWobT9AOoysRjJCm020FXbU190ED7irfncpNN09jZKHKrZtvDzERIQzT710qvpVKCi0m9H7Y0dIRoUDkyh2ij72zrsT_N8dYmyPUe9GYo","types":["establishment"],"html_attributions":["Listings by <a href=\"http://www.space-miner.com/\">Space Miner</a>","Listings by <a href=\"http://www.where-in-thailand.com/\">Where In Thailand</a>"]},{"formatted_address":"Soi Rong Ngan Yasup, Khlong Toei, Krung Thep Maha Nakhon, Thailand","geometry":{"location":{"A":13.719441,"F":100.55963199999997}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"b332add403e4ddde262cb162a84755b594ddd9f1","name":"Fresh Market Khlong Toei","place_id":"ChIJzybv5xmf4jARdrm6jKj43O4","reference":"CnRsAAAAT6ObRCxRUERJloqdAXeSYfQBcQPTLrUFbc_jq7HX-Egtpm2kkVPIEdRYXEJVhoHEeT-s9i4WYd_23bZUT6RyWeXrOHA_FSA6nWiWobT9AOoysRjJCm020FXbU190ED7irfncpNN09jZKHKrZtvDzERIQzT710qvpVKCi0m9H7Y0dIRoUDkyh2ij72zrsT_N8dYmyPUe9GYo","types":["establishment"],"html_attributions":["Listings by <a href=\"http://www.space-miner.com/\">Space Miner</a>","Listings by <a href=\"http://www.where-in-thailand.com/\">Where In Thailand</a>"]},{"formatted_address":"522/163 Asoke-Dindaeng Rd., Huai Khwang,, Bangkok, 10310, Thailand","geometry":{"location":{"A":13.752058,"F":100.56384800000001}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png","id":"dd72595aca6ea45f2b2822ce5efa111be9e6be6f","name":"Grand Palace","place_id":"ChIJHTu4c_Ke4jARpw7SDBqkK80","reference":"CmRgAAAAhat0GDQxCKY5jn5Ji81sJoKVKD6F2SLqdj3dHwsJrgX_SVl75KdwGcvlKU4iKrSVgMUuHtBYUNWexN7otdob-VaGwxbOo8A9STGHxtRZVzJH5tJdkxRBNDF79NEOl987EhB9RgX9iFzwYakir-ADy4rwGhQ2G7d31_l4Ow5vX7PdxFC8g7cvnQ","types":["lodging","establishment"],"html_attributions":["Listings by <a href=\"http://www.openrice.com/\">OpenRice</a>","Listings by <a href=\"http://www.where-in-thailand.com/\">Where In Thailand</a>","Listings by <a href=\"http://www.space-miner.com/\">Space Miner</a>"]},{"formatted_address":"Soi Rong Ngan Yasup, Khlong Toei, Krung Thep Maha Nakhon, Thailand","geometry":{"location":{"A":13.719441,"F":100.55963199999997}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"b332add403e4ddde262cb162a84755b594ddd9f1","name":"Fresh Market Khlong Toei","place_id":"ChIJzybv5xmf4jARdrm6jKj43O4","reference":"CnRsAAAAT6ObRCxRUERJloqdAXeSYfQBcQPTLrUFbc_jq7HX-Egtpm2kkVPIEdRYXEJVhoHEeT-s9i4WYd_23bZUT6RyWeXrOHA_FSA6nWiWobT9AOoysRjJCm020FXbU190ED7irfncpNN09jZKHKrZtvDzERIQzT710qvpVKCi0m9H7Y0dIRoUDkyh2ij72zrsT_N8dYmyPUe9GYo","types":["establishment"],"html_attributions":["Listings by <a href=\"http://www.space-miner.com/\">Space Miner</a>","Listings by <a href=\"http://www.where-in-thailand.com/\">Where In Thailand</a>"]},{"formatted_address":"Bangkok, Thailand","geometry":{"location":{"A":13.750373,"F":100.49152200000003}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"9d8152f1760ec82561100c1984ddf3319b50b516","name":"Wat Phra Kaew & the Grand Palace","photos":[{"height":864,"html_attributions":["<a href=\"https://plus.google.com/104361788676026066659\">mao vanna</a>"],"width":1152}],"place_id":"ChIJh4D_V1qY4jARZrNzsECra_A","rating":4.3,"reference":"CoQBdAAAAJoG_BJeyAENg9t0m0nfqP8cD_KXkCid-VocbCTF13eDHtF8RdxA1sV1MZqEBy99fjVAhRWhBQ1gCLoFobRvZkBrV_NpOTcMMUO4OFFF51E-Z9GxKEjCwxvjTMg4RyqG61ur0Dxk0sSWZWbJSSXq9fGfgk8AzOa2aYPeUomngvt7EhAL9hMuS8lEVoWrkNVAPFHlGhRPjOqiEsUZRDOcChD5FHHcLVzQ-g","types":["place_of_worship","establishment"],"html_attributions":["Listings by <a href=\"http://www.where-in-thailand.com/\">Where In Thailand</a>","Listings by <a href=\"http://www.openrice.com/\">OpenRice</a>","Listings by <a href=\"http://www.space-miner.com/\">Space Miner</a>"]}]
return google_response
}
