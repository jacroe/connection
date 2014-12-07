{{include file="header.tpl"}}
	<div class="row">
		<div class="container col-md-9">
			<div class="row">
				<article class="col-md-12" id="chatBox">
					<ol>
					</ol>
					<form role="form" class="form-horizontal">
						<div class="form-group">
							<label class="sr-only" for="postMessage">{{$lang.message}}: </label>
							<div class="col-sm-10">
								<input type="text" class="form-control mousetrap" id="postMessage" placeholder="{{$lang.entermessage}}" />
							</div>
							<div class="col-sm-2">
								<button type="button" class="btn btn-success form-control" onclick="post_message();return false;">{{$lang.send}}</button>
						 </div>
						</div>
					</form>
				</article>
			</div>
		</div>
		<aside class="col-md-3">
			<div id="languageList">
				<h1>{{$lang.languages}}</h1>
				<p></p>
			</div>
			<hr />
			<div id="userlist">
				<h1>{{$lang.chatlist}}</h1>
			</div>
		</aside>
	</div>
	<script>
		var user = "{{$user->username}}";
	</script>
{{include file="footer.tpl"}}