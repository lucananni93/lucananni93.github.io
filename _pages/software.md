---
layout: page
title: Software
permalink: /software/
description: Software that I have built or contributed to
nav: true
---

<div class="projects">
	<div class="grid">
		{%- for project in site.software -%}
      		{% include projects.html %}
    	{%- endfor %}
	</div>
</div>