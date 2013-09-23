//this fle contains all the input and output variables

//first the input vars
var slider1val = 50;
var slider2val = 50;
var boxwidth = 100;

//then the output vars
var boxVolume;


//then the function to set them up
function inputs() {
	
	
	//initialize sliders
		var sliderOpts = {
			startValue: slider1val,
			animate: true,
			slide: function(event, ui) {
			var labelValue = $(this).slider("value")+" ft.";
			$("#sliderval1").val(labelValue);
			slider1val = $(this).slider("value");
			},
		};
		$("#mySlider").slider(sliderOpts);

		var sliderOpts2 = {
			startValue: slider2val,
			animate: true,
			slide: function(event, ui) {
			var labelValue = $(this).slider("value")+" ft.";
			$("#sliderval2").val(labelValue);
			slider2val = $(this).slider("value");
			},
		};
		$("#mySlider2").slider(sliderOpts2);

}// end inputs

function outputs() {
		//box volume
		var volume = (slider1val * slider2val * boxwidth);
		var output = formatNumber(volume,volumeUnits);
		
		$("#box-volume").val(output);

}// end outputs

