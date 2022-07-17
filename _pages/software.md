---
layout: page
title: software
permalink: /software/
description: Software that I have built
nav: true
---

<div class="projects">
	<div class="grid">
		{%- for project in site.software -%}
      		{% include projects.html %}
    	{%- endfor %}
	</div>
</div>