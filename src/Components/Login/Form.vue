<template>
	<form class="form-wrapper" @submit="$emit('submited')">
		<div class="input-div">
			<input class="input" type="text" pattern="^\S+@\S+\.\S+$" placeholder=" " required />
			<label class="label">
				<fa-icon icon="user" class="icon" />
				Login
			</label>
		</div>
		<div class="input-div">
			<input class="input" type="password" pattern="^.{6,}$" placeholder=" " required/>
			<label class="label">
				<fa-icon icon="lock" class="icon" />
				Hasło
			</label>
		</div>
		<router-link to="/login" class="forgotten">Zapomniałeś hasła?</router-link>
		<button type="submit" class="button">Zaloguj się</button>
	</form>
</template>

<script>
	export default {
		name: "Form",
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		.input-div {
			position: relative;
			margin: 10px 0;
			.input {
				width: 100%;
				&:focus,
				&:not(:placeholder-shown) {
					~ .label {
						top: -5px;
						left: -5px;
						transform: scale(0.8);
					}
				}
				&:valid {
					~ .label::after {
						content: '\f00c';
						font-family: FontAwesome;
						color: $decorative;
						margin-left: 5px;
					}
				}
			}
			.label {
				position: absolute;
				top: 20px;
				left: 10px;
				color: $primary;
				z-index: -1;
				transition: all 0.2s ease;
				.icon {
					margin-right: 3px;
				}
			}
		}
		.forgotten {
			color: $secondary;
			text-decoration: none;
			transition: all 0.2s ease;
			&:hover {
				color: $primary;
			}
		}
		.button {
			display: none;
			position: relative;
			font-size: 20px;
			padding: 15px 20px;
			margin-top: 40px;
			background-color: transparent;
			border-radius: 30px;
			border: 2px solid $decorative;
			color: $primary;
			letter-spacing: 1px;
			transition: background-color 0.5s ease, transform 0.2s ease;
			overflow: hidden;
			outline: none;
			&::before {
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: $decorative;
				opacity: 0.5;
				filter: blur(5px);
				transform: translateX(-200px) skewX(-15deg);
				transition: all 0.7s ease;
				z-index: 2;
			}
			&:hover {
				cursor: pointer;
				background-color: $decorative;
				color: $bg;
				&::before {
					transform: translate(200px) skewX(-15deg);
					opacity: 0.6;
					transition: all 0.7s ease;
				}
			}
			&:active{
				transform: scale(0.95);
			}
			@media (min-height: 300px) {
				display: block;
			}
		}
	}
</style>