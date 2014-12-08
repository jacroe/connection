{{include file="header.tpl"}}
	<div class="row marketing">
		<div class="col-lg-12">
			<h1>Register</h1>
{{foreach $errors as $error}}
			<div class="alert alert-danger alert-dismissable">
				<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
				<strong>{{$error.title}}</strong> - {{$error.body}}
			</div>
{{/foreach}}
			<form class="form-horizontal" role="form" method="POST">
				<div class="form-group">
					<label for="username" class="col-sm-3 control-label">Username</label>
					<div class="col-sm-9">
						<input type="text" name="username" class="form-control" id="username" placeholder="TimBL" {{if $submitted.username}}value="{{$submitted.username}}"{{/if}} />
					</div>
				</div>
				<div class="form-group">
					<label for="email" class="col-sm-3 control-label">Email</label>
					<div class="col-sm-9">
						<input type="email" name="email" class="form-control" id="email" placeholder="tim@w3.org" {{if $submitted.email}}value="{{$submitted.email}}"{{/if}} />
					</div>
				</div>
				<div class="form-group">
					<label for="password" class="col-sm-3 control-label">Password</label>
					<div class="col-sm-9">
						<input type="password" class="form-control" id="password" name="password" />
					</div>
				</div>
				<div class="form-group">
					<label for="language" class="col-sm-3 control-label">Language</label>
					<div class="col-sm-9">
						<select class="form-control" id="language" name="language">
						<!-- Language names from http://www.omniglot.com/language/names.htm -->
						<!-- These languages are the ones supported by Google Translate -->
							<option value="af">Afrikaans</option>
							<option value="sq">shqip</option>
							<option value="ar"><span dir="rtl">&#1575;&#1604;&#1593;&#1585;&#1576;&#1610;&#1577;</span></option>
							<option value="az"><span dir="rtl">&#1570;&#1584;&#1585;&#1576;&#1575;&#1610;&#1580;&#1575;&#1606;&#1580;&#1575;&#32;&#1583;&#1610;&#1604;&#1610;</span></option>
							<option value="eu">euskara</option>
							<option value="bn">&#2476;&#2494;&#2434;&#2482;&#2494; (ba&#x025B;n&#775;la&#772;)</option>
							<option value="be">&#1041;&#1077;&#1083;&#1072;&#1088;&#1091;&#1089;&#1082;&#1072;&#1103; &#1084;&#1086;&#1074;&#1072; (Bielaruskaja mova)</option>
							<option value="bg">&#1073;&#1098;&#1083;&#1075;&#1072;&#1088;&#1089;&#1082;&#1080; (b&atilde;lgarski)</option>
							<option value="ca">catal&agrave;</option>
							<option value="zh">&#20013;&#25991;(&#x7b80;&#x4f53;)</option> <!-- Docs say it should be zh-CN but the API keeps returning zh -->
							<option value="zh-TW">&#20013;&#25991;(&#x7e41;&#x9ad4;)</option>
							<option value="hr">Hrvatski</option>
							<option value="cs">&#x010D;e&#353;tina</option>
							<option value="da">dansk</option>
							<option value="nl">Nederlands</option>
							<option value="en" selected>English</option>
							<option value="eo">Esperanto</option>
							<option value="et">eesti keel</option>
							<option value="tl">Filipino</option>
							<option value="fi">suomi</option>
							<option value="fr">fran&ccedil;ais</option>
							<option value="gl">Galego</option>
							<option value="ka">&#4325;&#4304;&#4320;&#4311;&#4323;&#4314;&#4312; (k&#x02BB;art&#x02BB;uli)</option>
							<option value="de">Deutsch</option>
							<option value="el">&#949;&#955;&#955;&#951;&#957;&#953;&#954;&#940; (ell&#275;nik&aacute;)</option>
							<option value="gu">&#2711;&#2753;&#2716;&#2736;&#2750;&#2724;&#2752; (gujar&#x0101;t&#x012B;)</option>
							<option value="ht">Krey&ograve;l ayisyen</option>
							<option value="iw"><span dir="rtl">&#1506;&#1489;&#1512;&#1497;&#1514; / &#1506;&#1460;&#1489;&#1456;&#1512;&#1460;&#1497;&#1514;</span></option>
							<option value="hi">&#2361;&#2367;&#2344;&#2381;&#2342;&#2368; (hind&#299;)</option>
							<option value="hu">magyar</option>
							<option value="is">&Iacute;slenska</option>
							<option value="id">Bahasa Indonesia</option>
							<option value="ga">Gaeilge</option>
							<option value="it">italiano</option>
							<option value="ja">&#26085;&#26412;&#35486; (nihongo)</option>
							<option value="kn">&#3221;&#3240;&#3277;&#3240;&#3233; (kanna&#7693;a)</option>
							<option value="ko">&#54620;&#44397;&#50612; [&#38867;&#22283;&#35486;] (han-guk-eo)</option>
							<option value="la">Lingua Latina</option>
							<option value="lv">latvie&#353;u valoda</option>
							<option value="lt">lietuvi&#371; kalba</option>
							<option value="mk">&#1084;&#1072;&#1082;&#1077;&#1076;&#1086;&#1085;&#1089;&#1082;&#1080; (Makedonski) </option>
							<option value="ms">Bahasa melayu</option>
							<option value="mt">Malti</option>
							<option value="no">Norsk</option>
							<option value="fa"><span dir="rtl">(f&#257;rs&#299;)&#1601;&#1575;&#1585;&#1587;&#1609;</span></option>
							<option value="pl">polski</option>
							<option value="pt">portugu&ecirc;s</option>
							<option value="ro">rom&#x00E2;n&#x0103;</option>
							<option value="ru">&#1056;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081; &#1103;&#1079;&#1099;&#1082; (Russkij jazyk)</option>
							<option value="sr">&#1089;&#1088;&#1087;&#1089;&#1082;&#1080; (srpski)</option>
							<option value="sk">sloven&#x010D;ina</option>
							<option value="sl">sloven&#x0161;&#x010D;ina</option>
							<option value="es">espa&ntilde;ol</option>
							<option value="sw">Kiswahili</option>
							<option value="sv">Svenska</option>
							<option value="ta">&#2980;&#2990;&#3007;&#2996;&#3021; (tamil&#817;)</option>
							<option value="te">&#3108;&#3142;&#3122;&#3137;&#3095;&#3137; (telugu)</option>
							<option value="th">&#3616;&#3634;&#3625;&#3634;&#3652;&#3607;&#3618; (paasaa-tai)</option>
							<option value="tr">T&uuml;rk&ccedil;e</option>
							<option value="uk">&#1059;&#1082;&#1088;&#1072;&#1111;&#1085;&#1089;&#1100;&#1082;&#1072; (Ukrajins'ka)</option>
							<option value="ur"><span dir="rtl">(urd&#x016B;) &#1575;&#1585;&#1583;&#1608;</span></option>
							<option value="vi">ti&#7871;ng vi&#7879;t (&#13762;&#36234;)</option>
							<option value="cy">Cymraeg</option>
							<option value="yi">&#1522;&#1460;&#1491;&#1497;&#1513;</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-3 col-sm-9">
						<button type="submit" class="btn btn-default">Register</button>
					</div>
				</div>
			</form>
		</div>
	</div>
{{include file="footer.tpl"}}