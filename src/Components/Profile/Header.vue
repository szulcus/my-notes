<template>
	<header class="header-wrapper">
		<div
			class="avatar"
			:style="{backgroundImage: `url(${src})`}"
		/>
		<div class="nick">{{content}}</div>
	</header>
</template>

<script>
	export default {
		name: "Avatar",
		props: {
			src: String,
			content: String
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-wrapper {
		.avatar {
			width: 200px;
			height: 200px;
			background: center center no-repeat;
			background-size: cover;
			border-radius: 50%;
		}
		.nick {
			width: 100%;
			max-width: 400px;
			margin: 20px 0;
			text-align: center;
			font-weight: bold;
			font-size: 30px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			&::first-letter {
				color: var(--decorative);
			}
		}
	}
</style>