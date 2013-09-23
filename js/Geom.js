//this file contains al the dynamically generated geometry

//first the vars for geometry object names
var cube, splinecurve, splineOutline;
var vect, pt1, pt2, pt3, pt4, pt5;
var arrPts = []; 

function geom(){
//here we initialize the geometry objects and associate them with input variables & with each other
	
//this is the default cube
	cube = new THREE.Mesh( new THREE.CubeGeometry( 200,100, boxwidth), new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading, wireframe: false} ) );
	cube.position.x = 0;
	cube.position.y = 50;
	cube.position.z =0;
	cube.updateMatrix();
	cube.matrixAutoUpdate = true;
	cube.geometry.dynamic = true;
	//scene.add( cube );
	
//add points to scene
	
	vect = new THREE.Vector3( 0,0,0 );
	pt1=renderPoint(vect);
	arrPts.push(pt1.position);
	scene.add(pt1);
	
	vect =new THREE.Vector3( 0, slider2val, 0 );
	pt2=renderPoint(vect);
	arrPts.push(pt1.position);
	scene.add(pt2);
	
	vect =new THREE.Vector3( 0, slider2val * 2, slider1val);
	pt3=renderPoint(vect);
	arrPts.push(pt1.position);
	scene.add(pt3);
	
	vect =new THREE.Vector3( 0, slider2val * 2, slider1val * 2 );
	pt4=renderPoint(vect);
	arrPts.push(pt1.position);
	scene.add(pt4);
	
	vect =new THREE.Vector3( slider1val * 2, slider2val * 2, slider1val * 3 );
	pt5=renderPoint(vect);
	arrPts.push(pt1.position);
	scene.add(pt5);
	
	
	
//add spline

	
	splineCurve = new THREE.SplineCurve3(arrPts);
	updateSplineOutline();
	
}//end geom function

//here is where the control values are applied to geom objects
function updateGeom(){
	//update the cube's y scale value
	cube.scale.y = slider1val/100;
	cube.position.y = 50*(slider1val/100);
	cube.scale.x = slider2val/100;
	cube.geometry.__dirtyVertices = true;
	cube.geometry.dynamic=true;
	
	//update the points' positions
	pt2.position.y=slider2val; 
	arrPts[1]=pt2.position;
	pt3.position.y=slider2val* 2; pt2.position.z=slider1val; 
	arrPts[2]=pt3.position;
	pt4.position.y=slider2val* 2; pt3.position.z=slider1val* 2;
	arrPts[3]=pt4.position;
	pt5.position.x=slider1val* 2; pt4.position.y=slider2val* 2; pt4.position.z=slider1val* 3; 
	arrPts[4]=pt5.position;
	
	//update line
	updateSplineOutline();


	
}//end updateGeom function

//function to update the spline
function updateSplineOutline() {

    if (splineOutline) scene.remove( splineOutline );

    splineCurve.updateArcLengths();
    var arcLen = splineCurve.getLength();
    
    arcLen = Math.floor(arcLen/ 20);
    // console.log('len', arcLen);

    var spacedPoints = THREE.Curve.Utils.createLineGeometry(splineCurve.getPoints(arcLen)); //200 // getSpacedPoints

    splineOutline = new THREE.Line( spacedPoints, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 1 } ) );

    scene.add( splineOutline );
}

