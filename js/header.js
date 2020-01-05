window.addEventListener('load', init, false);

function init() {
	createScene();
	createLights();
	createLetters();

	document.addEventListener('mousemove', handleMouseMove, false);

	loop();
}

var mousePos = {x: 0, y:0};

function handleMouseMove(event) {
	var tx = -1 + (event.clientX/WIDTH)*2;
	var ty = 1 - (event.clientY/HEIGHT)*2;

	mousePos = {x: tx, y: ty};
}

var colors = {
	red: 0x05ffc0,
	blue: 0xff15aa,
	yellow: 0x636192,
	white: 0xffffff
}

var scene, camera, near, far, HEIGHT, WIDTH, renderer, container;

function createScene() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	console.log(window.innerWidth);

	if(WIDTH < 1200) {
		$("#world").append("<img id='logo' src='media/images/logo.png' />");
		return;
	}

	scene = new THREE.Scene();
	near = 0.1;
	far = 500;

	camera = new THREE.OrthographicCamera(WIDTH/-2, WIDTH/2, HEIGHT/2, HEIGHT/-2, near, far);
	camera.position.x = 0;
	camera.position.z = 50;
	camera.position.y = 0;

	if (Detector.webgl) renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
	if(renderer) {
		renderer.setSize(WIDTH, HEIGHT);
		renderer.shadowMap.enabled = true;
		container = document.getElementById('world');
		container.appendChild(renderer.domElement);
		window.addEventListener('resize', handleWindowResize, false);
	} else {
		$("#world").append("<img id='logo' src='/media/images/logo.png' />");
	}
}

function handleWindowResize(event) {
	console.log("window resize");
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	camera.left = WIDTH/-2;
	camera.right = WIDTH/2;
	camera.top = HEIGHT/2;
	camera.bottom = HEIGHT/-2;
	camera.position.z = 80;
	renderer.setSize(WIDTH, HEIGHT);
	camera.updateProjectionMatrix();
}

var dLight, aLight;

function createLights() {
	aLight = new THREE.AmbientLight(colors.white, 0.5);
	dLight = new THREE.DirectionalLight(colors.white, 0.9);

	dLight.position.set(-4, 2, 20);
	dLight.shadow.camera.left = WIDTH/-2;
	dLight.shadow.camera.right = WIDTH/2;
	dLight.shadow.camera.top = HEIGHT/2;
	dLight.shadow.camera.bottom =HEIGHT/-2;
	/*dLight.shadow.camera.left = -200;
	dLight.shadow.camera.right = 200;
	dLight.shadow.camera.top = 200;
	dLight.shadow.camera.bottom = -200;*/
	dLight.shadow.camera.near = 50;
	dLight.shadow.camera.far = 300;

	dLight.castShadow = true;

	dLight.shadow.mapSize.width = 2048;
	dLight.shadow.mapSize.height = 2048;
	/*dLight.shadow.mapSize.width = 512;
	dLight.shadow.mapSize.height = 512;*/

	scene.add(aLight);
	scene.add(dLight);
	/*var helper = new THREE.CameraHelper(dLight.shadow.camera);
	scene.add(helper);*/
}

var matRed = new THREE.MeshLambertMaterial({ color:colors.red });
var matBlue = new THREE.MeshLambertMaterial({ color:colors.blue });
var matYellow = new THREE.MeshLambertMaterial({ color:colors.yellow });
var cubeMaterials = [matBlue, matBlue, matYellow, matYellow, matYellow, matYellow];

LetterA = function() {
	this.mesh = new THREE.Object3D();

	//face
	var faceGeom = new THREE.Geometry();
	faceGeom.vertices.push(new THREE.Vector3(-3.0, 1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, -1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-3.0, -1.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(-3.0, 5.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 5.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-3.0, 3.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(-3.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-1.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-3.0, 1.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(1.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, 1.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(-3.0, -1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-1.0, -3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-3.0, -3.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, -1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, -3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, -3.0, 0.0));

	//ok so i figured out the face thing. three.js renders faces as triangles,
	//so 2 triangles make a square. And Face3() takes in the index of the vectors
	//that make the the triangles
	faceGeom.faces.push(new THREE.Face3(0, 1, 2));
	faceGeom.faces.push(new THREE.Face3(0, 2, 3));
	faceGeom.faces.push(new THREE.Face3(4, 5, 6));
	faceGeom.faces.push(new THREE.Face3(4, 6, 7));
	faceGeom.faces.push(new THREE.Face3(8, 9, 10));
	faceGeom.faces.push(new THREE.Face3(8, 10, 11));
	faceGeom.faces.push(new THREE.Face3(12, 13, 14));
	faceGeom.faces.push(new THREE.Face3(12, 14, 15));
	faceGeom.faces.push(new THREE.Face3(16, 17, 18));
	faceGeom.faces.push(new THREE.Face3(16, 18, 19));
	faceGeom.faces.push(new THREE.Face3(20, 21, 22));
	faceGeom.faces.push(new THREE.Face3(20, 22, 23));

	faceGeom.computeFaceNormals();

	this.faceMesh = new THREE.Mesh(faceGeom, matRed);
	this.faceMesh.castShadow = true;
	this.faceMesh.receiveShadow = true;

	this.faceMesh.rotation.y = degToRad(180);

	this.mesh.add(this.faceMesh);

	//left side
	var leftGeom = new THREE.BoxGeometry(2, 8, 3);
	var left = new THREE.Mesh(leftGeom, cubeMaterials);

	left.position.z -= 2;
	left.position.y += 1;
	left.position.x -= 2;

	left.castShadow = true;
	left.receiveShadow = true;

	this.mesh.add(left);

	//right side
	var rightGeom = new THREE.BoxGeometry(2, 8, 3);
	var right = new THREE.Mesh(rightGeom, cubeMaterials);

	right.position.z -= 2;
	right.position.y += 1;
	right.position.x += 2;

	right.castShadow = true;
	right.receiveShadow = true;

	this.mesh.add(right);

	//top side
	var topGeom = new THREE.BoxGeometry(2, 2, 3);
	var top = new THREE.Mesh(topGeom, cubeMaterials);

	top.position.z -= 2;
	top.position.y += 4;

	top.castShadow = true;
	top.receiveShadow = true;

	this.mesh.add(top);

	this.mesh.rotation.y = degToRad(-45);
	this.mesh.rotation.x = degToRad(45);
}

LetterN = function() {
	this.mesh = new THREE.Object3D();

	//face
	var faceGeom = new THREE.Geometry();

	faceGeom.vertices.push(new THREE.Vector3(-3.0, 5.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 5.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-3.0, 3.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(-3.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-1.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-1.0, -3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-3.0, -3.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(1.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, -3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, -3.0, 0.0));

	faceGeom.faces.push(new THREE.Face3(0, 1, 2));
	faceGeom.faces.push(new THREE.Face3(0, 2, 3));
	faceGeom.faces.push(new THREE.Face3(4, 5, 6));
	faceGeom.faces.push(new THREE.Face3(4, 6, 7));
	faceGeom.faces.push(new THREE.Face3(8, 9, 10));
	faceGeom.faces.push(new THREE.Face3(8, 10, 11));

	faceGeom.computeFaceNormals();

	this.faceMesh = new THREE.Mesh(faceGeom, matRed);
	this.faceMesh.castShadow = true;
	this.faceMesh.receiveShadow = true;

	this.faceMesh.rotation.y = degToRad(180);

	this.mesh.add(this.faceMesh);

	//left
	var leftGeom = new THREE.BoxGeometry(2, 6, 3);
	var left = new THREE.Mesh(leftGeom, cubeMaterials);

	//left.position.y -= 1;
	left.position.x -= 2;
	left.position.z -= 2;

	left.castShadow = true;
	left.receiveShadow = true;

	this.mesh.add(left);

	//right
	var rightGeom = new THREE.BoxGeometry(2, 6, 3);
	var right = new THREE.Mesh(rightGeom, cubeMaterials);

	//right.position.y -= 1;
	right.position.x += 2;
	right.position.z -= 2;

	right.castShadow = true;
	right.receiveShadow = true;

	this.mesh.add(right);

	//top
	var topGeom = new THREE.BoxGeometry(6, 2, 3);
	var top = new THREE.Mesh(topGeom, cubeMaterials);

	top.position.y += 4;
	top.position.z -= 2;

	top.castShadow = true;
	top.receiveShadow = true;

	this.mesh.add(top);
	this.mesh.rotation.y = degToRad(-45);
	this.mesh.rotation.x = degToRad(45);
}

LetterE = function() {
	this.mesh = new THREE.Object3D();

	//face
	var faceGeom = new THREE.Geometry();

	faceGeom.vertices.push(new THREE.Vector3(1.0, 5.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 5.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, -3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, -3.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(-3.0, 5.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, 5.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-3.0, 3.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(-1.0, 2.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, 2.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, 0.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-1.0, 0.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(-3.0, -1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, -3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-3.0, -3.0, 0.0));

	faceGeom.faces.push(new THREE.Face3(0, 1, 2));
	faceGeom.faces.push(new THREE.Face3(0, 2, 3));
	faceGeom.faces.push(new THREE.Face3(4, 5, 6));
	faceGeom.faces.push(new THREE.Face3(4, 6, 7));
	faceGeom.faces.push(new THREE.Face3(8, 9, 10));
	faceGeom.faces.push(new THREE.Face3(8, 10, 11));
	faceGeom.faces.push(new THREE.Face3(12, 13, 14));
	faceGeom.faces.push(new THREE.Face3(12, 14, 15));

	faceGeom.computeFaceNormals();

	this.faceMesh = new THREE.Mesh(faceGeom, matRed);
	this.faceMesh.castShadow = true;
	this.faceMesh.receiveShadow = true;

	this.faceMesh.rotation.y = degToRad(180);

	this.mesh.add(this.faceMesh);

	//left
	var leftGeom = new THREE.BoxGeometry(2, 8, 3);
	var left = new THREE.Mesh(leftGeom, cubeMaterials);

	left.position.x -= 2;
	left.position.y += 1;
	left.position.z -= 2;

	left.castShadow = true;
	left.receiveShadow = true;

	this.mesh.add(left);

	//top
	var topGeom = new THREE.BoxGeometry(4, 2, 3);
	var top = new THREE.Mesh(topGeom, cubeMaterials);

	top.position.y += 4;
	top.position.x += 1;
	top.position.z -= 2;

	top.castShadow = true;
	top.receiveShadow = true;

	this.mesh.add(top);

	//middle
	var middleGeom = new THREE.BoxGeometry(2, 2, 3);
	var middle = new THREE.Mesh(middleGeom, cubeMaterials);

	middle.position.y += 1;
	middle.position.z -= 2;

	middle.castShadow = true;
	middle.receiveShadow = true;

	this.mesh.add(middle);

	//bottom
	var bottomGeom = new THREE.BoxGeometry(4, 2, 3);
	var bottom = new THREE.Mesh(bottomGeom, cubeMaterials);

	bottom.position.y -= 2;
	bottom.position.x += 1;
	bottom.position.z -= 2;

	bottom.castShadow = true;
	bottom.receiveShadow = true;

	this.mesh.add(bottom);

	this.mesh.rotation.y = degToRad(-45);
	this.mesh.rotation.x = degToRad(45);

}

LetterT = function() {
	this.mesh = new THREE.Object3D();

	//face
	var faceGeom = new THREE.Geometry();

	faceGeom.vertices.push(new THREE.Vector3(-3.0, 5.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 5.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(3.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-3.0, 3.0, 0.0));

	faceGeom.vertices.push(new THREE.Vector3(-1.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, 3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(1.0, -3.0, 0.0));
	faceGeom.vertices.push(new THREE.Vector3(-1.0, -3.0, 0.0));

	faceGeom.faces.push(new THREE.Face3(0, 1, 2));
	faceGeom.faces.push(new THREE.Face3(0, 2, 3));
	faceGeom.faces.push(new THREE.Face3(4, 5, 6));
	faceGeom.faces.push(new THREE.Face3(4, 6, 7));

	faceGeom.computeFaceNormals();

	this.faceMesh = new THREE.Mesh(faceGeom, matRed);
	this.faceMesh.castShadow = true;
	this.faceMesh.receiveShadow = true;

	this.faceMesh.rotation.y = degToRad(180);

	this.mesh.add(this.faceMesh);

	//top
	var topGeom = new THREE.BoxGeometry(6, 2, 3);
	var top = new THREE.Mesh(topGeom, cubeMaterials);

	top.position.y += 4;
	top.position.z -= 2;

	top.castShadow = true;
	top.receiveShadow = true;

	this.mesh.add(top);

	//middle
	var middleGeom = new THREE.BoxGeometry(2, 6, 3);
	var middle = new THREE.Mesh(middleGeom, cubeMaterials);

	middle.position.z -= 2;

	middle.castShadow = true;
	middle.receiveShadow = true;

	this.mesh.add(middle);

	this.mesh.rotation.y = degToRad(-45);
	this.mesh.rotation.x = degToRad(45);
}

var a1, n1, n2, e, t, a2, size = 20;
function createLetters() {
	a1 = new LetterA();
	a1.mesh.scale.set(size, size, size);
	a1.mesh.position.z -= 150;
	a1.mesh.position.x -= 500;
	scene.add(a1.mesh);

	n1 = new LetterN();
	n1.mesh.scale.set(size, size, size);
	n1.mesh.position.z -= 150;
	n1.mesh.position.x -= 300;
	scene.add(n1.mesh);

	n2 = new LetterN();
	n2.mesh.scale.set(size, size, size);
	n2.mesh.position.z -= 150;
	n2.mesh.position.x -= 100;
	scene.add(n2.mesh);

	e = new LetterE();
	e.mesh.scale.set(size, size, size);
	e.mesh.position.z -= 150;
	e.mesh.position.x += 100;
	scene.add(e.mesh);

	t = new LetterT();
	t.mesh.scale.set(size, size, size);
	t.mesh.position.z -= 150;
	t.mesh.position.x += 300;
	scene.add(t.mesh);

	a2 = new LetterA();
	a2.mesh.scale.set(size, size, size);
	a2.mesh.position.z -= 150;
	a2.mesh.position.x += 500;
	scene.add(a2.mesh);
}

function updateLetters() {
	var rotY = normalize(mousePos.x, -1, 1, -10, 10);

	updateLetter(a1, rotY);
	updateLetter(n1, rotY);
	updateLetter(e, rotY);
	updateLetter(t, rotY);
	updateLetter(a2, rotY);
	updateLetter(n2, rotY);
}

function updateLetter(letter, rotY) {
	if(letter.faceMesh.position.x > -0.5 && mousePos.x < 0) {
		letter.faceMesh.position.x += mousePos.x;
	}
	if(letter.faceMesh.position.x < 0.5 && mousePos.x > 0) {
		letter.faceMesh.position.x += mousePos.x;
	}
	if(letter.faceMesh.position.y > -0.5 && mousePos.y < 0) {
		letter.faceMesh.position.y += mousePos.y;
	}
	if(letter.faceMesh.position.y < 0.5 && mousePos.y > 0) {
		letter.faceMesh.position.y += mousePos.y;
	}

	if(letter.mesh.rotation.y > degToRad(-45) && mousePos.x < 0) {
		letter.mesh.rotation.y += degToRad(rotY);
	}

	if(letter.mesh.rotation.y < degToRad(45) && mousePos.x > 0) {
		letter.mesh.rotation.y += degToRad(rotY);
	}
}

function loop() {
	updateLetters();
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function normalize(v, vmin, vmax, tmin, tmax) {
	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;
}
