export let pdf = `

<!DOCTYPE html>
<html>
<head>
<!-- One of many ways to make sure the chart fits on the page -->
<title>PDF</title>
<meta charset="UTF-8">


<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
      rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">

<style>
@page {
	size: A4 portrait;
	margin: 0 !important;
	padding: 0 !important;
}

html, 
body {
	margin: 0;
	padding: 0;
	height: 100%;
}

body {
	font-family: "Open Sans", "Helvetica", "Arial", sans-serif;
	margin: 0 !important;
	padding: 0 !important;
	color: #454545;
	-webkit-print-color-adjust: exact;
	print-color-adjust: exact;
	font-size: 12px;
	background: #FFF;
}

.page-break-after {
	page-break-after: always;
}

.print-page {
	position: relative;
	height: 100%;
}

.print-page .print-page-header {
	padding: 30px 30px 20px;
}

.print-page .print-page-header h1 {
	font-size: 14px;
	line-height: 1.3em;
	font-weight: 700;
	letter-spacing: 0.02em;
	color: #003594;
	margin: 0 0 5px;
}

.print-page .print-page-header h2 {
	font-size: 42px;
	line-height: 1.2em;
	font-weight: 300;
	letter-spacing: 0.02em;
	color: #003594;
	margin: 0;
}

.print-page .print-page-canvas-top {
	background: #F5F5F5;
	padding: 20px 30px 5px;
}

.print-page .print-page-canvas .print-canvas-img {
	display: block;
	width: 100%;
	height: auto;
}

.print-page .print-page-canvas .print-page-canvas-title {
	font-size: 20px;
	line-height: 1.2em;
	font-weight: 500;
	letter-spacing: 0.02em;
	color: #003594;
	padding: 0 30px;
	margin: 20px 0;
}

.print-page .print-page-canvas-bottom {
	padding: 0 30px;
}

.print-page .print-page-footer {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 0 30px 30px;
}

.print-page .print-page-footer .print-page-footer-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.print-page .print-page-footer .print-page-footer-content {
	width: 70%;
}

.print-page .print-page-footer .print-page-footer-content p {
	font-size: 8px;
	line-height: 1.3em;
	font-weight: 700;
	letter-spacing: 0.02em;
	color: #454545;
	margin: 0 0 10px;
}

.print-page .print-page-footer .print-page-footer-content p:last-child {
	margin: 0;
}

.print-page .print-page-footer .print-page-footer-logo svg {
	display: block;
	width: 150px;
	height: 43px;
}
</style>
</head>
<body>
C_O_N_T_E_N_T
</body>
</html>

`;
