---
layout: page
title: 关于
permalink: /about/
key: 20150101
---
<div class="about">
	<h2>基本信息</h2>
	{% if site.user.email%}
	<p>
		<em>email</em> : <a href="mailto:{{ site.user.email }}">i@searchp.cc</a>
	</p>
	{% endif %}
	{% if site.user.weibo%}
	<p>
		<em>weibo</em> : <a href="{{ site.user.weibo }}">{{ site.username }}@weibo</a>
	</p>
	{% endif %}
	{% if site.user.twitter%}
	<p>
		<em>twitter</em> : <a href="{{ site.user.twitter }}">{{ site.username }}@twitter</a>
	</p>
	{% endif %}
	{% if site.user.github %}
	<p>
		<em>github</em> : <a href="{{ site.user.github }} ">{{ site.username }}@github</a>
	</p>
	{% endif %}
	{% if site.user.douban %}
	<p>
		<em>douban</em> : <a href="{{ site.user.douban }} ">{{ site.username }}@douban</a>
	</p>
	{% endif %}

	{% if site.user.desc %}
		<h2>个人简介</h2>
		<p>
			{{ site.user.desc }}
		</p>
	{% endif %}

	{% include extends/duoshuo.html %}
</div>

