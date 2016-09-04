---
layout: page
title: 归档
permalink: /archive/
---

<div class="archive">
	{% for post in site.posts  %}
		{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
		{% capture this_month %}{{ post.date | date: "%B" }}{% endcapture %}
		{% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
		{% capture next_month %}{{ post.previous.date | date: "%m" }}{% endcapture %}
		{% if forloop.first %}
			<h2>{{this_year}}</h2>
		{% endif %}
		<li>
			<span><i class="fa fa-calendar"></i>&nbsp;{{ post.date | date: "%Y/%m/%d" }}</span>&nbsp;&nbsp;
			<a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
		</li>
		{% if forloop.last %}
		{% else %}
			{% if this_year != next_year %}
			<h2>{{next_year}}</h2>
			{% endif %}
		{% endif %}
	{% endfor %}
</div>

