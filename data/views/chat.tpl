{{include file="header.tpl"}}
	<div class="row">
		<div class="container col-md-8">
			<div class="row">
				<article class="col-md-12" id="chatMessages">
				</article>
			</div>
			<div class="row">
				<div class="col-md-12">
					<input type="text" placeholder="Enter a message..." />
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
	<div class="modal fade" id="prefs" tabindex="-1" role="dialog" aria-labelledby="prefsLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="prefsLabel">Preferences</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" role="form">
					<div class="form-group">
						<label for="username" class="col-sm-2 control-label">Username</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="username" placeholder="timbl">
						</div>
					</div>
					<div class="form-group">
						<label for="language" class="col-sm-2 control-label">Language</label>
						<div class="col-sm-10">
							<select class="form-control" id="language">
								<option value=""></option>
								<option value="en">English</option>
								<option value="es">Spanish</option>
								<option value="fr">French</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-10">
							<button type="submit" class="btn btn-default" data-dismiss="modal" onclick="prefs_save();">Save</button>
						</div>
					</div>
				</form>
			</div>
			</div>
		</div>
	</div>
{{include file="footer.tpl"}}