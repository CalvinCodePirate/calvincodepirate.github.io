$(function() {
	var lat = "";
    var lng = "";
	var appendeddatahtml = "";
	 
	var str = "";
	var newstr = "";
	var phone = "";
	var rating = "";
	var icon = "";
	var address = "";
	
	$("#query").click(function(){
		$(this).val("");
	});
	
	$("#query").blur(function(){
		if ($(this).val() == "") {
			$(this).val("Example: Happy Hour");
		}
		
		if ($(this).val() != "Example: Happy Hour") {
			$(this).addClass("focus");
		} else {
			$(this).removeClass("focus");
		}
	});
	
	$("#searchform").submit(function(event){
		event.preventDefault();
		if (!lat) {
			navigator.geolocation.getCurrentPosition(getLocation);
		} else {
			getVenues();
		}
	});
	
	function getLocation(location) {
	    lat = location.coords.latitude;
	    lng = location.coords.longitude;
		getVenues();
	}
	



$("#searchform").submit(function(event){
    event.preventDefault();
    if (!lat) {
        navigator.geolocation.getCurrentPosition(getLocation);
    } else {
        getVenues();
    }
});
function getLocation(location) {
    lat = location.coords.latitude;
    lng = location.coords.longitude;
}

function getVenues() {
	$.ajax({
  		type: "GET",
  		url: "https://api.foursquare.com/v2/venues/explore?ll="+lat+","+lng+"&client_id=1N2JKDNNR0WBMX5OQ2WB0RRYO35SJUBPEWDF5UFYOAR1MYHW&client_secret=GOBQQHH4HMT2YZPRPJWTXKXB4NRXSXXXOVHYMFYBYRHYVPH1&v=20130619&query="+$("#query").val()+"",
	  		success: function(data) {
			var dataobj = data.response.groups[0].items;
			$("#venues").html(""); 
			
			$.each( dataobj, function() {
				if (this.venue.categories[0]) {
					str = this.venue.categories[0].icon.prefix;
					newstr = str.substring(0, str.length - 1);
					icon = newstr+this.venue.categories[0].icon.suffix;
				} else {
					icon = "";
				}
				
				if (this.venue.contact.formattedPhone) {
					phone = "Phone:"+this.venue.contact.formattedPhone;
				} else {
					phone = "";
				}
				
				if (this.venue.location.address) {
					address = '<p class="subinfo">'+this.venue.location.address+'<br>';
				} else {
					address = "";
				}
				
				if (this.venue.rating) {
					rating = '<span class="rating">'+this.venue.rating+'</span>';
				}
				
				appendeddatahtml = '<div class="venue"><h2><span>'+this.venue.name+'<img class="icon" src="'+icon+'"> '+rating+'</span></h2>'+address+phone+'</p><p><strong>Total Checkins:</strong> '+this.venue.stats.checkinsCount+'</p></div>';
				$("#venues").append(appendeddatahtml);
				
			});
		}
	});
}

function mapbuild() {
		$("#venues").hide();
		var myOptions = {
		zoom:5,
		center: new google.maps.LatLng(38.962612,-99.080879),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false
		},
		map = new google.maps.Map(document.getElementById('map'), myOptions);
	}
	
	mapbuild();
	
	
	// Prefix is attached to Suffix with dimmensions as glue. ie: prefix/300x300/suffix
	// prefix: "https://irs1.4sqi.net/img/general/"
	// suffix: "/7147840_w1UUAHLNHUPHB9UlQRIK1x_-KHcHB2RKn_n6eXPrTxw.jpg"
});