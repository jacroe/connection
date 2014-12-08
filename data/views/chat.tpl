{{include file="header.tpl"}}
	<div class="row">
		<div class="container col-md-9">
			<div class="row">
				<h1>#<span class="channelname">{{$channelname}}</span> <button type="button" class="btn btn-sm btn-primary" onclick="$('#channelSwitch').modal('show');">Change Channel</button></h1>
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
	<div class="modal fade" id="channelSwitch" tabindex="-1" role="dialog" aria-labelledby="channelSwitchLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="channelSwitchLabel">Change Channel</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" role="form">
						<div class="form-group">
							<label for="txtChannel" class="col-sm-2 control-label">Channel Name</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="txtChannel" placeholder="Hello World">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<button type="submit" class="btn btn-default" data-dismiss="modal" onclick="change_channel($('#txtChannel').val());return false;">Save</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<script>
		var user = "{{$user->username}}";
		var channelname = "{{$channelname}}";
	</script>
{{include file="footer.tpl"}}