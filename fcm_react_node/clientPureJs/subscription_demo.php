<!DOCTYPE HTML>

<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<title>Subscription Demo</title>

	<!-- Stylesheets
	============================================= -->
	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700%7CMontserrat:300,400,500,600,700%7CMerriweather:300,400,300i,400i" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="css/bootstrap.css" type="text/css" />
	<!-- / -->
	<link rel="stylesheet" href="css/magnific-popup.css" type="text/css" />

	<link rel="stylesheet" href="css/responsive.css?ver=2" type="text/css" />

	<link rel="icon" type="image/x-icon" href="https://www.singtao.ca/deals/singclub_icon_144x144.png"/>
	<link rel="apple-touch-icon" href="https://www.singtao.ca/deals/singclub_icon_144x144.png"/>
	<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
</head>

<body>
	<p style="display:inline-block">Subscription Topic Management</p>

	<div onclick="toggleStatus(this)">
		<p style="display:inline-block">toronto</p>
		<input type="checkbox" data-toggle="toggle" id='torontoTopic' data-topic = "toronto">
	</div>
	<div onclick="toggleStatus(this)">
		<p style="display:inline-block">calgary</p>
		<input type="checkbox" data-toggle="toggle" id='calgaryTopic' data-topic = 'calgary'>
	</div>
	<div onclick="toggleStatus(this)">
		<p style="display:inline-block">vancouver</p>
		<input type="checkbox" data-toggle="toggle" id='vancouverTopic' data-topic = 'vancouver'>
	</div>
	<!-- pop up button -->
	<div id="popup-button" style="position:fixed; bottom:2.3%; right:6%;z-index:3000;">

	</div>		
<script src="js/jquery.js"></script>
<!-- Firebase Push Notification JS FILES -->
	<script defer src="https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js"></script>
	<script defer src="https://www.gstatic.com/firebasejs/7.4.0/firebase.js"></script>
	<script defer src="https://www.gstatic.com/firebasejs/7.4.0/firebase-auth.js"></script>
	<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.0/js/bootstrap.min.js" integrity="sha384-3qaqj0lc6sV/qpzrc1N5DC6i1VRn/HyX4qdPaiEFbn54VjQBEU341pvjz7Dv3n6P" crossorigin="anonymous"></script>
   
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
	<script defer src="./js/subscription_demo.js?v=15"></script>

<script>
	$(document).ready(function() {
  		$('#exampleModal').modal('show');
		});
</script>
</body>

</html>