---
layout: page
title: 分类
permalink: /category/
---

<div class="category">
	{% assign categories_list = site.categories %}
	{% if categories_list.first[0] == null %}
	{% else %}
		{% for category in categories_list %}
			<h2>
				<i class="fa fa-folder-open-o fa-fw"></i>
				{{ category[0] | capitalize }}
			</h2>
			{% assign pages_list = category[1] %}
			{% for node in pages_list %}
				{% if node.title != null %}
					{% if group == null or group == node.group %}
					<li>
						<i class="fa fa-headphones"></i>&nbsp;&nbsp;
						<a href="{{node.url}}">{{node.title}}</a> 
						<span>( {{ node.date | date: "%Y/%m/%d" }} )</span> 
					</li>
					{% endif %}
				{% endif %}
			{% endfor %}
			{% assign pages_list = nil %}
		{% endfor %}
	{% endif %}
	{% assign categories_list = nil %}
</div>