var flag = 0;
var ys = "red";
/**
 * 首页红绿灯特效方法
 */
function change() {
	if (flag == 0) {
		ys = "green";
		flag = 1
	} else {
		ys = "red";
		flag = 0;
	}
	document.getElementById("lvdeng").style.color = ys;
}
/**
 * 表单提交前验证方法
 * @param {Object} e
 */
function checkOut(e) {
	var name = e["name"].value;
	if (name.trim() == "") {
		alert("请输入您要搜索的关键字。。。");
		e["name"].focus();
		return false;
	}
	if (name.indexOf("--") > 0 || name.length > 20) {
		alert("请认真填写搜索的关键字。。。");
		e["name"].focus();
		e["name"].select();
		return false;
	}
	return true;
}

/**
 * 文章评论方法
 */
function relpy() {
	var articleId = $("#articleId").val();
	var title = $("#title").val();
	var userName = $("#userName").val();
	var content = $("#content").val();
	if (userName.trim() == '') {
		alert('用户名不能为空。。。');
		$("#userName").focus();
		return false;
	}
	if (userName.length > 5) {
		alert('请认真填写用户名。。。');
		$("#userName").focus();
		$("#userName").select();
		return false;
	}
	if (content.trim() == '') {
		alert('回复内容不能为空。。。');
		$("#content").focus();
		return false;
	}
	if (content.length <= 10) {
		alert('请认真填写回复内容。。。');
		$("#content").focus();
		$("#content").select();
		return false;
	}
	$.ajax({
		url: "/reply",
		data: {
			"articleId": articleId,
			"title": title,
			"name": userName,
			"content": content
		},
		type: "Post",
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				alert(data.msg);
				location.reload();
			} else {
				alert(data.msg);
			}
		},
		error: function(data) {
			alert("数据提交过程出错");
		}
	});
}

/**
 * 文章点赞的方法
 */
function great() {
	var id = $("#articleId").val();
	$.ajax({
		url: "/great",
		data: {
			"id": id
		},
		type: "Post",
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				$("#greatBtn").text("很赞哦！ (" + data.data.greatCount + ")");
				alert(data.msg);
			} else {
				alert(data.msg);
			}
		},
		error: function(data) {
			alert("数据提交过程出错");
		}
	});
}

/**
 * 验证URL链接的方法
 * @param {Object} url
 */
function isValidURL(url) {

	const strRegex = '^((https|http|ftp)://)?' //(https或http或ftp):// 可有可无
		+
		'(([\\w_!~*\'()\\.&=+$%-]+: )?[\\w_!~*\'()\\.&=+$%-]+@)?' //ftp的user@ 可有可无
		+
		'(([0-9]{1,3}\\.){3}[0-9]{1,3}' // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
		+
		'|' // 允许IP和DOMAIN（域名）
		+
		'(localhost)|' //匹配localhost
		+
		'([\\w_!~*\'()-]+\\.)*' // 域名- 至少一个[英文或数字_!~*\'()-]加上.
		+
		'\\w+\\.' // 一级域名 -英文或数字 加上.
		+
		'[a-zA-Z]{1,6})' // 顶级域名- 1-6位英文
		+
		'(:[0-9]{1,5})?' // 端口- :80 ,1-5位数字
		+
		'((/?)|' // url无参数结尾 - 斜杆或这没有
		+
		'(/[\\w_!~*\'()\\.;?:@&=+$,%#-]+)+/?)$'; //请求参数结尾- 英文或数字和[]内的各种字符
	const re = new RegExp(strRegex, 'i'); // 大小写不敏感
	if (re.test(encodeURI(url))) {
		return true;
	}
	return false;
}

/**
 * 添加友情链接的方法
 */
function addLink() {
	var siteName = $("#siteName").val();
	var url = $("#url").val();
	if (siteName.trim() == '') {
		alert('站点名称不能为空。。。');
		$("#siteName").focus();
		return false;
	}
	if (siteName.length > 15) {
		alert('请认真填写站点名称。。。');
		$("#siteName").focus();
		$("#siteName").select();
		return false;
	}
	if (url.trim() == '') {
		alert('站点链接不能为空。。。');
		$("#url").focus();
		return false;
	}
	if (!isValidURL(url)) {
		alert('请认真填写站点链接。。。');
		$("#url").focus();
		$("#url").select();
		return false;
	}
	$.ajax({
		url: "/apply",
		data: {
			"siteName": siteName,
			"url": url
		},
		type: "Post",
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				alert(data.msg);
				$("#siteName").val("")
				$("#url").val("")
			} else {
				alert(data.msg);
			}
		},
		error: function(data) {
			alert("数据提交过程出错");
		}
	});
}

/**
 * 留言的方法
 */
function message() {
	var userName = $("#userName").val();
	var content = $("#content").val();
	if (userName.trim() == '') {
		alert('用户名不能为空。。。');
		$("#userName").focus();
		return false;
	}
	if (userName.length > 5) {
		alert('请认真填写用户名。。。');
		$("#userName").focus();
		$("#userName").select();
		return false;
	}
	if (content.trim() == '') {
		alert('回复内容不能为空。。。');
		$("#content").focus();
		return false;
	}
	if (content.length <= 10) {
		alert('请认真填写回复内容。。。');
		$("#content").focus();
		$("#content").select();
		return false;
	}
	$.ajax({
		url: "/addMessage",
		data: {
			"userName": userName,
			"content": content
		},
		type: "Post",
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				alert(data.msg);
				location.reload();
			} else {
				alert(data.msg);
			}
		},
		error: function(data) {
			alert("数据提交过程出错");
		}
	});
}
