//these are standard functions that are used for every project

//reusable functions
function formatNumber(num, units)
{
	var nStr = num.toString();
	var position = (nStr.length -3);
	var b =",";
	var output = nStr.substring(0, position) + b + nStr.substring(position) + units;
	
	return output
}//end formatNumber

function renderPoint(vector){
	mesh = new THREE.Mesh(new THREE.SphereGeometry(5, 10, 10), new THREE.MeshLambertMaterial({ color: 0xffffff    }));
	mesh.position.x = vector.x;
	mesh.position.y = vector.y;
	mesh.position.z = vector.z;
	return mesh;
}//end renderPoint


///////////////////////here's the drag n drop stuff///////////////////////
// browser warning for drag n drop
function initBrowserWarning() {
	var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	
	if(!isChrome && !isFirefox)
		$("#browser-warning").fadeIn(125);
}

function initDnD() {
	// Add drag handling to target elements
	document.getElementById("body").addEventListener("dragenter", onDragEnter, false);
	document.getElementById("drop-box-overlay").addEventListener("dragleave", onDragLeave, false);
	document.getElementById("drop-box-overlay").addEventListener("dragover", noopHandler, false);
	
	// Add drop handling
	document.getElementById("drop-box-overlay").addEventListener("drop", onDrop, false);
}

function noopHandler(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

function onDragEnter(evt) {
	$("#drop-box-overlay").fadeIn(125);
	$("#drop-box-prompt").fadeIn(125);
}

function onDragLeave(evt) {
	/*
	 * We have to double-check the 'leave' event state because this event stupidly
	 * gets fired by JavaScript when you mouse over the child of a parent element;
	 * instead of firing a subsequent enter event for the child, JavaScript first
	 * fires a LEAVE event for the parent then an ENTER event for the child even
	 * though the mouse is still technically inside the parent bounds. If we trust
	 * the dragenter/dragleave events as-delivered, it leads to "flickering" when
	 * a child element (drop prompt) is hovered over as it becomes invisible,
	 * then visible then invisible again as that continually triggers the enter/leave
	 * events back to back. Instead, we use a 10px buffer around the window frame
	 * to capture the mouse leaving the window manually instead. (using 1px didn't
	 * work as the mouse can skip out of the window before hitting 1px with high
	 * enough acceleration).
	 */
	if(evt.pageX < 10 || evt.pageY < 10 || $(window).width() - evt.pageX < 10  || $(window).height - evt.pageY < 10) {
		$("#drop-box-overlay").fadeOut(125);
		$("#drop-box-prompt").fadeOut(125);
	}
}

function onDrop(evt) {
	// Consume the event.
	noopHandler(evt);
	
	// Hide overlay
	$("#drop-box-overlay").fadeOut(0);
	$("#drop-box-prompt").fadeOut(0);
	
	// Update status text
	$("#upload-details").html("Uploading");
	

	
	// Get the dropped file's anme and ext.
	var files = evt.dataTransfer.files;
	var count = files.length;
	var position = files[0].name.length -3
	var filename =  files[0].name
	var ext = filename.substring(position);
	

	// If anything is wrong with the dropped files, exit.
	if(ext !== "ghx" || files.length != 1){
		alert(filename+" is not the correct type. Please use .ghx only");
		return;}

	
	// Update and show the file name
	$("#upload-name").html(filename);
	
	// Process the dropped file
	uploadFile(files[0]);
}

function uploadFile(file) {
	
		//set up progressbar
		var	box = document.getElementById("upload-box");
			div = document.createElement("div"),
			progressBarContainer = document.createElement("div"),
			progressBar = document.createElement("div");
			
		progressBarContainer.className = "progress-bar-container";
		progressBar.className = "progress-bar";
		progressBarContainer.appendChild(progressBar);
		box.appendChild(div);
		box.appendChild(progressBarContainer);
	
		// Uploading - for Firefox, Google Chrome and Safari
		xhr = new XMLHttpRequest();
		
		// Update progress bar
		xhr.upload.addEventListener("progress", function (evt) {
			if (evt.lengthComputable) {
				progressBar.style.width = (evt.loaded / evt.total) * 100 + "%";
			}
			else {
				// No data to calculate on
			}
		}, false);
		
		// File uploaded
		xhr.addEventListener("load", function () {
		progressBarContainer.className += " uploaded";
		//clear upload header text
		$("#upload-title").html("");
		$("#upload-details").html("");
		//$("#upload-name").html("");
		progressBar.innerHTML = "Uploaded!";
		}, false);
		
		xhr.open("post", "upload/t.php", true);
		
		// Set appropriate headers
		xhr.setRequestHeader("Content-Type", "multipart/form-data");
		xhr.setRequestHeader("X-File-Name", file.name);
		xhr.setRequestHeader("X-File-Size", file.size);
		xhr.setRequestHeader("X-File-Type", file.type);
		xhr.send(file);
		

}//end of uploadFile function


//import special curve utilities
THREE.Curve.Utils.createLineGeometry = function( points ) {

    var geometry = new THREE.Geometry();

    for( var i = 0; i < points.length; i ++ ) {

        geometry.vertices.push( new THREE.Vertex( points[i] ) );

    }

    return geometry;

};

