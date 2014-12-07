{{include file="header.tpl"}}
	<div class="row">
		<div class="container col-md-8">
			<div class="row">
				<article class="col-md-12" id="chatMessages">
				</article>
			</div>
			<div class="row">
				<div class="col-md-12">
					<form role="form">
						<div class="form-group">
							<label class="sr-only" for="postMessage">Message: </label>
							<input type="text" class="form-control mousetrap" id="postMessage" placeholder="Enter a message..." />
						</div>
				</div>
			</div>
		</div>
		<aside class="col-md-4">
			<div id="languageList">
				<h1>Languages</h1>
				<p></p>
			</div>
			<hr />
			<div id="userlist">
				<h1>Chat list</h1>
			</div>
		</aside>
	</div>
{{include file="footer.tpl"}}