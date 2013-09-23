//this file contains basic setup functions and any global variables outside of the geometry objects and sliders

//global vars
//default global variables
var container, geometry;
var camera, controls, scene, renderer;
var cross;
var lenghtUnits = " ft."
var areaUnits = " sq.ft."
var volumeUnits = " cu.ft."

//main setup function
function init() {

	// scene and camera
	scene = new THREE.Scene();
	width  = document.body.clientWidth-350;
	height = 600; 

	camera = new THREE.PerspectiveCamera( 60, width / height, 1, 10000 );
	camera.position.z = 200;
	camera.position.y = 200;
	camera.position.x = -500;

	scene.add( camera );

	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 2.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [ 65, 83, 68 ];
	controls.addEventListener( 'change', render );
	
	//adding zoom mouswheel
	window.addEventListener('DOMMouseScroll', mousewheel, false);
	window.addEventListener('mousewheel', mousewheel, false);

	function mousewheel(event) {

	    var fovMAX = 160;
	    var fovMIN = 1;

	    camera.fov -= event.wheelDeltaY * 0.05;
	    camera.fov = Math.max( Math.min( camera.fov, fovMAX ), fovMIN );
	    camera.projectionMatrix = new THREE.Matrix4().makePerspective(camera.fov, window.innerWidth / window.innerHeight, camera.near, camera.far);

	}//end mousewheel


	// world geometry 
	var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1000,1000, 20, 20 ), new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading, wireframe: true} ) );
	mesh.position.x = 0;
	mesh.position.y = 0;
	mesh.position.z =0;
	mesh.updateMatrix();
	mesh.matrixAutoUpdate = true;
	scene.add( mesh );
	
	//call the function that adds all the geometry
	geom();


	// lights
	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0x002288 );
	light.position.set( -1, -1, -1 );
	scene.add( light );

	var light = new THREE.AmbientLight( 0x222222 );
	scene.add( light );


	// renderer
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setSize( width, height );

	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	
}// end init function

function animate() {
	window.requestAnimationFrame(animate, renderer.domElement);
	controls.update();
	updateGeom();
	outputs();
	render();
}

function render() {
	renderer.render( scene, camera );
}