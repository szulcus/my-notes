<template>
	<label class="checkbox-wrapper">
		<input
			type="checkbox"
			:checked="checked"
			@click="$emit('clicked', $event)"
		/>
		<span class="checkmark"></span>
	</label>
</template>

<script>
	export default {
		name: "Checkbox",
		props: {
			checked: Boolean
		}
	}
</script>

<style lang="scss" scoped>
	.checkbox-wrapper {
		display: block;
		min-width: 25px;
		height: 25px;
		margin-right: 10px;
		cursor: pointer;
		.checkmark {
			position: relative;
			width: 100%;
			height: 100%;
			border: 2px solid var(--decorative);
			display: inline-block;
			border-radius: 5px;
			transition: all 0.2s ease;
			&::before {
				content: '\f00c';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) scale(0.5) rotate(50deg);
				font-family: "FontAwesome";
				color: var(--strong);
				opacity: 0;
				transition: all 0.2s 0.1s ease;
			}
		}
		input {
			display: none;
			&:checked {
				& + .checkmark {
					background-color: var(--decorative);
					&::before {
						transform: translate(-50%, -50%) scale(1) rotate(0);
						opacity: 1;
					}
				}
			}
		}
	}
</style>