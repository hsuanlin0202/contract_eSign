(function () {

	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimaitonFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	var winwidth = window.screen.width;



	var canvas = document.getElementById("sig-canvas");
	if (winwidth <= 450) {
		canvas.width = 300;
		canvas.height = 300;
	} else {
		canvas.width = 600;
		canvas.height = 150;
	};
	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = "#000000";
	ctx.lineWith = 5;

	var clearBtn = document.getElementById("sig-clearBtn");
	var submitBtn = document.getElementById("sig-submitBtn");
	clearBtn.addEventListener("click", function (e) {
		clearCanvas();
	}, false);
	submitBtn.addEventListener("click", function (e) {
		var dataUrl = canvas.toDataURL();
	}, false);

	var drawing = false;
	var mousePos = {
		x: 0,
		y: 0
	};
	var lastPos = mousePos;
	canvas.addEventListener("mousedown", function (e) {
		drawing = true;
		signed = true;
		lastPos = getMousePos(canvas, e);
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		drawing = false;
	}, false);
	canvas.addEventListener("mousemove", function (e) {
		mousePos = getMousePos(canvas, e);
	}, false);

	canvas.addEventListener("touchstart", function (e) {
		mousePos = getTouchPos(canvas, e);
		signed = true;
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchend", function (e) {
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchmove", function (e) {
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
		e.preventDefault();
	}, false);

	document.body.addEventListener("touchstart", function (e) {
		if (e.target == canvas) {
			//e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchend", function (e) {
		if (e.target == canvas) {
			//e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchmove", function (e) {

		if (e.target == canvas) {
			//
		}
	}, false);

	function getMousePos(canvasDom, mouseEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	}

	function getTouchPos(canvasDom, touchEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
		};
	}

	// Draw to the canvas
	function renderCanvas() {
		if (drawing) {
			ctx.moveTo(lastPos.x, lastPos.y);
			ctx.lineTo(mousePos.x, mousePos.y);
			ctx.stroke();
			lastPos = mousePos;
		}
	}

	function clearCanvas() {
		canvas.width = canvas.width;
	}

	// Allow for animation
	(function drawLoop() {
		requestAnimFrame(drawLoop);
		renderCanvas();
	})();

})();

const submit = () => {

	if (signed == true) {
		window.scrollTo(0, 0);
		capture();
	}

};

const capture = () => {
	const body = document.querySelector('body');
	body.id = 'capture';

	html2canvas(document.querySelector("#main"), {
		allowTaint: true,
		scrollX: 0,
		scrollY: -window.scrollY,
		scale: 1
	}).then(canvas => {
		canvas.id = "show";
		document.body.appendChild(canvas);

	}).then(() => {
		var canvas = document.querySelector('#show');
		canvas.style.display = 'none';

		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		var img = document.createElement("img");
		var a = document.createElement("a");

		//以下是產生圖片拿去上傳用，id為contract_shot
		img.id = "contract_shot";
		img.setAttribute('src', image);
		document.body.appendChild(img);

		//以下是測試用下載圖片，可刪除
		a.setAttribute('download', 'myImage.png');
		a.setAttribute('href', image);
		a.click();

		//送出後如果要有什麼回饋在這邊
		location.href = 'submitted.html';

	});
};